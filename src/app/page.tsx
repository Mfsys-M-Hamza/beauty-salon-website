import type { Metadata } from "next";
import { salon } from "@/config/salon";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { Experience } from "@/components/sections/Experience";
import { FAQ } from "@/components/sections/FAQ";
import { BridalLookbook } from "@/components/sections/BridalLookbook";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Hero } from "@/components/sections/Hero";
import { MakeupShowcase } from "@/components/sections/MakeupShowcase";
import { HoursCard } from "@/components/sections/HoursCard";
import { LocationCard } from "@/components/sections/LocationCard";
import { OfferBanner } from "@/components/sections/OfferBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ ...salon.seo.pages.home, path: "/" }),
  title: { absolute: salon.seo.defaultTitle },
};

export default function HomePage() {
  const pair = salon.beforeAfter[0];
  return (
    <>
      <Hero />
      <FeaturedServices />
      <BridalLookbook />
      <Experience />
      <WhyChoose />
      <MakeupShowcase />
      <div className="py-20">
        <OfferBanner />
      </div>

      {pair && (
        <section aria-labelledby="results-title" className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left">
            <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-gold uppercase">Results</p>
            <h2 id="results-title" className="text-4xl sm:text-5xl">
              See the difference
            </h2>
            <p className="mt-4 max-w-lg text-lg text-ink-soft">
              Drag the slider to compare before and after. Every treatment starts with a consultation so results suit you.
            </p>
            <ButtonLink href="/gallery" variant="secondary" className="mt-8">
              More in the gallery
            </ButtonLink>
          </Reveal>
          <Reveal variant="image">
            <BeforeAfterSlider pair={pair} />
          </Reveal>
        </section>
      )}

      <GalleryPreview />
      <Testimonials limit={6} />

      <section aria-labelledby="visit-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading id="visit-title" eyebrow="Visit us" title="Opening hours and location" />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <HoursCard />
          <LocationCard />
        </div>
      </section>

      <FAQ />
      <CTASection />
    </>
  );
}
