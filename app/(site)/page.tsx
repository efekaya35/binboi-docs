/**
 * Product landing page for the public Binboi marketing site.
 */
import Link from "next/link";

import { FeatureCard } from "@/components/site/feature-card";
import { ImageRevealShell } from "@/components/site/image-reveal-shell";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import {
  LANDING_FEATURES,
  LANDING_METRICS,
  PLATFORM_SECTIONS,
  PRODUCT_SHORT_DESCRIPTION,
  PRODUCT_TAGLINE,
} from "@/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  description: PRODUCT_SHORT_DESCRIPTION,
});

const FEATURE_FOOTERS = [
  "Operational state before reactive debugging.",
  "Permission boundaries without hallway handoffs.",
  "A product surface teams can learn in one pass.",
];

const PLATFORM_FOOTERS = [
  "Route staging, demos, and internal tools with stable ownership.",
  "Make access deliberate before scale turns convenience into risk.",
  "Keep usage visibility close to the product and billing model.",
];

const CTA_POINTS = [
  "Start with a public-facing product surface your team can trust.",
  "Layer engine, auth, and billing integrations behind stable UI boundaries.",
  "Keep docs, pricing, and dashboard language aligned from day one.",
];

export default function HomePage() {
  return (
    <div className="space-y-28 pb-8 pt-6">
      <section className="space-y-8">
        <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <Badge>Product infrastructure, refined</Badge>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  Ship tunnels, access, and usage visibility with a calmer control
                  plane.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
                  {PRODUCT_TAGLINE} Binboi keeps the public-facing experience polished
                  while staying ready for real auth, billing, and control-plane
                  integrations.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/register">Start free</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/docs">Read docs</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/8 bg-white/[0.025] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Install once
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground/60">
                  Bring the engine online without turning setup into a side project.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.025] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Scope access
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground/60">
                  Make tokens and ownership boundaries legible before rollout pressure.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.025] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Observe usage
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground/60">
                  See request behavior in the same surface that owns the rest of the
                  product.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Panel className="relative overflow-hidden rounded-[36px] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-0">
              <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(103,195,151,0.16),transparent_68%)]" />
              <div className="relative border-b border-white/8 px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      Workspace pulse
                    </p>
                    <p className="mt-2 text-sm text-foreground/60">
                      A clearer first look at tunnel health, access posture, and usage.
                    </p>
                  </div>
                  <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Live preview
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-6">
                <div className="rounded-[28px] border border-white/8 bg-black/26 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-foreground/40">
                        Tunnel health
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-foreground">
                        7 / 7 healthy
                      </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs text-foreground/52">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      Stable traffic
                    </div>
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-white/6">
                    <div className="h-full w-[86%] rounded-full bg-primary" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground/42">
                    <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1">
                      Staging
                    </span>
                    <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1">
                      Demos
                    </span>
                    <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1">
                      Internal tools
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[26px] border border-white/8 bg-black/24 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-foreground/40">
                      Tokens
                    </p>
                    <p className="mt-3 text-xl font-semibold text-foreground">
                      3 active scopes
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground/56">
                      CI, staging deploy, and read-only analytics access.
                    </p>
                  </div>
                  <div className="rounded-[26px] border border-white/8 bg-black/24 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-foreground/40">
                      Requests today
                    </p>
                    <p className="mt-3 text-xl font-semibold text-foreground">182,240</p>
                    <p className="mt-2 text-sm leading-6 text-foreground/56">
                      Stable traffic with <span className="text-primary">0.08%</span>{" "}
                      errors.
                    </p>
                  </div>
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-3" delay={0.12}>
          {LANDING_METRICS.map((metric) => (
            <Panel
              key={metric.label}
              className="rounded-[28px] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/42">
                {metric.label}
              </p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-foreground/56">{metric.detail}</p>
            </Panel>
          ))}
        </RevealGroup>
      </section>

      <section className="space-y-8">
        <Reveal className="space-y-8">
          <SectionHeading
            eyebrow="Why Binboi"
            title="A product surface that explains itself"
            description="The public site, docs, auth flows, and dashboard all share one mental model so teams can onboard faster and maintain it with less guesswork."
          />
        </Reveal>

        <RevealGroup className="grid gap-5 lg:grid-cols-3">
          {LANDING_FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              description={feature.description}
              eyebrow={feature.eyebrow}
              footer={FEATURE_FOOTERS[index]}
              indexLabel={`0${index + 1}`}
              title={feature.title}
            />
          ))}
        </RevealGroup>
      </section>

      <Reveal delay={0.05}>
        <ImageRevealShell
          eyebrow="Prepared reveal"
          title="Slot product visuals into a section that already feels intentional"
          description="This section is ready for real screenshots or motion imagery later. The reveal shell, spacing, and framing already match the rest of the product site."
          detail="When you drop in the final image or layered visual, you will not need to redesign the section wrapper or the entrance treatment."
        >
          <div className="grid h-full gap-4 p-6 sm:p-8">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/42">
              <span>Control surface preview</span>
              <span>Prepared for final imagery</span>
            </div>

            <div className="grid flex-1 gap-4 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="rounded-[28px] border border-white/8 bg-black/24 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/42">
                      Active workspace
                    </p>
                    <p className="mt-2 text-xl font-semibold text-foreground">
                      Europe staging edge
                    </p>
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
                    Healthy
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-[22px] border border-primary/16 bg-[radial-gradient(circle_at_top,rgba(103,195,151,0.12),transparent_65%)] p-5">
                    <div className="h-3 w-28 rounded-full bg-white/10" />
                    <div className="mt-4 h-24 rounded-[18px] bg-black/24" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[20px] border border-white/8 bg-white/5 p-4">
                      <div className="h-3 w-20 rounded-full bg-white/10" />
                      <div className="mt-4 h-12 rounded-[14px] bg-white/6" />
                    </div>
                    <div className="rounded-[20px] border border-white/8 bg-white/5 p-4">
                      <div className="h-3 w-16 rounded-full bg-white/10" />
                      <div className="mt-4 h-12 rounded-[14px] bg-white/6" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] border border-white/8 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-20 rounded-full bg-white/10" />
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/16" />
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="h-10 rounded-[16px] bg-white/6" />
                    <div className="h-10 rounded-[16px] bg-white/6" />
                    <div className="h-10 rounded-[16px] bg-primary/10" />
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/8 bg-black/24 p-5">
                  <div className="h-3 w-24 rounded-full bg-white/10" />
                  <div className="mt-5 grid gap-3">
                    <div className="h-14 rounded-[18px] border border-white/8 bg-white/5" />
                    <div className="h-14 rounded-[18px] border border-white/8 bg-white/5" />
                    <div className="h-14 rounded-[18px] border border-primary/16 bg-primary/8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ImageRevealShell>
      </Reveal>

      <section className="space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Platform"
            title="Built for operators who need confidence before scale"
            description="The first version stays intentionally tight: tunnels, access, usage, and billing-readiness. That keeps the app understandable while leaving room for deeper backend integrations."
          />
        </Reveal>

        <RevealGroup className="grid gap-5 lg:grid-cols-3">
          {PLATFORM_SECTIONS.map((section, index) => (
            <FeatureCard
              key={section.title}
              description={section.description}
              eyebrow={section.eyebrow}
              footer={PLATFORM_FOOTERS[index]}
              indexLabel={["01", "02", "03"][index]}
              title={section.title}
            />
          ))}
        </RevealGroup>
      </section>

      <Reveal delay={0.1}>
        <section>
          <Panel className="relative overflow-hidden rounded-[36px] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-0">
            <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(103,195,151,0.18),transparent_72%)]" />
            <div className="relative grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Ready when your backend is
                </p>
                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-[2.5rem]">
                  Start with polished UI now, then connect the deeper systems cleanly.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-foreground/64 sm:text-base">
                  Binboi’s frontend is structured so public pages shine immediately
                  while auth, token lifecycle, usage, and billing can connect to
                  production services without a redesign later.
                </p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/pricing">See pricing</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/support">Talk to support</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/8 bg-black/24 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  Why this rollout order works
                </p>
                <div className="mt-5 space-y-4">
                  {CTA_POINTS.map((point) => (
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
        </section>
      </Reveal>
    </div>
  );
}
