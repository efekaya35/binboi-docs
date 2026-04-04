import { NextResponse } from "next/server";

import { validateLocalRuntimeToken } from "@/lib/backend/local-control-plane";
import { isInternalApiRequestAuthorized } from "@/lib/security/internal";

export async function POST(request: Request) {
  if (!isInternalApiRequestAuthorized(request.headers)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { token?: string }
    | null;
  const token = body?.token?.trim() ?? "";

  if (!token) {
    return NextResponse.json(
      {
        error: "token_required",
        message: "Token is required.",
      },
      { status: 400 },
    );
  }

  const result = await validateLocalRuntimeToken(token);

  if (!result.ok) {
    const status = result.error === "revoked_token" ? 403 : 401;

    return NextResponse.json(
      {
        error: result.error,
        message: result.message,
      },
      { status },
    );
  }

  return NextResponse.json({
    ok: true,
    data: result.token,
  });
}
