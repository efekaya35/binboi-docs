/**
 * Docs landing page that introduces the documentation IA and article groups.
 */
import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { DOCS_LINKS } from "@/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Docs",
  description: "Product docs for setup, authentication, tunnels, requests, and debugging.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <div className="space-y-10 bg-amber-700">
      <SectionHeading
        eyebrow="Documentation"
        title="Reference that follows the product, not the other way around"
        description="The docs are organized around actual Binboi workflows so teams can move from setup to operation without hunting for context."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        {DOCS_LINKS.map((section) => (
          <Panel key={section.label} className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {section.label}
              </p>
              <p className="text-sm leading-7 text-foreground/62">
                Navigate the articles in this section to move from concept to action with
                less guesswork.
              </p>
            </div>

            <div className="grid gap-3">
              {section.children?.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4 text-sm text-foreground/75 transition-colors hover:border-white/14 hover:text-foreground"
                >
                  {article.label}
                </Link>
              ))}
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Start with the quick path</h2>
          <p className="text-sm leading-7 text-foreground/62">
            If you are new to the repo, the quick start and auth docs explain the minimum
            config and where upstream services plug into the UI.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/docs/quick-start">Open quick start</Link>
        </Button>
      </Panel>
    </div>
  );
}
