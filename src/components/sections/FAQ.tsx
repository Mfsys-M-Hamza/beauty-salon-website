import { ChevronDown } from "lucide-react";
import { salon } from "@/config/salon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqSchema } from "@/lib/schema";

/** Accessible accordion built on native <details>, so it works without JavaScript. */
export function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered" />
      <div className="mt-12 space-y-3">
        {salon.faqs.map((faq, i) => (
          <Reveal key={faq.question} delay={(i % 4) * 60}>
            <details className="group rounded-2xl border border-line bg-white transition-shadow open:shadow-soft">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 text-lg font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-rose transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="animate-rise px-6 pb-6 text-ink-soft">{faq.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
      <JsonLd data={faqSchema()} />
    </section>
  );
}
