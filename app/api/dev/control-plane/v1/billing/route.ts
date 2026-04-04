import { NextResponse } from "next/server";

import { getDevBilling } from "@/lib/backend/dev-store";

export async function GET() {
  return NextResponse.json({
    data: getDevBilling(),
  });
}
