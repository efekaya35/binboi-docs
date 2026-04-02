/**
 * Shared heading block for marketing and docs sections.
 */
import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  align = "left",
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <Badge>{eyebrow}</Badge>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-7 text-foreground/70 sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
