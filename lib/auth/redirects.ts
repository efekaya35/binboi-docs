/**
 * Shared redirect-target normalization for auth and protected product routes.
 */
const AUTH_REDIRECT_FALLBACK = "/dashboard";

/**
 * Normalizes the post-login target to an internal dashboard route only.
 */
export function normalizeDashboardRedirectPath(nextPath?: string | null) {
  if (!nextPath || !nextPath.startsWith("/dashboard")) {
    return AUTH_REDIRECT_FALLBACK;
  }

  return nextPath;
}
