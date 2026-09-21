import { CalendarCheck, Check } from "lucide-react";
import { salon } from "@/config/salon";
import { MotionMedia } from "@/components/media/MotionMedia";
import { ButtonLink } from "@/components/ui/Button";
import { findClip } from "@/lib/utils";

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function Hero() {
  const clip = findClip("home", "hero");
  const { hero } = salon;
  return (
    <section aria-labelledby="hero-title" className="dark-surface relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-ink text-white">
      {clip ? (
        <>
          <MotionMedia clip={clip} fill priority className="-z-20" />
          {/* Scrim keeps the headline readable over any clip. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/65" />
        </>
      ) : (
        <div aria-hidden="true" className="animate-drift absolute -top-24 -right-24 -z-10 size-[28rem] rounded-full bg-rose/40 blur-3xl" />
      )}

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="animate-rise mb-5 text-sm font-semibold tracking-[0.2em] text-gold-light uppercase" style={delay(0.05)}>
          {hero.eyebrow}
        </p>
        <h1 className="animate-rise max-w-3xl text-5xl leading-[1.05] sm:text-7xl" style={delay(0.15)}>
          {hero.headline}
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-lg text-white/90 sm:text-xl" style={delay(0.3)}>
          {hero.subheadline}
        </p>
        <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={delay(0.45)}>
          <ButtonLink href="/contact" variant="light" size="lg">
            <CalendarCheck aria-hidden="true" className="size-5" />
            Book an Appointment
          </ButtonLink>
          <ButtonLink href="/services" variant="outline-light" size="lg">
            View Services
          </ButtonLink>
        </div>
        <ul className="animate-rise mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/90" style={delay(0.6)}>
          {hero.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check aria-hidden="true" className="size-5 text-gold-light" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
