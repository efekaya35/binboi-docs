/**
 * Premium feature card used across public marketing sections.
 */
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  indexLabel?: string;
  footer?: string;
  className?: string;
};

export function FeatureCard({
  className,
  description,
  eyebrow,
  footer,
  indexLabel,
  title,
}: FeatureCardProps) {
  return (
    <Panel
      className={cn(
        "group relative h-full overflow-hidden rounded-[30px] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-0",
        className,
      )}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute -right-16 top-8 h-32 w-32 rounded-full bg-primary/10 opacity-70 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col gap-6 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/90">
            {eyebrow}
          </p>
          {indexLabel ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-foreground/42">
              {indexLabel}
            </span>
          ) : null}
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-sm leading-7 text-foreground/62">{description}</p>
        </div>

        {footer ? (
          <div className="mt-auto border-t border-white/8 pt-4 text-xs uppercase tracking-[0.22em] text-foreground/42">
            {footer}
          </div>
        ) : null}
      </div>
    </Panel>
  );
}
