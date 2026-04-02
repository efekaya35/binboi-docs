/**
 * Shared select primitive for forms that do not need a custom popover.
 */
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-foreground shadow-inner shadow-black/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        className,
      )}
      {...props}
    />
  );
}
