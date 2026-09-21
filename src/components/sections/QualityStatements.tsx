import { ShieldCheck, Sparkles } from "lucide-react";
import { salon } from "@/config/salon";
import { Reveal } from "@/components/ui/Reveal";

export function QualityStatements() {
  const items = [
    { icon: ShieldCheck, title: "Hygiene and cleanliness", text: salon.hygieneStatement },
    { icon: Sparkles, title: "Product quality", text: salon.productStatement },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={i * 120} className="rounded-3xl border border-line bg-white p-8">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-blush text-rose">
            <Icon aria-hidden="true" className="size-7" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
          <p className="mt-2 text-ink-soft">{text}</p>
        </Reveal>
      ))}
    </div>
  );
}
