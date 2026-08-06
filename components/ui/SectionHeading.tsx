import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-fg-subtle">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-relaxed text-fg-muted">{description}</p> : null}
    </div>
  );
}
