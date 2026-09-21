import { salon } from "@/config/salon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

export function FeaturedServices() {
  const featured = salon.services.filter((s) => s.featured);
  return (
    <section aria-labelledby="featured-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        id="featured-title"
        eyebrow="Featured services"
        title="Treatments our clients love"
        text="A selection of popular services. Every price is a guide, and we confirm it before we begin."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service, i) => (
          <Reveal as="li" key={service.id} delay={(i % 3) * 100}>
            <ServiceCard service={service} categoryName={salon.categories.find((c) => c.id === service.categoryId)?.name} />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-10 text-center">
        <ButtonLink href="/services" variant="secondary" size="lg">
          See all services and prices
        </ButtonLink>
      </Reveal>
    </section>
  );
}
