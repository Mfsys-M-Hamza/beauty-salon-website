import { salon } from "@/config/salon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGrid } from "./FeatureGrid";

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-title"
          eyebrow={`Why ${salon.name}`}
          title="Care you can feel"
          text="What to expect when you visit us."
        />
        <div className="mt-12">
          <FeatureGrid items={salon.whyChoose} />
        </div>
      </div>
    </section>
  );
}
