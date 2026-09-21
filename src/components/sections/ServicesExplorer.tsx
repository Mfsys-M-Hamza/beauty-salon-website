"use client";

import Image from "next/image";
import { useState } from "react";
import { salon } from "@/config/salon";
import { MotionMedia } from "@/components/media/MotionMedia";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { ServiceCard } from "./ServiceCard";

const ALL = "all";

/** Category filters, animated category introductions, service cards and treatment clips. */
export function ServicesExplorer() {
  const [filter, setFilter] = useState<string>(ALL);
  const categories = salon.categories.filter((c) => filter === ALL || c.id === filter);
  const count = categories.reduce((n, c) => n + salon.services.filter((s) => s.categoryId === c.id).length, 0);
  const breaks = salon.clips.filter((c) => c.enabled && c.page === "services" && c.afterCategoryId);

  return (
    <div>
      <div role="group" aria-label="Filter services by category" className="flex flex-wrap justify-center gap-2">
        {[{ id: ALL, name: "All services" }, ...salon.categories].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            aria-pressed={filter === c.id}
            className={cn(
              "min-h-11 rounded-full border px-5 text-base font-medium transition duration-300",
              filter === c.id
                ? "border-rose bg-rose text-white shadow-soft"
                : "border-ink/25 bg-white text-ink hover:border-rose hover:text-rose",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {count} {count === 1 ? "service" : "services"}
      </p>

      <div key={filter} className="mt-14 space-y-20">
        {categories.map((category) => {
          const items = salon.services.filter((s) => s.categoryId === category.id);
          const clip = filter === ALL ? breaks.find((b) => b.afterCategoryId === category.id) : undefined;
          return (
            <div key={category.id}>
              <section aria-labelledby={`cat-${category.id}`} id={category.id} className="scroll-mt-28">
                <div className="grid items-center gap-8 md:grid-cols-[1fr_20rem]">
                  <Reveal variant="left">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-blush text-rose">
                      <Icon name={category.icon} className="size-7" />
                    </span>
                    <h2 id={`cat-${category.id}`} className="mt-4 text-4xl">
                      {category.name}
                    </h2>
                    <p className="mt-2 max-w-xl text-lg text-ink-soft">{category.description}</p>
                  </Reveal>
                  <Reveal variant="image" className="hidden md:block">
                    <Image
                      src={category.image.src}
                      alt={category.image.alt}
                      width={category.image.width}
                      height={category.image.height}
                      sizes="320px"
                      className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
                    />
                  </Reveal>
                </div>
                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((service, i) => (
                    <Reveal as="li" key={service.id} delay={(i % 3) * 100}>
                      <ServiceCard service={service} />
                    </Reveal>
                  ))}
                </ul>
              </section>

              {clip && (
                <Reveal variant="image" className="mx-auto mt-16 max-w-4xl">
                  <MotionMedia clip={clip} sizes="(min-width: 896px) 896px, 100vw" />
                  <p className="mt-3 text-center text-ink-soft">{clip.description}</p>
                </Reveal>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
