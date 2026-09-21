import { salon } from "@/config/salon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Promotional offers from config. Renders nothing when there are no offers. */
export function OfferBanner() {
  if (salon.offers.length === 0) return null;
  return (
    <section aria-label="Special offers" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {salon.offers.map((offer) => (
          <Reveal
            key={offer.id}
            variant="scale"
            className="cta-sweep relative isolate overflow-hidden rounded-[2rem] bg-rose-dark px-6 py-12 text-white sm:px-12"
          >
            <div aria-hidden="true" className="animate-drift absolute -top-20 -right-10 -z-10 size-72 rounded-full bg-rose/60 blur-3xl" />
            <div className="dark-surface flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex rounded-full bg-white px-4 py-1 text-sm font-semibold text-rose-dark">{offer.badge}</span>
                <h2 className="mt-4 text-4xl sm:text-5xl">{offer.title}</h2>
                <p className="mt-3 text-lg text-white/90">{offer.description}</p>
                <p className="mt-3 text-sm text-white/80">{offer.terms}</p>
              </div>
              <ButtonLink
                href={offer.serviceId ? `/contact?service=${offer.serviceId}#booking` : "/contact#booking"}
                variant="light"
                size="lg"
                className="shrink-0"
              >
                {offer.ctaLabel}
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
