/**
 * Route and action guards for authenticated product areas.
 */
import { redirect } from "next/navigation";

import { normalizeDashboardRedirectPath } from "@/lib/auth/redirects";
import { getCurrentAppSession } from "@/lib/auth/session";

/**
 * Requires a signed user session for dashboard pages and sensitive server actions.
 */
export async function requireAuthenticatedAppUser(nextPath = "/dashboard") {
  const session = await getCurrentAppSession();

  if (!session) {
    const safeNextPath = normalizeDashboardRedirectPath(nextPath);
    redirect(`/login?next=${encodeURIComponent(safeNextPath)}`);
  }

  return session;
}
