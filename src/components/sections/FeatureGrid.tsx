import type { TitledText } from "@/config/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Icon + title + text cards that fade up in sequence. Used for "why choose us" and values. */
export function FeatureGrid({ items, columns = 3 }: { items: TitledText[]; columns?: 3 | 4 }) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2", columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={(i % columns) * 100} className="h-full">
          <div className="group h-full rounded-3xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-soft motion-reduce:transform-none">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-blush text-rose transition duration-300 group-hover:scale-105 group-hover:bg-rose group-hover:text-white">
              <Icon name={item.icon} className="size-7" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-ink-soft">{item.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
