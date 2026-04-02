/**
 * Compact metric card for dashboard summary pages.
 */
import { Panel } from "@/components/ui/panel";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function MetricCard({ detail, label, value }: MetricCardProps) {
  return (
    <Panel className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
        {label}
      </p>
      <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="text-sm leading-6 text-foreground/58">{detail}</p>
    </Panel>
  );
}
