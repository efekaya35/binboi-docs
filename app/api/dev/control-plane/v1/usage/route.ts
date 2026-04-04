import { NextResponse } from "next/server";

import { getDevUsage } from "@/lib/backend/dev-store";

export async function GET() {
  return NextResponse.json({
    data: getDevUsage(),
  });
}
