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
import { fetchServiceJson } from "@/lib/backend/client";
import {
  createLocalToken,
  getLocalBillingSummary,
  getLocalCheckoutLink,
  getLocalDashboardOverview,
  getLocalTokens,
  getLocalTunnels,
  getLocalUsageSummary,
  revokeLocalToken,
} from "@/lib/backend/local-control-plane";

const CONTROL_PLANE_PATHS = {
  overview: "/v1/dashboard/overview",
  tunnels: "/v1/tunnels",
  tokens: "/v1/tokens",
  usage: "/v1/usage",
  billing: "/v1/billing",
  checkout: "/v1/billing/checkout",
};

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function extractPayload(value: unknown): unknown {
  if (!isRecord(value)) {
    return value;
  }

  if ("data" in value) {
    return value.data;
  }

  if ("items" in value) {
    return value.items;
  }

  return value;
}

function extractList(value: unknown) {
  const payload = extractPayload(value);
  return Array.isArray(payload) ? payload : [];
}

function readString(record: JsonRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return "";
}

function readNumber(record: JsonRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
      return Number(value);
    }
  }

  return 0;
}

function readOverview(value: unknown): DashboardOverview {
  const payload = extractPayload(value);
  const record = isRecord(payload) ? payload : {};
  const incidentStatus = readString(record, "incidentStatus", "status", "health");

  return {
    activeTunnels: readNumber(record, "activeTunnels", "tunnelCount"),
    requestsToday: readNumber(record, "requestsToday", "dailyRequests", "requests"),
    activeTokens: readNumber(record, "activeTokens", "tokenCount"),
    activeProjects: readNumber(record, "activeProjects", "projectCount", "services"),
    errorRate: readNumber(record, "errorRate", "errors"),
    incidentStatus:
      incidentStatus === "degraded" || incidentStatus === "offline"
        ? incidentStatus
        : "healthy",
  };
}

function readTunnels(value: unknown): Tunnel[] {
  return extractList(value).map((item, index) => {
    const record = isRecord(item) ? item : {};
    const status = readString(record, "status", "health");

    return {
      id: readString(record, "id") || `tunnel-${index + 1}`,
      name: readString(record, "name", "label") || `Tunnel ${index + 1}`,
      hostname: readString(record, "hostname", "host", "url"),
      protocol: readString(record, "protocol") || "http",
      region: readString(record, "region") || "global",
      status:
        status === "degraded" || status === "offline" ? status : "healthy",
      requests24h: readNumber(record, "requests24h", "requestCount", "requests"),
      lastSeenAt:
        readString(record, "lastSeenAt", "updatedAt", "lastSeen") ||
        new Date().toISOString(),
    };
  });
}

function readTokens(value: unknown): ApiToken[] {
  return extractList(value).map((item, index) => {
    const record = isRecord(item) ? item : {};

    return {
      id: readString(record, "id") || `token-${index + 1}`,
      name: readString(record, "name") || `Token ${index + 1}`,
      prefix: readString(record, "prefix", "tokenPrefix") || "bnb_",
      scope: readString(record, "scope", "permissions") || "workspace:read",
      createdAt:
        readString(record, "createdAt", "issuedAt") || new Date().toISOString(),
      lastUsedAt: readString(record, "lastUsedAt", "lastUsed") || undefined,
    };
  });
}

function readCreatedToken(value: unknown): CreatedToken {
  const payload = extractPayload(value);
  const record = isRecord(payload) ? payload : {};

  return {
    id: readString(record, "id") || crypto.randomUUID(),
    name: readString(record, "name") || "New token",
    prefix: readString(record, "prefix", "tokenPrefix") || "bnb_",
    token: readString(record, "token", "secret", "value"),
    scope: readString(record, "scope") || "workspace:read",
    createdAt: readString(record, "createdAt") || new Date().toISOString(),
  };
}

function readUsage(value: unknown): UsageSummary {
  const payload = extractPayload(value);
  const record = isRecord(payload) ? payload : {};
  const period = isRecord(record.period) ? record.period : {};
  const rawSeries = Array.isArray(record.series) ? record.series : [];
  const rawTopRoutes = Array.isArray(record.topRoutes) ? record.topRoutes : [];

  return {
    periodLabel: readString(period, "label") || "Current period",
    requests: readNumber(period, "requests", "totalRequests") || readNumber(record, "requests"),
    bandwidthGb: readNumber(period, "bandwidthGb", "bandwidth"),
    errorRate: readNumber(period, "errorRate") || readNumber(record, "errorRate"),
    series: rawSeries.map((entry, index) => {
      const item = isRecord(entry) ? entry : {};
      return {
        date: readString(item, "date") || `Day ${index + 1}`,
        requests: readNumber(item, "requests"),
        errors: readNumber(item, "errors"),
      };
    }),
    topRoutes: rawTopRoutes.map((entry, index) => {
      const item = isRecord(entry) ? entry : {};
      return {
        route: readString(item, "route", "path") || `Route ${index + 1}`,
        requests: readNumber(item, "requests"),
      };
    }),
  };
}

function readBilling(value: unknown): BillingSummary {
  const payload = extractPayload(value);
  const record = isRecord(payload) ? payload : {};

  return {
    planName: readString(record, "planName", "plan") || "Starter",
    status: readString(record, "status") || "Draft",
    monthlySpendUsd: readNumber(record, "monthlySpendUsd", "monthlySpend"),
    includedRequests: readNumber(record, "includedRequests"),
    usageRequests: readNumber(record, "usageRequests", "requests"),
    renewalDate: readString(record, "renewalDate", "renewsAt") || undefined,
    customerPortalUrl:
      readString(record, "customerPortalUrl", "portalUrl", "manageUrl") || undefined,
  };
}

function mapResult<T>(
  result: ServiceResult<unknown>,
  mapData: (value: unknown) => T,
): ServiceResult<T> {
  if (!result.ok || result.data === null) {
    return {
      ...result,
      data: null,
    };
  }

  return {
    ...result,
    data: mapData(result.data),
  };
}

/**
 * Loads normalized dashboard summary data from the control plane.
 */
export async function getDashboardOverview() {
  const localResult = await getLocalDashboardOverview();
  if (localResult.configured) {
    return localResult;
  }

  const result = await fetchServiceJson<unknown>("controlPlane", CONTROL_PLANE_PATHS.overview);
  return mapResult(result, readOverview);
}

/**
 * Loads normalized tunnel data from the control plane.
 */
export async function getTunnels() {
  const localResult = await getLocalTunnels();
  if (localResult.configured) {
    return localResult;
  }

  const result = await fetchServiceJson<unknown>("controlPlane", CONTROL_PLANE_PATHS.tunnels);
  return mapResult(result, readTunnels);
}

/**
 * Loads normalized token data from the control plane.
 */
export async function getTokens() {
  const localResult = await getLocalTokens();
  if (localResult.configured) {
    return localResult;
  }

  const result = await fetchServiceJson<unknown>("controlPlane", CONTROL_PLANE_PATHS.tokens);
  return mapResult(result, readTokens);
}

/**
 * Creates a new token against the control plane.
 */
export async function createToken(input: TokenCreateInput) {
  const localResult = await createLocalToken(input);
  if (localResult.configured) {
    return localResult;
  }

  const result = await fetchServiceJson<unknown>("controlPlane", CONTROL_PLANE_PATHS.tokens, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return mapResult(result, readCreatedToken);
}

/**
 * Revokes an existing token against the control plane.
 */
export async function revokeToken(tokenId: string) {
  const localResult = await revokeLocalToken(tokenId);
  if (localResult.configured) {
    return localResult;
  }

  return fetchServiceJson<unknown>("controlPlane", `${CONTROL_PLANE_PATHS.tokens}/${tokenId}`, {
    method: "DELETE",
  });
}

/**
 * Loads normalized usage data from the control plane.
 */
export async function getUsageSummary() {
  const localResult = await getLocalUsageSummary();
  if (localResult.configured) {
    return localResult;
  }

  const result = await fetchServiceJson<unknown>("controlPlane", CONTROL_PLANE_PATHS.usage);
  return mapResult(result, readUsage);
}

/**
 * Loads normalized billing data from the control plane.
 */
export async function getBillingSummary() {
  const localResult = await getLocalBillingSummary();
  if (localResult.configured) {
    return localResult;
  }

  const result = await fetchServiceJson<unknown>("controlPlane", CONTROL_PLANE_PATHS.billing);
  return mapResult(result, readBilling);
}

/**
 * Requests a checkout URL from the billing or control plane integration.
 */
export async function createCheckoutLink(planId: string) {
  const localResult = await getLocalCheckoutLink(planId);
  if (localResult.configured) {
    return localResult;
  }

  return fetchServiceJson<{ url?: string }>("billing", CONTROL_PLANE_PATHS.checkout, {
    method: "POST",
    body: JSON.stringify({ planId }),
  });
}
