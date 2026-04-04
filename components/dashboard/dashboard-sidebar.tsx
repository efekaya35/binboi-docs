"use client";

/**
 * Sidebar navigation for dashboard surfaces using the shared rail and active-nav treatments.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { DASHBOARD_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type DashboardSidebarProps = {
  userEmail: string;
};

export function DashboardSidebar({ userEmail }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="surface-rail flex h-full min-h-0 flex-col overflow-hidden">
      <div className="border-b border-white/[0.07] px-6 py-7">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/42">
              Binboi dashboard
            </p>
            <p className="mt-3 text-lg font-semibold text-foreground">Workspace control</p>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/[0.08] bg-white/[0.025] px-4 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/42">
                Workspace
              </p>
              <p className="mt-2 text-sm text-foreground/72">Binboi Cloud</p>
            </div>
            <Badge className="text-foreground/72">Live</Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5" data-native-scroll="true">
        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/34">
          Product areas
        </p>
        <nav className="space-y-1">
          {DASHBOARD_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-2xl px-4 py-3 text-sm text-foreground/68 transition-colors hover:bg-white/[0.03] hover:text-foreground",
                isActive(pathname, link.href) &&
                  "surface-nav-active border text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/[0.07] bg-white/[0.015] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/42">
          Signed in
        </p>
        <p className="mt-3 text-sm text-foreground/72">{userEmail}</p>
      </div>
    </aside>
  );
}
