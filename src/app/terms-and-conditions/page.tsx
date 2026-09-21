import type { Metadata } from "next";
import { salon } from "@/config/salon";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description: `Booking, cancellation, pricing and payment terms for appointments at ${salon.name}.`,
  path: "/terms-and-conditions",
});

const sections: LegalSection[] = [
  {
    title: "Appointment requests",
    paragraphs: [
      `Submitting the booking form sends an appointment request to ${salon.name}. It does not guarantee an appointment. Your booking is only confirmed once we reply and agree a time with you.`,
    ],
  },
  {
    title: "Cancellations and rescheduling",
    paragraphs: [
      "Please tell us as early as possible if you need to cancel or change your appointment, so we can offer the time to another client. [Edit to state your notice period and any late-cancellation fee.]",
    ],
  },
  {
    title: "Late arrivals",
    paragraphs: ["If you arrive late, we may need to shorten your treatment or reschedule so we do not delay other clients. [Edit to match your policy.]"],
  },
  {
    title: "Prices",
    paragraphs: [
      salon.priceNote,
      "Prices shown on this website may change. Special offers cannot be combined unless stated, and are subject to their own terms.",
    ],
  },
  {
    title: "Health, allergies and patch tests",
    paragraphs: [
      "Please tell us about allergies, skin conditions, pregnancy, medication or anything else that may affect your treatment. Some colour, lash and skin services need a patch test, and we may decline a service if it is not safe for you.",
    ],
  },
  {
    title: "Payment",
    paragraphs: ["Payment is due at the end of your appointment unless agreed otherwise. [List accepted payment methods and any deposit rules.]"],
  },
  {
    title: "Liability",
    paragraphs: [
      "We take care to provide every service to a professional standard. Results vary between individuals. Nothing in these terms limits any rights you have under the law.",
    ],
  },
  {
    title: "Using this website",
    paragraphs: [
      `Content on this website belongs to ${salon.name} or is used with permission. Images and testimonials may be sample content while the site is being set up. Please do not copy or reuse our content without permission.`,
    ],
  },
  {
    title: "Changes to these terms",
    paragraphs: ["We may update these terms from time to time. The date at the top of this page shows when they were last changed."],
  },
  {
    title: "Contact us",
    paragraphs: [`Questions about these terms? Email ${salon.contact.email} or call ${salon.contact.phone.display}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      path="/terms-and-conditions"
      intro={`These terms apply to appointments and services at ${salon.name} and to your use of this website.`}
      sections={sections}
    />
  );
}
