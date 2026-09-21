import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  onDark?: boolean;
  as?: "h1" | "h2";
  /** Id of the heading element, for aria-labelledby on the section. */
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, text, align = "center", onDark, as: Tag = "h2", id, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-sm font-semibold tracking-[0.18em] uppercase", onDark ? "text-gold-light" : "text-gold")}>
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn("text-4xl sm:text-5xl", onDark ? "text-white" : "text-ink")}>{title}</Tag>
      {text && <p className={cn("mt-4 text-lg", onDark ? "text-white/85" : "text-ink-soft")}>{text}</p>}
    </Reveal>
  );
}
