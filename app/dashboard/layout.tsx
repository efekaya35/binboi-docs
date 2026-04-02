/**
 * Dashboard layout with persistent sidebar and product-focused workspace framing.
 */
import type { ReactNode } from "react";
import Link from "next/link";

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
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[96rem] flex-col gap-6">
        <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-foreground"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/12 text-primary">
              B
            </span>
            <span>BINBOI</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-foreground/56">
            <Link href="/docs" className="hover:text-foreground">
              Docs
            </Link>
            <Link href="/support" className="hover:text-foreground">
              Support
            </Link>
            <span className="hidden rounded-full border border-white/8 bg-black/20 px-3 py-1 text-xs text-foreground/58 md:inline-flex">
              {session.email}
            </span>
            <form action={logoutAction}>
              <Button size="sm" variant="secondary" type="submit">
                Log out
              </Button>
            </form>
          </div>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-stretch">
          <div className="lg:h-full">
            <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-8.5rem)]">
              <DashboardSidebar userEmail={session.email} />
            </div>
          </div>
          <div className="min-h-[60vh] space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
