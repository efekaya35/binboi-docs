"use client";

/**
 * Fixed product-site header shared across all public pages.
 */
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SITE_HEADER_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between rounded-full border border-white/10 bg-black/70 px-4 py-3 shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/12 text-primary">
                B
              </span>
              <span>BINBOI</span>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              {SITE_HEADER_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm text-foreground/68 transition-colors hover:text-foreground",
                    isActivePath(pathname, item.href) && "bg-white/7 text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild size="sm" variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Start free</Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 lg:px-8 md:hidden">
          <div className="rounded-[28px] border border-white/10 bg-black/88 p-4 shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <nav className="flex flex-col gap-2">
              {SITE_HEADER_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm text-foreground/75 transition-colors hover:bg-white/6 hover:text-foreground",
                    isActivePath(pathname, item.href) && "bg-white/7 text-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 grid gap-2">
              <Button asChild variant="secondary">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  Start free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
