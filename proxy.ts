/**
 * Request-time route protection for dashboard surfaces, selected auth routes, and internal APIs.
 */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { normalizeDashboardRedirectPath } from "@/lib/auth/redirects";
import {
  APP_SESSION_COOKIE_NAME,
  readSessionFromCookieValue,
} from "@/lib/auth/session-token";
import { isInternalApiRequestAuthorized } from "@/lib/security/internal";

const SIGNED_OUT_ONLY_ROUTES = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
]);

function buildLoginRedirect(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const nextPath = normalizeDashboardRedirectPath(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  loginUrl.searchParams.set("next", nextPath);
  return NextResponse.redirect(loginUrl);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/internal/")) {
    if (!isInternalApiRequestAuthorized(request.headers)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  }

  const session = readSessionFromCookieValue(
    request.cookies.get(APP_SESSION_COOKIE_NAME)?.value ?? null,
  );

  if (pathname.startsWith("/dashboard") && !session) {
    return buildLoginRedirect(request);
  }

  if (SIGNED_OUT_ONLY_ROUTES.has(pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/api/internal/:path*",
  ],
};
