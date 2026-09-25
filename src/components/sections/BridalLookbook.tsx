import Image from "next/image";
import { CalendarCheck } from "lucide-react";
import { salon } from "@/config/salon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Editorial mosaic of bridal client photos: one tall feature image and four smaller ones. */
export function BridalLookbook() {
  const items = salon.lookbook;
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="lookbook-title" className="dark-surface bg-ink py-20 text-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="lookbook-title"
            eyebrow="Bridal lookbook"
            title="Brides we have dressed for their big day"
            text="Mehndi, barat and walima looks, with makeup, hair, jewellery setting and dupatta draping done by our team."
            align="left"
            onDark
          />
          <ButtonLink href="/contact" variant="light" className="shrink-0">
            <CalendarCheck aria-hidden="true" className="size-5" />
            Book a bridal trial
          </ButtonLink>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:grid-rows-2">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.image.src}
              variant="image"
              delay={i * 100}
              className={cn(i === 0 && "col-span-2 row-span-2 lg:col-span-2")}
            >
              <figure className="group relative h-full overflow-hidden rounded-3xl">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes={i === 0 ? "(min-width: 1024px) 620px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
                  className="aspect-[4/5] size-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transform-none"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-5 pt-12 pb-4 font-display text-lg text-ivory sm:text-xl">
                  {item.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
