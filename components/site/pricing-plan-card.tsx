/**
 * Public pricing plan card with restrained emphasis for highlighted tiers.
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import type { PricingPlan } from "@/constants";
import { cn } from "@/lib/utils";

type PricingPlanCardProps = {
  plan: PricingPlan;
};

export function PricingPlanCard({ plan }: PricingPlanCardProps) {
  return (
    <Panel
      className={cn(
        "relative h-full overflow-hidden rounded-[32px] p-0",
        plan.highlight
          ? "border-primary/22 bg-[linear-gradient(180deg,rgba(103,195,151,0.12),rgba(255,255,255,0.03))]"
          : "border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))]",
      )}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {plan.highlight ? (
        <div className="absolute right-6 top-6 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          Most used
        </div>
      ) : null}

      <div className="relative flex h-full flex-col gap-6 p-6 sm:p-7">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {plan.name}
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground">
              {plan.price}
              {plan.price.startsWith("$") ? (
                <span className="ml-2 text-base font-normal text-foreground/48">
                  / month
                </span>
              ) : null}
            </h2>
            <p className="max-w-sm text-sm leading-7 text-foreground/62">
              {plan.description}
            </p>
          </div>

          <div className="rounded-[24px] border border-white/8 bg-black/24 p-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
            {plan.footnote}
          </div>
        </div>

        <ul className="space-y-3 text-sm leading-7 text-foreground/68">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          className="mt-auto w-full"
          variant={plan.highlight ? "primary" : "secondary"}
        >
          <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
        </Button>
      </div>
    </Panel>
  );
}
