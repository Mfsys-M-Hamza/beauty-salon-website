import { salon } from "@/config/salon";
import { absoluteUrl } from "./seo";
import { isPlaceholder } from "./utils";

const clean = (value: string) => (isPlaceholder(value) ? undefined : value);

export function beautySalonSchema() {
  const { contact } = salon;
  const sameAs = salon.social.map((s) => s.url).filter((u) => !isPlaceholder(u));
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${salon.siteUrl}/#salon`,
    name: salon.name,
    description: salon.description,
    url: salon.siteUrl,
    telephone: contact.phone.dial,
    email: clean(contact.email),
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    areaServed: contact.serviceAreas,
    openingHoursSpecification: salon.hours
      .filter((d) => !d.closed)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${d.day}`,
        opens: d.open,
        closes: d.close,
      })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${salon.name} services`,
      itemListElement: salon.categories.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        itemListElement: salon.services
          .filter((s) => s.categoryId === c.id)
          .map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.description } })),
      })),
    },
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: salon.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
