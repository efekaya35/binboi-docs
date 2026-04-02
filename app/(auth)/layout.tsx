/**
 * Auth layout that keeps login and recovery flows visually aligned with the product site.
 */
import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(103,195,151,0.16),transparent_28rem),radial-gradient(circle_at_bottom_right,rgba(255,234,194,0.08),transparent_20rem)]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-foreground"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/12 text-primary">
              B
            </span>
            <span>BINBOI</span>
          </Link>
          <Link href="/docs" className="text-sm text-foreground/62 hover:text-foreground">
            Documentation
          </Link>
        </div>

        <div className="grid flex-1 gap-8 lg:grid-cols-[1fr_460px] lg:items-center">
          <div className="hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-10 lg:block">
            <div className="max-w-xl space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Secure access surface
              </p>
              <h1 className="text-5xl font-semibold leading-tight tracking-tight text-foreground">
                Keep auth flows polished even before the final identity stack lands.
              </h1>
              <p className="text-base leading-8 text-foreground/66">
                Binboi separates auth UX from auth ownership. That gives the product a
                clean user journey now while leaving room for a real upstream identity
                service, invite system, and email provider in production.
              </p>

              <div className="grid gap-4">
                {[
                  "Clean login, registration, and recovery paths.",
                  "Server actions already wired for an upstream auth API.",
                  "Validation errors stay readable without feeling template-like.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-white/8 bg-black/20 px-5 py-4 text-sm leading-7 text-foreground/68"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
