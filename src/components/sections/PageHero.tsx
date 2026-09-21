import type { ReactNode } from "react";
import type { MediaClip } from "@/config/types";
import { MotionMedia } from "@/components/media/MotionMedia";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  text: string;
  /** Optional decorative clip shown behind the text. */
  clip?: MediaClip;
  children?: ReactNode;
}

/** Dark intro band for inner pages. The scrim keeps text readable over any clip. */
export function PageHero({ eyebrow, title, text, clip, children }: PageHeroProps) {
  return (
    <section className="dark-surface relative isolate overflow-hidden bg-ink text-white">
      {clip ? (
        <>
          <MotionMedia clip={clip} fill priority sizes="100vw" className="-z-20" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="animate-drift absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-rose/40 blur-3xl"
        />
      )}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="animate-rise mb-4 text-sm font-semibold tracking-[0.18em] text-gold-light uppercase">{eyebrow}</p>
        <h1 className="animate-rise max-w-3xl text-5xl sm:text-6xl" style={{ "--d": "0.1s" } as React.CSSProperties}>
          {title}
        </h1>
        <p className="animate-rise mt-5 max-w-2xl text-lg text-white/90 sm:text-xl" style={{ "--d": "0.2s" } as React.CSSProperties}>
          {text}
        </p>
        {children && (
          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ "--d": "0.3s" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
