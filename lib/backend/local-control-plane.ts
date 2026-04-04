import "server-only";

import { createHash, randomBytes } from "node:crypto";

import { and, desc, eq, gte, isNull } from "drizzle-orm";

import { db } from "@/database";
import {
  apiTokens,
  tunnels as tunnelTable,
  usageDaily,
  workspaceSubscriptions,
} from "@/database/schema";
import type {
  ApiToken,
  BillingSummary,
  CreatedToken,
  DashboardOverview,
  ServiceResult,
  TokenCreateInput,
  Tunnel,
  UsageSummary,
} from "@/lib/backend/contracts";
import { getEngineHealth, getEngineSessions } from "@/lib/backend/engine";
import { requireAuthenticatedAppUser } from "@/lib/auth/guards";

type WorkspaceContext = {
  userId?: string;
  workspaceId: string;
};

type StoredTunnelRow = {
  id: string;
  name: string;
  hostname: string;
  protocol: string;
  region: string;
  status: "healthy" | "degraded" | "offline";
  requests24h: number;
  lastSeenAt: Date | null;
};

export type ValidatedRuntimeToken = {
  tokenId: string;
  prefix: string;
  workspaceId: string;
  principalId: string;
  createdByUserId?: string;
};

function success<T>(data: T): ServiceResult<T> {
  return {
    configured: true,
    ok: true,
    data,
  };
}

function failure<T>(error: string, data: T | null = null): ServiceResult<T> {
  return {
    configured: true,
    ok: false,
    data,
    error,
  };
}

function notConfigured<T>(error: string): ServiceResult<T> {
  return {
    configured: false,
    ok: false,
    data: null,
    error,
  };
}

function formatDay(day: Date) {
  return day.toISOString().slice(0, 10);
}

function startOfCurrentMonth() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

function periodLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function parseNumeric(value: string | number | null | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function normalizeHostname(value: string) {
  return value.trim().toLowerCase();
}

function readHostname(publicUrl: string) {
  try {
    return new URL(publicUrl).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function mapSessionStatus(status: string, connection: string): Tunnel["status"] {
  const normalizedConnection = connection.trim().toLowerCase();
  const normalizedStatus = status.trim().toLowerCase();

  if (normalizedConnection === "connected" || normalizedStatus === "connected") {
    return "healthy";
  }
  if (normalizedConnection === "disconnected" || normalizedStatus === "disconnected") {
    return "offline";
  }
  return "degraded";
}

async function getWorkspaceContext(nextPath = "/dashboard"): Promise<WorkspaceContext | null> {
  if (!db) {
    return null;
  }

  const session = await requireAuthenticatedAppUser(nextPath);

  if (!session.workspaceId) {
    return null;
  }

  return {
    userId: session.userId,
    workspaceId: session.workspaceId,
  };
}

async function listStoredTunnels(workspaceId: string): Promise<StoredTunnelRow[]> {
  if (!db) {
    return [];
  }

  return db
    .select({
      id: tunnelTable.id,
      name: tunnelTable.name,
      hostname: tunnelTable.hostname,
      protocol: tunnelTable.protocol,
      region: tunnelTable.region,
      status: tunnelTable.status,
      requests24h: tunnelTable.requests24h,
      lastSeenAt: tunnelTable.lastSeenAt,
    })
    .from(tunnelTable)
    .where(eq(tunnelTable.workspaceId, workspaceId))
    .orderBy(desc(tunnelTable.lastSeenAt), desc(tunnelTable.createdAt));
}

function mergeTunnels(runtimeTunnels: Tunnel[], storedTunnels: StoredTunnelRow[]) {
  const merged: Tunnel[] = [];
  const consumedHostnames = new Set<string>();
  const storedByHostname = new Map(
    storedTunnels.map((tunnel) => [normalizeHostname(tunnel.hostname), tunnel]),
  );

  for (const runtimeTunnel of runtimeTunnels) {
    const hostname = normalizeHostname(runtimeTunnel.hostname);
    const stored = storedByHostname.get(hostname);
    consumedHostnames.add(hostname);

    merged.push({
      ...runtimeTunnel,
      id: stored?.id ?? runtimeTunnel.id,
      name: stored?.name || runtimeTunnel.name,
      protocol: stored?.protocol || runtimeTunnel.protocol,
      region: stored?.region || runtimeTunnel.region,
      requests24h: stored?.requests24h ?? runtimeTunnel.requests24h,
      lastSeenAt:
        stored?.lastSeenAt?.toISOString() ||
        runtimeTunnel.lastSeenAt,
    });
  }

  for (const storedTunnel of storedTunnels) {
    const hostname = normalizeHostname(storedTunnel.hostname);
    if (consumedHostnames.has(hostname)) {
      continue;
    }

    merged.push({
      id: storedTunnel.id,
      name: storedTunnel.name,
      hostname: storedTunnel.hostname,
      protocol: storedTunnel.protocol,
      region: storedTunnel.region,
      status: storedTunnel.status,
      requests24h: storedTunnel.requests24h,
      lastSeenAt:
        storedTunnel.lastSeenAt?.toISOString() ?? new Date().toISOString(),
    });
  }

  merged.sort((a, b) => {
    return new Date(b.lastSeenAt).getTime() - new Date(a.lastSeenAt).getTime();
  });

  return merged;
}

export async function getLocalTokens() {
  const context = await getWorkspaceContext("/dashboard/tokens");
  if (!context) {
    return notConfigured<ApiToken[]>(
      "DATABASE_URL and a workspace-bound app session are required for local token management.",
    );
  }

  const tokens = await db!
    .select({
      id: apiTokens.id,
      name: apiTokens.name,
      prefix: apiTokens.prefix,
      scope: apiTokens.scope,
      createdAt: apiTokens.createdAt,
      lastUsedAt: apiTokens.lastUsedAt,
    })
    .from(apiTokens)
    .where(
      and(
        eq(apiTokens.workspaceId, context.workspaceId),
        eq(apiTokens.status, "active"),
        isNull(apiTokens.revokedAt),
      ),
    )
    .orderBy(desc(apiTokens.createdAt));

  return success<ApiToken[]>(
    tokens.map((token) => ({
      id: token.id,
      name: token.name,
      prefix: token.prefix,
      scope: token.scope,
      createdAt: token.createdAt.toISOString(),
      lastUsedAt: token.lastUsedAt?.toISOString() ?? undefined,
    })),
  );
}

export async function createLocalToken(input: TokenCreateInput) {
  const context = await getWorkspaceContext("/dashboard/tokens");
  if (!context) {
    return notConfigured<CreatedToken>(
      "DATABASE_URL and a workspace-bound app session are required for local token management.",
    );
  }

  const prefix = `bin_live_${randomBytes(3).toString("hex")}`;
  const secret = randomBytes(18).toString("base64url");
  const rawToken = `${prefix}_${secret}`;
  const now = new Date();

  const [created] = await db!
    .insert(apiTokens)
    .values({
      workspaceId: context.workspaceId,
      createdByUserId: context.userId,
      name: input.name,
      prefix,
      lastFour: rawToken.slice(-4),
      tokenHash: createHash("sha256").update(rawToken).digest("hex"),
      scope: input.scope,
      status: "active",
      createdAt: now,
    })
    .returning({
      id: apiTokens.id,
      name: apiTokens.name,
      prefix: apiTokens.prefix,
      scope: apiTokens.scope,
      createdAt: apiTokens.createdAt,
    });

  return success<CreatedToken>({
    id: created.id,
    name: created.name,
    prefix: created.prefix,
    token: rawToken,
    scope: created.scope,
    createdAt: created.createdAt.toISOString(),
  });
}

export async function validateLocalRuntimeToken(
  rawToken: string,
): Promise<
  | { ok: true; token: ValidatedRuntimeToken }
  | { ok: false; error: "invalid_token" | "revoked_token"; message: string }
> {
  if (!db) {
    return {
      ok: false,
      error: "invalid_token",
      message: "DATABASE_URL is not configured for runtime token validation.",
    };
  }

  const tokenHash = createHash("sha256").update(rawToken.trim()).digest("hex");
  const [token] = await db
    .select({
      id: apiTokens.id,
      prefix: apiTokens.prefix,
      workspaceId: apiTokens.workspaceId,
      createdByUserId: apiTokens.createdByUserId,
      status: apiTokens.status,
      revokedAt: apiTokens.revokedAt,
    })
    .from(apiTokens)
    .where(eq(apiTokens.tokenHash, tokenHash))
    .limit(1);

  if (!token) {
    return {
      ok: false,
      error: "invalid_token",
      message: "Token is invalid.",
    };
  }

  if (token.status === "revoked" || token.revokedAt) {
    return {
      ok: false,
      error: "revoked_token",
      message: "Token has been revoked.",
    };
  }

  await db
    .update(apiTokens)
    .set({
      lastUsedAt: new Date(),
    })
    .where(eq(apiTokens.id, token.id));

  return {
    ok: true,
    token: {
      tokenId: token.id,
      prefix: token.prefix,
      workspaceId: token.workspaceId,
      principalId: token.workspaceId,
      createdByUserId: token.createdByUserId ?? undefined,
    },
  };
}

export async function revokeLocalToken(tokenId: string) {
  const context = await getWorkspaceContext("/dashboard/tokens");
  if (!context) {
    return notConfigured<unknown>(
      "DATABASE_URL and a workspace-bound app session are required for local token management.",
    );
  }

  const [revoked] = await db!
    .update(apiTokens)
    .set({
      status: "revoked",
      revokedAt: new Date(),
    })
    .where(
      and(
        eq(apiTokens.id, tokenId),
        eq(apiTokens.workspaceId, context.workspaceId),
        eq(apiTokens.status, "active"),
      ),
    )
    .returning({
      id: apiTokens.id,
    });

  if (!revoked) {
    return failure("Token not found.");
  }

  return success({ ok: true });
}

export async function getLocalUsageSummary() {
  const context = await getWorkspaceContext("/dashboard/usage");
  if (!context) {
    return notConfigured<UsageSummary>(
      "DATABASE_URL and a workspace-bound app session are required for local usage reporting.",
    );
  }

  const periodStart = startOfCurrentMonth();
  const rows = await db!
    .select({
      day: usageDaily.day,
      requests: usageDaily.requests,
      errors: usageDaily.errors,
      bandwidthGb: usageDaily.bandwidthGb,
    })
    .from(usageDaily)
    .where(
      and(
        eq(usageDaily.workspaceId, context.workspaceId),
        gte(usageDaily.day, periodStart),
      ),
    )
    .orderBy(usageDaily.day);

  const requests = rows.reduce((sum, row) => sum + row.requests, 0);
  const errors = rows.reduce((sum, row) => sum + row.errors, 0);
  const bandwidthGb = rows.reduce(
    (sum, row) => sum + parseNumeric(row.bandwidthGb),
    0,
  );

  return success<UsageSummary>({
    periodLabel: periodLabel(periodStart),
    requests,
    bandwidthGb,
    errorRate: requests > 0 ? errors / requests : 0,
    series: rows.map((row) => ({
      date: formatDay(row.day),
      requests: row.requests,
      errors: row.errors,
    })),
    topRoutes: [],
  });
}

export async function getLocalBillingSummary() {
  const context = await getWorkspaceContext("/dashboard/billing");
  if (!context) {
    return notConfigured<BillingSummary>(
      "DATABASE_URL and a workspace-bound app session are required for local billing data.",
    );
  }

  const [subscription] = await db!
    .select({
      plan: workspaceSubscriptions.plan,
      status: workspaceSubscriptions.status,
      monthlySpendUsd: workspaceSubscriptions.monthlySpendUsd,
      includedRequests: workspaceSubscriptions.includedRequests,
      usageRequests: workspaceSubscriptions.usageRequests,
      renewalDate: workspaceSubscriptions.renewalDate,
    })
    .from(workspaceSubscriptions)
    .where(eq(workspaceSubscriptions.workspaceId, context.workspaceId))
    .limit(1);

  return success<BillingSummary>({
    planName: subscription?.plan ?? "starter",
    status: subscription?.status ?? "draft",
    monthlySpendUsd: parseNumeric(subscription?.monthlySpendUsd),
    includedRequests: subscription?.includedRequests ?? 0,
    usageRequests: subscription?.usageRequests ?? 0,
    renewalDate: subscription?.renewalDate?.toISOString() ?? undefined,
    customerPortalUrl: undefined,
  });
}

export async function getLocalTunnels() {
  const context = await getWorkspaceContext("/dashboard/tunnels");
  if (!context) {
    return notConfigured<Tunnel[]>(
      "DATABASE_URL and a workspace-bound app session are required for local tunnel inventory.",
    );
  }

  const storedTunnels = await listStoredTunnels(context.workspaceId);
  const engineSessions = await getEngineSessions();

  const runtimeTunnels: Tunnel[] =
    engineSessions.data?.map((session) => ({
      id: session.id,
      name: session.name,
      hostname: readHostname(session.publicUrl) || session.subdomain || session.name,
      protocol: session.protocol || "http",
      region: "global",
      status: mapSessionStatus(session.status, session.connection),
      requests24h: 0,
      lastSeenAt: session.lastSeenAt ?? session.createdAt,
    })) ?? [];

  const data = mergeTunnels(runtimeTunnels, storedTunnels);

  if (!engineSessions.configured) {
    return failure<Tunnel[]>(
      engineSessions.error ??
        "ENGINE_API_URL is required for live tunnel runtime data.",
      data,
    );
  }

  if (!engineSessions.ok) {
    return failure<Tunnel[]>(
      engineSessions.error ?? "Could not load live tunnel sessions from binboi-go.",
      data,
    );
  }

  return success<Tunnel[]>(data);
}

export async function getLocalDashboardOverview() {
  const [tokensResult, usageResult, tunnelsResult, engineHealthResult] =
    await Promise.all([
      getLocalTokens(),
      getLocalUsageSummary(),
      getLocalTunnels(),
      getEngineHealth(),
    ]);

  const data: DashboardOverview = {
    activeTunnels:
      tunnelsResult.data?.filter((tunnel) => tunnel.status !== "offline").length ?? 0,
    requestsToday:
      tunnelsResult.data?.reduce((sum, tunnel) => sum + tunnel.requests24h, 0) ??
      usageResult.data?.requests ??
      0,
    activeTokens: tokensResult.data?.length ?? 0,
    activeProjects: 1,
    errorRate: usageResult.data?.errorRate ?? 0,
    incidentStatus:
      engineHealthResult.data?.status ??
      (tunnelsResult.ok ? "healthy" : "degraded"),
  };

  const ok =
    tokensResult.ok &&
    usageResult.ok &&
    tunnelsResult.ok &&
    (engineHealthResult.ok || !engineHealthResult.configured);
  const configured =
    tokensResult.configured &&
    usageResult.configured &&
    tunnelsResult.configured;
  const error =
    engineHealthResult.error ||
    tunnelsResult.error ||
    usageResult.error ||
    tokensResult.error;

  if (!configured) {
    return notConfigured<DashboardOverview>(
      error ??
        "Database and engine configuration are required for the local control-plane overview.",
    );
  }

  if (!ok) {
    return failure<DashboardOverview>(
      error ?? "Some local control-plane sources are unavailable.",
      data,
    );
  }

  return success(data);
}

export async function getLocalCheckoutLink(planId: string) {
  if (!db) {
    return notConfigured<{ url?: string }>(
      "DATABASE_URL is required before local billing orchestration can decide how checkout should work.",
    );
  }

  const billingApiUrl = process.env.BILLING_API_URL;

  if (!billingApiUrl) {
    return failure<{ url?: string }>(
      `Billing checkout is not wired yet for plan "${planId}". Add BILLING_API_URL to enable hosted checkout.`,
    );
  }

  return failure<{ url?: string }>(
    `Billing checkout for plan "${planId}" should come from the external billing service. Local DB-backed billing intentionally stays read-only.`,
  );
}
