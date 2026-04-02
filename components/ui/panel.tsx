/**
 * Reusable dark surface for cards, panels, and list containers.
 */
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Panel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.85)] backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
