"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import type { BeforeAfterPair } from "@/config/types";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

/**
 * Drag (or use the arrow keys on) the handle to compare. A native range input
 * sits over the images, which gives mouse, touch and keyboard support for free.
 */
export function BeforeAfterSlider({ pair, sizes = "(min-width: 1024px) 560px, 100vw" }: { pair: BeforeAfterPair; sizes?: string }) {
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);

  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-3xl bg-cream shadow-soft select-none"
        style={{ aspectRatio: `${pair.after.width} / ${pair.after.height}` }}
      >
        <Image src={pair.after.src} alt={pair.after.alt} fill sizes={sizes} className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={pair.before.src} alt={pair.before.alt} fill sizes={sizes} className="object-cover" />
        </div>

        <span className="absolute top-4 left-4 rounded-full bg-ink/80 px-3 py-1 text-sm font-semibold text-white">Before</span>
        <span className="absolute top-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-sm font-semibold text-white">After</span>
        {pair.isSample && <PlaceholderBadge label="Sample images" className="absolute bottom-4 left-4" />}

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(e) => {
            setPosition(Number(e.target.value));
            setTouched(true);
          }}
          aria-label={`Before and after comparison: ${pair.title}. Move the slider to reveal more of the before or after image.`}
          aria-valuetext={`${position}% of the before image shown`}
          className="ba-range absolute inset-0 z-10 size-full"
        />
        <div
          aria-hidden="true"
          className="ba-handle pointer-events-none absolute inset-y-0 z-0 w-0.5 bg-white shadow-soft"
          style={{ left: `${position}%` }}
        >
          <span
            className={`absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-rose shadow-lift ${touched ? "" : "animate-pulse motion-reduce:animate-none"}`}
          >
            <ChevronsLeftRight className="size-6" />
          </span>
        </div>
      </div>
      <figcaption className="mt-4">
        <p className="text-xl font-semibold">{pair.title}</p>
        <p className="text-ink-soft">{pair.description}</p>
      </figcaption>
    </figure>
  );
}
