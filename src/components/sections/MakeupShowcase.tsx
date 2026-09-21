import { salon } from "@/config/salon";
import { MotionMedia } from "@/components/media/MotionMedia";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { findClip } from "@/lib/utils";

/** Home page: animated makeup products beside the bridal and party makeup services. */
export function MakeupShowcase() {
  const clip = findClip("home", "makeup");
  if (!clip) return null;
  const makeup = salon.categories.filter((c) => c.id === "bridal-makeup" || c.id === "party-makeup");
  return (
    <section aria-labelledby="makeup-title" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
      <Reveal variant="left" className="order-2 lg:order-1">
        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-gold uppercase">Makeup artistry</p>
        <h2 id="makeup-title" className="text-4xl sm:text-5xl">
          Looks made for your moment
        </h2>
        <p className="mt-4 max-w-lg text-lg text-ink-soft">
          From a bridal trial to a night out, we choose shades and finishes that suit your skin and last through the day.
        </p>
        <ul className="mt-6 space-y-2 text-ink-soft">
          {makeup.map((c) => (
            <li key={c.id}>
              <span className="font-semibold text-ink">{c.name}:</span> {c.description}
            </li>
          ))}
        </ul>
        <ButtonLink href="/services#bridal-makeup" variant="primary" className="mt-8">
          See makeup services
        </ButtonLink>
      </Reveal>
      <Reveal variant="image" className="order-1 lg:order-2">
        <MotionMedia clip={clip} sizes="(min-width: 1024px) 560px, 100vw" />
      </Reveal>
    </section>
  );
}
