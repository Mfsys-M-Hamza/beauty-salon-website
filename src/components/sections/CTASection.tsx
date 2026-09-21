import { CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ContactButtons } from "./ContactButtons";

interface CTASectionProps {
  title?: string;
  text?: string;
}

/** Reusable closing call-to-action with gentle background motion. */
export function CTASection({
  title = "Ready for your appointment?",
  text = "Tell us what you would like and your preferred time. We will reply to confirm availability.",
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-title" className="px-4 py-16 sm:px-6 lg:px-8">
      <Reveal
        variant="scale"
        className="dark-surface cta-sweep relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-white sm:px-12 sm:py-20"
      >
        <div aria-hidden="true" className="animate-drift absolute -top-20 -left-16 -z-10 size-80 rounded-full bg-rose/45 blur-3xl" />
        <div aria-hidden="true" className="animate-drift absolute -right-16 -bottom-24 -z-10 size-96 rounded-full bg-gold/30 blur-3xl [animation-delay:-8s]" />
        <h2 id="cta-title" className="mx-auto max-w-2xl text-4xl sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{text}</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <ButtonLink href="/contact" variant="light" size="lg">
            <CalendarCheck aria-hidden="true" className="size-5" />
            Book an Appointment
          </ButtonLink>
          <ContactButtons tone="light" className="flex flex-wrap justify-center gap-3" />
        </div>
      </Reveal>
    </section>
  );
}
