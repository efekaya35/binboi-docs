import { NextResponse } from "next/server";

import { getDevEngineHealth } from "@/lib/backend/dev-store";

export async function GET() {
  return NextResponse.json({
    data: getDevEngineHealth(),
  });
}
