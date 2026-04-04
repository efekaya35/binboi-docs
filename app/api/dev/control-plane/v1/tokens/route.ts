import { NextResponse } from "next/server";

import { createDevToken, getDevStore } from "@/lib/backend/dev-store";

export async function GET() {
  const tokens = getDevStore().tokens.map(({ token: _token, ...rest }) => rest);

  return NextResponse.json({
    items: tokens,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | Record<string, string>
    | null;
  const name = body?.name?.trim() ?? "";
  const scope = body?.scope?.trim() ?? "";

  if (!name || !scope) {
    return NextResponse.json(
      {
        message: "Token name and scope are required.",
        fieldErrors: {
          ...(name ? {} : { name: "Token name is required." }),
          ...(scope ? {} : { scope: "Scope is required." }),
        },
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    data: createDevToken({ name, scope }),
  });
}
