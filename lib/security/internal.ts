/**
 * Shared internal-request authorization helpers for protected engine/control endpoints.
 */
import { env } from "@/lib/env";

function readBearerToken(authorizationHeader: string | null) {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return "";
  }

  return authorizationHeader.slice("Bearer ".length).trim();
}

/**
 * Validates whether an internal app endpoint request carries the configured shared secret.
 */
export function isInternalApiRequestAuthorized(headers: Headers) {
  const configuredSecret = env.controlPlaneInternalSecret || env.internalApiSecret;

  if (!configuredSecret) {
    return false;
  }

  const secretFromHeader = headers.get("x-binboi-internal-secret");
  const bearerSecret = readBearerToken(headers.get("authorization"));

  return secretFromHeader === configuredSecret || bearerSecret === configuredSecret;
}
