import { salon } from "@/config/salon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { breadcrumbSchema } from "@/lib/schema";

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

interface LegalPageProps {
  title: string;
  path: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, path, intro, sections }: LegalPageProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="animate-rise text-5xl sm:text-6xl">{title}</h1>
      <p className="mt-3 text-ink-soft">Last updated: {salon.legal.lastUpdated}</p>
      <PlaceholderBadge label="Template text: have it reviewed for your business and country before launch" className="mt-4 whitespace-normal" />
      <p className="mt-8 text-lg">{intro}</p>
      {sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="text-3xl">{section.title}</h2>
          {section.paragraphs?.map((p) => (
            <p key={p} className="mt-3 text-ink-soft">
              {p}
            </p>
          ))}
          {section.list && (
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-ink-soft">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: title, path }])} />
    </article>
  );
}
