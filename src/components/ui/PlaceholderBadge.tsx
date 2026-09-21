import { salon } from "@/config/salon";
import { cn } from "@/lib/utils";

/** Small label for sample content. Hidden by salon.showPlaceholderLabels = false. */
export function PlaceholderBadge({ label, className }: { label: string; className?: string }) {
  if (!salon.showPlaceholderLabels) return null;
  return (
    <span className={cn("inline-flex rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold tracking-wide text-white", className)}>
      {label}
    </span>
  );
}
