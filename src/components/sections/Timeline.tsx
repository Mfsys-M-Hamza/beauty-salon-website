import { salon } from "@/config/salon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Salon story. Items slide in from alternating sides on wide screens. */
export function Timeline() {
  return (
    <ol className="relative mx-auto max-w-3xl border-l-2 border-line pl-8 md:border-l-0 md:pl-0">
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-line md:block" />
      {salon.timeline.map((item, i) => (
        <Reveal
          as="li"
          key={`${item.label}-${i}`}
          variant={i % 2 === 0 ? "left" : "right"}
          className={cn("relative pb-12 last:pb-0 md:w-1/2", i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12")}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 -left-[2.6rem] size-4 rounded-full border-4 border-ivory bg-rose md:top-2",
              i % 2 === 0 ? "md:-right-2 md:left-auto" : "md:-left-2",
            )}
          />
          <p className="text-sm font-semibold tracking-[0.18em] text-gold uppercase">{item.label}</p>
          <h3 className="mt-1 text-2xl font-semibold">{item.title}</h3>
          <p className="mt-2 text-ink-soft">{item.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
