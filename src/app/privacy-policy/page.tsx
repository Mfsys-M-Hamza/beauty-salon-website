import type { Metadata } from "next";
import { salon } from "@/config/salon";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { singleLineAddress } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${salon.name} collects, uses and protects your personal information when you book an appointment or contact us.`,
  path: "/privacy-policy",
});

const sections: LegalSection[] = [
  {
    title: "Who we are",
    paragraphs: [`${salon.name} is a beauty salon located at ${singleLineAddress()}. You can contact us using the details at the end of this policy.`],
  },
  {
    title: "Information we collect",
    paragraphs: ["When you use our booking form or contact us, we may collect:"],
    list: [
      "Your name, phone number and email address",
      "The service, date and time you would like",
      "Any message you choose to include, such as allergies or skin sensitivities",
    ],
  },
  {
    title: "How we use it",
    list: [
      "To respond to your appointment request and confirm availability",
      "To prepare for your treatment safely, for example by considering allergies or sensitivities",
      "To contact you about your booking, such as changes or reminders",
    ],
  },
  {
    title: "WhatsApp and third parties",
    paragraphs: [
      "The booking form does not store your details on this website. It prepares a message that opens in WhatsApp, and the message is only sent when you press send. WhatsApp is operated by a third party and handles messages under its own terms and privacy policy.",
      "We do not sell your personal information. We share it only where needed to provide a service you asked for, or where the law requires.",
    ],
  },
  {
    title: "Cookies and analytics",
    paragraphs: ["[Describe any analytics, advertising or other cookies if you add them to this website. If you use none, say so here.]"],
  },
  {
    title: "How long we keep information",
    paragraphs: ["We keep booking and contact details only for as long as needed to provide our services and meet our legal obligations. [Edit to state your actual retention period.]"],
  },
  {
    title: "Your rights",
    paragraphs: ["Depending on where you live, you may have the right to access, correct or delete the personal information we hold about you. Contact us and we will help."],
  },
  {
    title: "Contact us",
    paragraphs: [`${salon.name}, ${singleLineAddress()}. Email: ${salon.contact.email}. Phone: ${salon.contact.phone.display}.`],
  },
  {
    title: "Changes to this policy",
    paragraphs: ["We may update this policy from time to time. The date at the top of this page shows when it was last changed."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro={`Your privacy matters to ${salon.name}. This policy explains what information we collect when you book or contact us, and how we use it.`}
      sections={sections}
    />
  );
}
