/**
 * Public pricing page with plan comparison and billing clarifications.
 */
import Link from "next/link";

import { PricingPlanCard } from "@/components/site/pricing-plan-card";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PRICING_FAQS, PRICING_PLANS } from "@/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Straightforward pricing for Binboi workspaces, usage, and support.",
  path: "/pricing",
});

const PRICING_PRINCIPLES = [
  {
    title: "Start simple",
    description: "Onboard without mystery pricing while the product surface is still taking shape.",
  },
  {
    title: "Upgrade with intent",
    description: "Move into paid plans when routing, visibility, and support become operational needs.",
  },
  {
    title: "Keep billing legible",
    description: "Present usage and checkout in a way finance and engineering can both follow.",
  },
];

const PRICING_CTA_POINTS = [
  "Starter gives teams room to explore without billing friction.",
  "Team is designed for the moment operational hygiene becomes shared work.",
  "Enterprise keeps rollout, contracts, and support commitments explicit.",
];

export default function PricingPage() {
  return (
    <div className="space-y-14">
      <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Pricing that leaves room for growth without hiding the model"
            description="Binboi starts simple, then adds usage-aware reporting and billing surfaces when your backend and Paddle configuration are ready."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Panel className="relative overflow-hidden rounded-[34px] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-0">
            <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(103,195,151,0.16),transparent_72%)]" />
            <div className="relative grid gap-4 p-6 sm:grid-cols-3 sm:p-7">
              {PRICING_PRINCIPLES.map((principle) => (
                <div key={principle.title} className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {principle.title}
                  </p>
                  <p className="text-sm leading-7 text-foreground/62">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </section>

      <RevealGroup className="grid gap-5 xl:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <PricingPlanCard key={plan.name} plan={plan} />
        ))}
      </RevealGroup>

      <Reveal>
        <Panel className="overflow-hidden rounded-[36px] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-0">
          <div className="grid gap-6 border-b border-white/8 px-6 py-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Billing clarity
              </p>
              <h2 className="text-2xl font-semibold text-foreground">
                Questions teams usually ask before turning billing on
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-foreground/62">
              The surface is built to make usage and checkout feel trustworthy before
              finance workflows are fully live. These are the questions most teams ask
              while the backend and Paddle setup are still being finalized.
            </p>
          </div>

          <RevealGroup className="grid gap-4 px-6 py-6 lg:grid-cols-3 lg:px-8">
            {PRICING_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[26px] border border-white/8 bg-black/22 p-5"
              >
                <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground/62">{faq.answer}</p>
              </div>
            ))}
          </RevealGroup>
        </Panel>
      </Reveal>

      <Reveal delay={0.08}>
        <Panel className="relative overflow-hidden rounded-[36px] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-0">
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(103,195,151,0.16),transparent_72%)]" />
          <div className="relative grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.04fr_0.96fr] lg:px-10">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Need help choosing a plan
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
                Keep the commercial story as calm and legible as the product surface.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-foreground/64 sm:text-base">
                The pricing page should make it easy to self-serve when possible and to
                ask direct questions when rollout, compliance, or support commitments
                need more context.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/register">Start free</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/support">Talk to support</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/8 bg-black/24 p-5 sm:p-6">
              <div className="space-y-4">
                {PRICING_CTA_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex gap-3 rounded-[22px] border border-white/8 bg-white/5 px-4 py-4"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <p className="text-sm leading-7 text-foreground/62">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}
