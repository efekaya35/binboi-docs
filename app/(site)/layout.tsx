/**
 * Public-site layout with fixed header, shared spacing, and footer.
 */
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SiteScrollProvider } from "@/components/site/site-scroll-provider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SiteScrollProvider>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] " />
        <SiteHeader />
        <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          {children}
        </main>
        {/* <SiteFooter /> */}
      </div>
    </SiteScrollProvider>
  );
}
