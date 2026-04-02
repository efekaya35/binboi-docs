"use client";

/**
 * Reusable visual section that reserves an intentional slot for future product imagery.
 */
import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

type ImageRevealShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  detail?: string;
  children?: ReactNode;
  className?: string;
};

function ImageRevealFallback() {
  return (
    <div className="grid h-full gap-5 p-6 sm:p-8">
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/42">
        <span>Visual slot</span>
        <span>Ready for asset</span>
      </div>

      <div className="grid flex-1 gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[26px] border border-white/8 bg-black/24 p-5">
          <div className="h-3 w-24 rounded-full bg-white/8" />
          <div className="mt-5 grid gap-3">
            <div className="h-[4.5rem] rounded-[20px] border border-primary/16 bg-primary/8" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-24 rounded-[20px] border border-white/8 bg-white/5" />
              <div className="h-24 rounded-[20px] border border-white/8 bg-white/5" />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[24px] border border-white/8 bg-white/5 p-5">
            <div className="h-3 w-[4.5rem] rounded-full bg-white/8" />
            <div className="mt-4 space-y-3">
              <div className="h-10 rounded-[16px] bg-white/6" />
              <div className="h-10 rounded-[16px] bg-white/6" />
              <div className="h-10 rounded-[16px] bg-primary/10" />
            </div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(103,195,151,0.12),transparent_60%)] p-5">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
            </div>
            <div className="mt-5 h-[7.5rem] rounded-[20px] border border-white/8 bg-black/26" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageRevealShell({
  children,
  className,
  description,
  detail,
  eyebrow,
  title,
}: ImageRevealShellProps) {
  return (
    <Panel
      className={cn(
        "relative overflow-hidden rounded-[36px] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-0",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(103,195,151,0.18),transparent_70%)]" />
      <div className="relative grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-0">
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div className="space-y-5">
            <Badge>{eyebrow}</Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="text-base leading-8 text-foreground/66">{description}</p>
            </div>
          </div>

          {detail ? (
            <p className="max-w-md text-sm leading-7 text-foreground/52">{detail}</p>
          ) : null}
        </div>

        <div className="p-4 pt-0 sm:p-6 sm:pt-0 lg:p-8 lg:pl-0">
          <motion.div
            className="relative min-h-[320px] overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.2))]"
            initial={{ opacity: 0, clipPath: "inset(0 0 12% 0 round 32px)", scale: 0.985 }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 32px)", scale: 1 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(103,195,151,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.18))]" />
            <div className="relative h-full">{children ?? <ImageRevealFallback />}</div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
          </motion.div>
        </div>
      </div>
    </Panel>
  );
}
