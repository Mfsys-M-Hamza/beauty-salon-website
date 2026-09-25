import Image from "next/image";
import { salon } from "@/config/salon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Slowly scrolling strip of gallery images. It pauses on hover/focus, stops on
 * low-power devices, and becomes a manually scrollable strip for reduced motion.
 */
export function GalleryPreview() {
  const items = salon.gallery;
  return (
    <section aria-labelledby="gallery-preview-title" className="overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="gallery-preview-title"
          eyebrow="Gallery"
          title="A look at our work"
          text="Recent bridal, party makeup and hair work from our salon."
        />
      </div>
      <Reveal className="marquee mt-12 overflow-hidden" >
        <ul className="marquee-track flex gap-5" aria-label="Gallery preview">
          {[0, 1].map((copy) =>
            items.map((item) => (
              <li
                key={`${copy}-${item.id}`}
                className={copy === 1 ? "marquee-dup" : undefined}
                aria-hidden={copy === 1 || undefined}
              >
                <figure className="relative h-80 w-64 shrink-0 overflow-hidden rounded-3xl shadow-soft sm:h-96 sm:w-72">
                  <Image
                    src={item.image.src}
                    alt={copy === 1 ? "" : item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="288px"
                    className="size-full object-cover transition duration-700 hover:scale-105"
                  />
                </figure>
              </li>
            )),
          )}
        </ul>
      </Reveal>
      <div className="mt-10 text-center">
        <ButtonLink href="/gallery" variant="secondary" size="lg">
          Explore the gallery
        </ButtonLink>
      </div>
    </section>
  );
}
