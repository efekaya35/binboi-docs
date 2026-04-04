import { NextResponse } from "next/server";

import { revokeDevToken } from "@/lib/backend/dev-store";

type TokenRouteContext = {
  params: Promise<{
    tokenId: string;
  }>;
};

export async function DELETE(_request: Request, context: TokenRouteContext) {
  const { tokenId } = await context.params;
  const revoked = revokeDevToken(tokenId);

  if (!revoked) {
    return NextResponse.json(
      {
        message: "Token not found.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true });
}
