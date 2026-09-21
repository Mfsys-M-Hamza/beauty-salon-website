import { ShieldCheck, Sparkles } from "lucide-react";
import { salon } from "@/config/salon";
import { MotionMedia } from "@/components/media/MotionMedia";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { findClip } from "@/lib/utils";

/** Home page: treatment clip beside the hygiene and product-quality statements. */
export function Experience() {
  const clip = findClip("home", "experience");
  return (
    <section aria-labelledby="experience-title" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
      {clip && (
        <Reveal variant="image">
          <MotionMedia clip={clip} sizes="(min-width: 1024px) 560px, 100vw" />
        </Reveal>
      )}
      <Reveal variant="right" className={clip ? undefined : "lg:col-span-2"}>
        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-gold uppercase">The salon experience</p>
        <h2 id="experience-title" className="text-4xl sm:text-5xl">
          Calm, clean and carefully done
        </h2>
        <div className="mt-8 space-y-6">
          <div className="flex gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blush text-rose">
              <ShieldCheck aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h3 className="text-2xl font-semibold">Hygiene and cleanliness</h3>
              <p className="mt-1 text-ink-soft">{salon.hygieneStatement}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blush text-rose">
              <Sparkles aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h3 className="text-2xl font-semibold">Product quality</h3>
              <p className="mt-1 text-ink-soft">{salon.productStatement}</p>
            </div>
          </div>
        </div>
        <ButtonLink href="/about" variant="secondary" className="mt-8">
          About our salon
        </ButtonLink>
      </Reveal>
    </section>
  );
}
