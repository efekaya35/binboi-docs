import { NextResponse } from "next/server";

import { getDevEngineTunnels } from "@/lib/backend/dev-store";

export async function GET() {
  return NextResponse.json({
    items: getDevEngineTunnels(),
  });
}
