/**
 * Shared integration callout that uses the dual-tone shell only for system-level status emphasis.
 */
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";

type IntegrationStateProps = {
  configured: boolean;
  ok?: boolean;
  title: string;
  description: string;
  error?: string;
};

export function IntegrationState({
  configured,
  description,
  error,
  ok = true,
  title,
}: IntegrationStateProps) {
  const statusLabel = !configured ? "Config needed" : ok ? "Connected" : "Attention";
  const statusTone = !configured
    ? "bg-amber-300/80"
    : ok
      ? "bg-emerald-300/80"
      : "bg-orange-300/80";

  return (
    <Panel className="surface-panel surface-panel-dual flex flex-col gap-5 border-white/[0.07] p-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className={`h-2.5 w-2.5 rounded-full ${statusTone}`} />
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-foreground/64">
          {error ?? description}
        </p>
      </div>
      <Badge
        className={
          configured && ok
            ? "border-white/[0.08] bg-white/[0.045] text-foreground/72"
            : "border-white/[0.08] bg-white/[0.025] text-foreground/62"
        }
      >
        {statusLabel}
      </Badge>
    </Panel>
  );
}
