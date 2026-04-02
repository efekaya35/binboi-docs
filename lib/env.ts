import { DEFAULT_APP_URL } from "@/constants";

/**
 * Centralized access to runtime configuration used by the product app.
 */
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_APP_URL,
  databaseUrl: process.env.DATABASE_URL ?? "",
  authSecret: process.env.AUTH_SECRET ?? "",
  authBaseUrl: process.env.AUTH_API_URL ?? "",
  authApiSecret: process.env.AUTH_API_SECRET ?? "",
  githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  githubOauthUrl: process.env.GITHUB_OAUTH_AUTHORIZE_URL ?? "",
  paddleEnvironment: process.env.PADDLE_ENVIRONMENT ?? "sandbox",
  paddleApiKey: process.env.PADDLE_API_KEY ?? "",
  paddleWebhookSecret: process.env.PADDLE_WEBHOOK_SECRET ?? "",
  paddlePriceStarter: process.env.PADDLE_PRICE_STARTER ?? "",
  paddlePriceTeam: process.env.PADDLE_PRICE_TEAM ?? "",
  paddlePriceEnterprise: process.env.PADDLE_PRICE_ENTERPRISE ?? "",
  emailProvider: process.env.EMAIL_PROVIDER ?? "",
  emailApiKey: process.env.EMAIL_API_KEY ?? "",
  controlPlaneApiUrl: process.env.CONTROL_PLANE_API_URL ?? "",
  controlPlaneApiKey: process.env.CONTROL_PLANE_API_KEY ?? "",
  controlPlaneInternalApiUrl:
    process.env.CONTROL_PLANE_INTERNAL_API_URL ?? process.env.INTERNAL_API_URL ?? "",
  controlPlaneInternalSecret:
    process.env.CONTROL_PLANE_INTERNAL_SECRET ?? process.env.INTERNAL_API_SECRET ?? "",
  engineApiUrl: process.env.ENGINE_API_URL ?? "",
  engineApiKey: process.env.ENGINE_API_KEY ?? "",
  engineHealthPath: process.env.ENGINE_HEALTH_PATH ?? "/v1/health",
  engineTunnelsPath: process.env.ENGINE_TUNNELS_PATH ?? "/v1/tunnels",
  engineSessionsPath: process.env.ENGINE_SESSIONS_PATH ?? "/v1/sessions",
  engineConnectPath: process.env.ENGINE_CONNECT_PATH ?? "/v1/connect",
  internalApiUrl: process.env.INTERNAL_API_URL ?? "",
  internalApiSecret: process.env.INTERNAL_API_SECRET ?? "",
  billingApiUrl: process.env.BILLING_API_URL ?? process.env.CONTROL_PLANE_API_URL ?? "",
  billingApiKey: process.env.BILLING_API_KEY ?? process.env.CONTROL_PLANE_API_KEY ?? "",
} as const;

/**
 * Utility for concise integration gating checks in loaders and actions.
 */
export function hasEnvValues(...values: Array<string | undefined>) {
  return values.every((value) => Boolean(value));
}
