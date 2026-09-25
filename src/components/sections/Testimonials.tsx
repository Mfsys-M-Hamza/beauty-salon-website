import { Star } from "lucide-react";
import { salon } from "@/config/salon";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn, isPlaceholder } from "@/lib/utils";

/** Five stars filled to `rating` (fractions supported, e.g. 4.1). */
function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={className} role="img" aria-label={`${rating} out of 5 stars`}>
      <span className="relative inline-flex gap-0.5 text-gold">
        {Array.from({ length: 5 }, (_, n) => (
          <Star key={n} aria-hidden="true" className="size-5" />
        ))}
        <span className="absolute inset-0 inline-flex gap-0.5 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
          {Array.from({ length: 5 }, (_, n) => (
            <Star key={n} aria-hidden="true" className="size-5 shrink-0" fill="currentColor" />
          ))}
        </span>
      </span>
    </span>
  );
}

/** Client reviews with the overall Google rating. `limit` caps how many cards are shown. */
export function Testimonials({ limit }: { limit?: number }) {
  if (salon.testimonials.length === 0) return null;
  const items = limit ? salon.testimonials.slice(0, limit) : salon.testimonials;
  const { rating, count, url } = salon.googleReviews;
  return (
    <section aria-labelledby="testimonials-title" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kind words"
          title="What clients say"
        />
        <Reveal className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-ink">
          <span className="font-display text-3xl">{rating.toFixed(1)}</span>
          <Stars rating={rating} />
          <span className="text-ink-soft">from {count} Google reviews</span>
        </Reveal>
        <ul
          className={cn(
            "mt-12 grid gap-6",
            items.length === 1 ? "mx-auto max-w-xl" : items.length === 2 ? "mx-auto max-w-4xl md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 3) * 120} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none">
                <div className="flex items-center justify-between gap-3">
                  <Stars rating={t.rating} />
                  {t.isSample && <PlaceholderBadge label="Sample" />}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-2xl leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <span className="text-ink-soft"> · {t.service}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        {!isPlaceholder(url) && (
          <div className="mt-10 flex justify-center">
            <ButtonLink href={url} variant="secondary" ariaLabel={`Read all ${count} reviews on Google Maps (opens in a new tab)`}>
              Read all reviews on Google
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
