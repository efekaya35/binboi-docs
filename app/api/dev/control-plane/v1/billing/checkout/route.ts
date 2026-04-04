import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | Record<string, string>
    | null;
  const url = new URL("/dashboard/billing", request.url);

  if (body?.planId) {
    url.searchParams.set("checkout", body.planId);
  }

  url.searchParams.set("source", "dev-checkout");

  return NextResponse.json({
    url: url.toString(),
  });
}
