"use client";

/**
 * Sticky docs navigation that reflects the structured article model.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DOCS_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 fixed w-64 h-full -mt-10">
      <div className="space-y-6">
        {DOCS_LINKS.map((section) => (
          <div key={section.label} className="">
            <p className="px-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.children?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-2xl px-3 py-2 text-sm text-foreground/68 transition-colors hover:bg-white/6 hover:text-foreground",
                    pathname === link.href && "bg-white/8 text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
