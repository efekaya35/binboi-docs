/**
 * Product-site footer for public pages and documentation.
 */
import Link from "next/link";

import { SITE_FOOTER_LINKS, PRODUCT_DESCRIPTION, PRODUCT_NAME } from "@/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-[0.24em] text-foreground/90">
            {PRODUCT_NAME}
          </p>
          <p className="max-w-xl text-sm leading-7 text-foreground/62">
            {PRODUCT_DESCRIPTION}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {SITE_FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/65 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
