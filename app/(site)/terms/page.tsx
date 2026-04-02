/**
 * Minimal legal placeholder so public navigation does not land on an empty route.
 */
import { SectionHeading } from "@/components/site/section-heading";
import { Panel } from "@/components/ui/panel";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms",
  description: "Baseline legal and operational expectations for using Binboi.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Terms"
        title="Operational expectations and legal placeholder"
        description="Replace this page with production legal copy before launch. It exists now so the public experience remains complete and navigable."
      />

      <Panel className="space-y-4 text-sm leading-7 text-foreground/66">
        <p>
          Binboi is intended for authorized traffic only. Teams are responsible for how
          they configure tunnels, tokens, and downstream access to their own services.
        </p>
        <p>
          Before production launch, replace this placeholder with counsel-approved terms,
          privacy details, and billing language that matches your backend and Paddle setup.
        </p>
      </Panel>
    </div>
  );
}
