import { Star } from "lucide-react";
import { salon } from "@/config/salon";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  if (salon.testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kind words"
          title="What clients say"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {salon.testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 120} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex gap-0.5 text-gold" role="img" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, n) => (
                      <Star key={n} aria-hidden="true" className="size-5" fill={n < t.rating ? "currentColor" : "none"} />
                    ))}
                  </p>
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
      </div>
    </section>
  );
}
