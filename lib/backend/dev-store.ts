import "server-only";

type DevUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  verified: boolean;
};

type DevInvite = {
  token: string;
  email: string;
  workspaceName: string;
};

type DevToken = {
  id: string;
  name: string;
  prefix: string;
  scope: string;
  token: string;
  createdAt: string;
  lastUsedAt?: string;
};

type DevTunnel = {
  id: string;
  name: string;
  hostname: string;
  protocol: string;
  region: string;
  status: "healthy" | "degraded" | "offline";
  requests24h: number;
  lastSeenAt: string;
};

type DevStore = {
  users: DevUser[];
  invites: DevInvite[];
  resetTokens: Map<string, string>;
  verifyTokens: Map<string, string>;
  tokens: DevToken[];
  tunnels: DevTunnel[];
};

declare global {
  var __binboiDevStore: DevStore | undefined;
}

function nowIso() {
  return new Date().toISOString();
}

function createSeedStore(): DevStore {
  return {
    users: [
      {
        id: "user_demo_1",
        email: "demo@binboi.dev",
        name: "Demo Operator",
        password: "demo12345",
        verified: true,
      },
    ],
    invites: [
      {
        token: "invite_demo_team",
        email: "invitee@binboi.dev",
        workspaceName: "Demo Workspace",
      },
    ],
    resetTokens: new Map([["demo@binboi.dev", "reset_demo_token"]]),
    verifyTokens: new Map([["new@binboi.dev", "verify_demo_token"]]),
    tokens: [
      {
        id: "tok_demo_ci",
        name: "CI deploy",
        prefix: "bnb_",
        scope: "tunnels:manage",
        token: "bnb_live_demo_ci_secret",
        createdAt: "2026-04-01T09:00:00.000Z",
        lastUsedAt: "2026-04-04T08:15:00.000Z",
      },
      {
        id: "tok_demo_docs",
        name: "Docs preview",
        prefix: "bnb_",
        scope: "workspace:write",
        token: "bnb_live_demo_docs_secret",
        createdAt: "2026-04-02T11:30:00.000Z",
        lastUsedAt: "2026-04-04T09:45:00.000Z",
      },
    ],
    tunnels: [
      {
        id: "tun_docs_preview",
        name: "docs-preview",
        hostname: "docs-preview.binboi.dev",
        protocol: "http",
        region: "fra",
        status: "healthy",
        requests24h: 18240,
        lastSeenAt: "2026-04-04T10:30:00.000Z",
      },
      {
        id: "tun_webhook_sandbox",
        name: "webhook-sandbox",
        hostname: "webhook-sandbox.binboi.dev",
        protocol: "http",
        region: "iad",
        status: "healthy",
        requests24h: 7240,
        lastSeenAt: "2026-04-04T10:27:00.000Z",
      },
      {
        id: "tun_internal_admin",
        name: "internal-admin",
        hostname: "internal-admin.binboi.dev",
        protocol: "https",
        region: "ams",
        status: "degraded",
        requests24h: 2140,
        lastSeenAt: "2026-04-04T10:11:00.000Z",
      },
    ],
  };
}

export function getDevStore() {
  if (!globalThis.__binboiDevStore) {
    globalThis.__binboiDevStore = createSeedStore();
  }

  return globalThis.__binboiDevStore;
}

export function findUserByEmail(email: string) {
  return getDevStore().users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

export function registerDevUser(input: {
  email: string;
  name: string;
  password: string;
}) {
  const store = getDevStore();
  const existingUser = findUserByEmail(input.email);

  if (existingUser) {
    return { ok: false, message: "An account with that email already exists." };
  }

  const user: DevUser = {
    id: crypto.randomUUID(),
    email: input.email,
    name: input.name,
    password: input.password,
    verified: false,
  };

  store.users.push(user);
  store.verifyTokens.set(user.email, `verify_${user.id}`);

  return { ok: true, user };
}

export function createDevToken(input: { name: string; scope: string }) {
  const store = getDevStore();
  const token = {
    id: crypto.randomUUID(),
    name: input.name,
    prefix: "bnb_",
    scope: input.scope,
    token: `bnb_live_${Math.random().toString(36).slice(2, 14)}`,
    createdAt: nowIso(),
    lastUsedAt: undefined,
  };

  store.tokens.unshift(token);
  return token;
}

export function revokeDevToken(tokenId: string) {
  const store = getDevStore();
  const index = store.tokens.findIndex((token) => token.id === tokenId);

  if (index === -1) {
    return false;
  }

  store.tokens.splice(index, 1);
  return true;
}

export function getDevOverview() {
  const store = getDevStore();
  const requestsToday = store.tunnels.reduce(
    (total, tunnel) => total + tunnel.requests24h,
    0,
  );

  return {
    activeTunnels: store.tunnels.length,
    requestsToday,
    activeTokens: store.tokens.length,
    activeProjects: 3,
    errorRate: 0.014,
    incidentStatus: "healthy" as const,
  };
}

export function getDevUsage() {
  return {
    period: {
      label: "April 2026",
      requests: 1822400,
      bandwidthGb: 92.4,
      errorRate: 0.014,
    },
    series: [
      { date: "2026-04-01", requests: 71234, errors: 82 },
      { date: "2026-04-02", requests: 85340, errors: 91 },
      { date: "2026-04-03", requests: 91214, errors: 116 },
      { date: "2026-04-04", requests: 104522, errors: 104 },
    ],
    topRoutes: [
      { route: "/docs/webhooks", requests: 401245 },
      { route: "/dashboard/tunnels", requests: 224410 },
      { route: "/api/internal/health", requests: 110244 },
      { route: "/healthz", requests: 91220 },
      { route: "/hooks/github", requests: 82214 },
    ],
  };
}

export function getDevBilling() {
  return {
    planName: "Team",
    status: "active",
    monthlySpendUsd: 49,
    includedRequests: 1000000,
    usageRequests: 1822400,
    renewalDate: "2026-05-01T00:00:00.000Z",
    customerPortalUrl: "https://billing.binboi.dev/demo-portal",
  };
}

export function getDevEngineHealth() {
  return {
    status: "healthy" as const,
    version: "0.1.0-dev",
    instanceName: "binboi-go-dev-fra-1",
    region: "fra",
    uptimeSeconds: 86400,
  };
}

export function getDevEngineTunnels() {
  return getDevStore().tunnels.map((tunnel) => ({
    id: tunnel.id,
    name: tunnel.name,
    status: tunnel.status,
    lastSeenAt: tunnel.lastSeenAt,
  }));
}
