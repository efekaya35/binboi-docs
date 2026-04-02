"use client";

/**
 * Sidebar navigation for the authenticated dashboard surfaces.
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
    <aside className="flex h-full min-h-full flex-col rounded-[30px] border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex items-center justify-between px-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Workspace
          </p>
          <p className="mt-2 text-sm text-foreground/70">Binboi Cloud</p>
        </div>
        <Badge className="text-primary">Live</Badge>
      </div>

      <nav className="flex-1 space-y-1">
        {DASHBOARD_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-2xl px-4 py-3 text-sm text-foreground/66 transition-colors hover:bg-white/6 hover:text-foreground",
              isActive(pathname, link.href) && "bg-white/8 text-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 rounded-[24px] border border-white/8 bg-black/20 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/42">
          Signed in
        </p>
        <p className="mt-3 text-sm text-foreground/72">{userEmail}</p>
      </div>
    </aside>
  );
}
