/**
 * Shared text input styled for Binboi's dark product UI.
 */
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-foreground shadow-inner shadow-black/20 transition-colors placeholder:text-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        className,
      )}
      {...props}
    />
  );
}
