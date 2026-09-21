import { salon } from "@/config/salon";
import type { SocialLink } from "@/config/types";
import { cn, isPlaceholder } from "@/lib/utils";

// lucide-react no longer ships brand logos, so these are minimal inline glyphs.
const glyphs: Record<SocialLink["id"], string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.2-3.2a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z",
  facebook:
    "M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8s-1.4-.2-2.8-.2c-2.7 0-4.4 1.6-4.4 4.6v2.3H7v3.3h2.7V22h3.8Z",
  tiktok:
    "M16.6 2h-3.1v13.2a2.9 2.9 0 1 1-2-2.8V9.2a6 6 0 1 0 5.1 5.9V8.7a7.4 7.4 0 0 0 4.3 1.4V7a4.3 4.3 0 0 1-4.3-5Z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z",
};

export function SocialLinks({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const base = cn(
    "inline-flex size-12 items-center justify-center rounded-full border transition duration-300",
    tone === "light" ? "border-white/40 text-white" : "border-ink/25 text-ink",
  );
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {salon.social.map((link) => {
        const icon = (
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
            <path d={glyphs[link.id]} />
          </svg>
        );
        return (
          <li key={link.id}>
            {isPlaceholder(link.url) ? (
              // Not linked until a real URL is set in src/config/salon.ts.
              <span
                className={cn(base, "cursor-not-allowed opacity-50")}
                title={`Add your ${link.label} URL in src/config/salon.ts`}
                role="img"
                aria-label={`${link.label} (link not set yet)`}
              >
                {icon}
              </span>
            ) : (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${salon.name} on ${link.label} (opens in a new tab)`}
                className={cn(base, tone === "light" ? "hover:bg-white hover:text-ink" : "hover:bg-ink hover:text-ivory")}
              >
                {icon}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
