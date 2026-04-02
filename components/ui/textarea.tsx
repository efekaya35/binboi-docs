/**
 * Shared textarea primitive for support and settings experiences.
 */
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-foreground shadow-inner shadow-black/20 transition-colors placeholder:text-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        className,
      )}
      {...props}
    />
  );
}
