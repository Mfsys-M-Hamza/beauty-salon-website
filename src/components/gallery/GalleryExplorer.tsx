"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { salon } from "@/config/salon";
import type { GalleryItem, MediaClip } from "@/config/types";
import { MotionMedia } from "@/components/media/MotionMedia";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const ALL = "all";

/** Wraps a gallery video item so it can reuse MotionMedia (controls, lazy load, poster). */
function toClip(item: GalleryItem): MediaClip {
  return {
    id: item.id,
    title: item.title,
    description: item.title,
    page: "gallery",
    section: "lightbox",
    video: item.video,
    poster: item.image,
    alt: item.image.alt,
    enabled: true,
    decorative: false,
    placeholder: !item.video,
    brief: { subject: "", dimensions: "", duration: "", format: "", maxSize: "", replaceAt: "" },
  };
}

export function GalleryExplorer() {
  const [filter, setFilter] = useState<string>(ALL);
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const items = salon.gallery.filter((g) => filter === ALL || g.category === filter);
  const current = active !== null ? items[active] : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (active === null && dialog.open) {
      dialog.close();
    }
    if (active === null) document.body.style.overflow = "";
  }, [active]);

  useEffect(() => () => void (document.body.style.overflow = ""), []);

  const step = (delta: number) =>
    setActive((i) => (i === null ? i : (i + delta + items.length) % items.length));

  return (
    <div>
      <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap justify-center gap-2">
        {[{ id: ALL, label: "All" }, ...salon.galleryCategories].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => {
              setFilter(c.id);
              setActive(null);
            }}
            className={cn(
              "min-h-11 rounded-full border px-5 text-base font-medium transition duration-300",
              filter === c.id ? "border-rose bg-rose text-white shadow-soft" : "border-ink/25 bg-white text-ink hover:border-rose hover:text-rose",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {items.length} gallery {items.length === 1 ? "item" : "items"}
      </p>

      <ul key={filter} className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.id} variant="scale" delay={(i % 3) * 90}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open ${item.type === "video" ? "clip" : "photo"}: ${item.title}`}
              className="group relative block w-full overflow-hidden rounded-3xl bg-cream text-left shadow-soft"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 1024px) 384px, 50vw"
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 to-transparent p-4 pt-12 text-white opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">
                <span className="block text-base font-semibold">{item.title}</span>
              </span>
              {item.type === "video" && (
                <span aria-hidden="true" className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-white/90 text-rose">
                  <Play className="size-5" fill="currentColor" />
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? `${current.title} (${(active ?? 0) + 1} of ${items.length})` : "Gallery preview"}
        onClose={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="dark-surface m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white backdrop:bg-ink/95 open:flex"
      >
        <div
          className="relative flex flex-1 items-center justify-center p-4 sm:p-12"
          onClick={(e) => e.target === e.currentTarget && setActive(null)}
        >
          {current && (
            <figure key={current.id} className="animate-rise flex max-h-full w-full max-w-3xl flex-col items-center gap-4">
              {current.type === "video" ? (
                <div className="w-full max-w-md">
                  <MotionMedia clip={toClip(current)} sizes="448px" />
                </div>
              ) : (
                <Image
                  src={current.image.src}
                  alt={current.image.alt}
                  width={current.image.width}
                  height={current.image.height}
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="max-h-[75dvh] w-auto rounded-2xl object-contain"
                />
              )}
              <figcaption className="text-center text-lg">{current.title}</figcaption>
            </figure>
          )}

          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close preview"
            className="absolute top-4 right-4 inline-flex size-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous item"
                className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 sm:left-4"
              >
                <ChevronLeft aria-hidden="true" className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next item"
                className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 sm:right-4"
              >
                <ChevronRight aria-hidden="true" className="size-6" />
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
