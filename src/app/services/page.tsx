import type { Metadata } from "next";
import { salon } from "@/config/salon";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesExplorer } from "@/components/sections/ServicesExplorer";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { findClip } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({ ...salon.seo.pages.services, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services and pricing"
        title="Treatments for hair, skin and nails"
        text="Browse by category and book the service you like in a couple of taps."
        clip={findClip("services", "intro")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ServicesExplorer />
        <p className="mx-auto mt-16 max-w-2xl text-center text-sm text-ink-soft">{salon.priceNote}</p>
      </div>
      <CTASection title="Not sure what to book?" text="Message us and we will recommend the right treatment for your hair, skin or occasion." />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
    </>
  );
}
