/**
 * Protected internal health endpoint for control-plane checks against the `binboi-go` engine.
 */
import { NextResponse } from "next/server";

import { getEngineHealth } from "@/lib/backend/engine";
import { isInternalApiRequestAuthorized } from "@/lib/security/internal";

/**
 * Returns a normalized engine health payload when the caller provides the internal shared secret.
 */
export async function GET(request: Request) {
  if (!isInternalApiRequestAuthorized(request.headers)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await getEngineHealth();

  if (!result.configured) {
    return NextResponse.json(
      {
        configured: false,
        error:
          result.error ??
          "ENGINE_API_URL is not configured for internal engine health checks.",
      },
      { status: 503 },
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        configured: true,
        error: result.error ?? "The binboi-go engine health check failed.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    configured: true,
    data: result.data,
    ok: true,
  });
}
