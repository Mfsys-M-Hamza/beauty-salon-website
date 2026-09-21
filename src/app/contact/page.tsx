import type { Metadata } from "next";
import { Suspense } from "react";
import { salon } from "@/config/salon";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { ContactButtons } from "@/components/sections/ContactButtons";
import { FAQ } from "@/components/sections/FAQ";
import { HoursCard } from "@/components/sections/HoursCard";
import { LocationCard } from "@/components/sections/LocationCard";
import { PageHero } from "@/components/sections/PageHero";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { findClip } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({ ...salon.seo.pages.contact, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book and contact"
        title="Book your appointment"
        text={`Choose your service and preferred time. We will reply on WhatsApp to confirm availability at ${salon.name}.`}
        clip={findClip("contact", "intro")}
      />

      <section id="booking" aria-labelledby="booking-title" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[3fr_2fr] lg:px-8">
        <div>
          <h2 id="booking-title" className="mb-6 text-4xl">
            Request an appointment
          </h2>
          <Suspense fallback={<div className="h-96 rounded-3xl border border-line bg-white" aria-hidden="true" />}>
            <BookingForm />
          </Suspense>
        </div>

        <aside aria-label="Other ways to book" className="space-y-8">
          <Reveal className="rounded-3xl border border-line bg-white p-7 shadow-soft">
            <h3 className="text-2xl font-semibold">Prefer to talk?</h3>
            <p className="mt-2 text-ink-soft">Message or call us directly and we will find a time that suits you.</p>
            <ContactButtons className="mt-5 flex flex-col gap-3 [&>*]:w-full" />
          </Reveal>
          <HoursCard />
          <LocationCard />
        </aside>
      </section>

      <FAQ />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
