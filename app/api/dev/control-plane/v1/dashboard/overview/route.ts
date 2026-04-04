import { NextResponse } from "next/server";

import { getDevOverview } from "@/lib/backend/dev-store";

export async function GET() {
  return NextResponse.json({
    data: getDevOverview(),
  });
}
