import { NextResponse } from "next/server";

import { getDevStore } from "@/lib/backend/dev-store";

export async function GET() {
  return NextResponse.json({
    items: getDevStore().tunnels,
  });
}
