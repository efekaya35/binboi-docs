/**
 * Compact metric card that shares the same blue-led panel treatment as the public product cards.
 */
import { Panel } from "@/components/ui/panel";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function MetricCard({ detail, label, value }: MetricCardProps) {
  return (
    <Panel className="surface-panel surface-panel-blue space-y-4 border-white/[0.07] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/44">
        {label}
      </p>
      <div className="space-y-2">
        <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-[2.4rem]">
          {value}
        </p>
        <p className="text-sm leading-6 text-foreground/58">{detail}</p>
      </div>
    </Panel>
  );
}
