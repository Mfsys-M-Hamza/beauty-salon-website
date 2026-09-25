import type { Metadata } from "next";
import { salon } from "@/config/salon";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { findClip } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({ ...salon.seo.pages.gallery, path: "/gallery" });

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our work, up close"
        text="Photos and short clips of our bridal, party makeup and hair work. Tap any image to view it full screen."
        clip={findClip("gallery", "intro")}
      />
      <section aria-label="Gallery" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <GalleryExplorer />
      </section>

      {salon.beforeAfter.length > 0 && (
        <section aria-labelledby="ba-title" className="bg-cream py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading id="ba-title" eyebrow="Before and after" title="Compare the results" text="Drag the slider, or focus it and use the arrow keys." />
            <ul className="mt-12 grid gap-10 lg:grid-cols-2">
              {salon.beforeAfter.map((pair, i) => (
                <Reveal as="li" key={pair.id} variant="image" delay={i * 150}>
                  <BeforeAfterSlider pair={pair} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection title="Love what you see?" text="Book your appointment and tell us the look you have in mind." />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
    </>
  );
}
