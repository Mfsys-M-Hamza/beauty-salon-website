import type { Metadata } from "next";
import Image from "next/image";
import { salon } from "@/config/salon";
import { MotionMedia } from "@/components/media/MotionMedia";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHero } from "@/components/sections/PageHero";
import { QualityStatements } from "@/components/sections/QualityStatements";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Timeline } from "@/components/sections/Timeline";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { findClip } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({ ...salon.seo.pages.about, path: "/about" });

export default function AboutPage() {
  const clip = findClip("about", "environment");
  const { story, interior } = salon.aboutImages;
  return (
    <>
      <PageHero eyebrow="About us" title={`Welcome to ${salon.name}`} text={salon.shortDescription} />

      <section aria-labelledby="intro-title" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal variant="left">
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-gold uppercase">Our approach</p>
          <h2 id="intro-title" className="text-4xl sm:text-5xl">
            Beauty that starts with listening
          </h2>
          <p className="mt-5 text-lg text-ink-soft">{salon.aboutIntro}</p>
          <p className="mt-4 text-lg text-ink-soft">{salon.description}</p>
        </Reveal>
        <Reveal variant="image">
          <Image
            src={story.src}
            alt={story.alt}
            width={story.width}
            height={story.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft"
          />
        </Reveal>
      </section>

      <section aria-labelledby="space-title" className="bg-cream py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="space-title" eyebrow="Inside the salon" title="A space made to relax in" text="Take a look around before you visit." />
          <Reveal variant="image" className="mt-12">
            {clip ? (
              <MotionMedia clip={clip} sizes="(min-width: 1024px) 1024px, 100vw" />
            ) : (
              <Image
                src={interior.src}
                alt={interior.alt}
                width={interior.width}
                height={interior.height}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="w-full rounded-3xl object-cover shadow-soft"
              />
            )}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="values-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading id="values-title" eyebrow="What we stand for" title="Our values" />
        <div className="mt-12">
          <FeatureGrid items={salon.values} columns={4} />
        </div>
        <div className="mt-12">
          <QualityStatements />
        </div>
      </section>

      <section aria-labelledby="team-title" className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="team-title" eyebrow="Our team" title="The people looking after you" text="Meet the professionals behind every appointment." />
          <div className="mt-12">
            <TeamGrid />
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading id="story-title" eyebrow="Our story" title="How we got here" />
        <div className="mt-14">
          <Timeline />
        </div>
      </section>

      <CTASection title="Come and say hello" text="Book a visit or message us with any questions before your first appointment." />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
