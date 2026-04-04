/**
 * Dashboard layout with persistent sidebar and product-focused workspace framing.
 */
import type { ReactNode } from "react";
import Link from "next/link";

import { AccentOrb, SurfaceShell } from "@/components/visual";
import { logoutAction } from "@/lib/auth/actions";
import { requireAuthenticatedAppUser } from "@/lib/auth/guards";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuthenticatedAppUser();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#04070b] lg:pl-[292px] xl:pl-[300px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,249,157,0.08),transparent_24rem),radial-gradient(circle_at_right,rgba(87,127,255,0.12),transparent_30rem)]" />
      <div className="hidden lg:block">
        <div className="fixed inset-y-0 left-0 z-40 w-[292px] border-r border-white/[0.07] xl:w-[300px]">
          <DashboardSidebar userEmail={session.email} />
        </div>
      </div>

      <div className="relative px-4 py-4 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <DashboardSidebar userEmail={session.email} />
        </div>

        <div className="mx-auto flex min-h-screen max-w-[1380px] flex-col gap-6">
          <SurfaceShell
            glow="dual"
            className="flex flex-col gap-4 rounded-[26px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-foreground"
              >
                <AccentOrb />
                <span>BINBOI</span>
              </Link>
              <p className="text-sm text-foreground/54">
                Signed in as {session.name || session.email}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/56">
              <Link href="/docs" className="hover:text-foreground">
                Docs
              </Link>
              <Link href="/dashboard/install" className="hover:text-foreground">
                Install
              </Link>
              <Link href="/support" className="hover:text-foreground">
                Support
              </Link>
              <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-foreground/58 md:inline-flex">
                {session.email}
              </span>
              <form action={logoutAction}>
                <Button size="sm" variant="secondary" type="submit">
                  Log out
                </Button>
              </form>
            </div>
          </SurfaceShell>

          <div className="min-h-[60vh] min-w-0 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
