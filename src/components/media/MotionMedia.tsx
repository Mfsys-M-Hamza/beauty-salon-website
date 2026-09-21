"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { MediaClip } from "@/config/types";
import { useAutoplayAllowed } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { ProductAnimation } from "./ProductAnimation";

interface MotionMediaProps {
  clip: MediaClip;
  /** Fill the parent (for backgrounds) instead of using the poster's aspect ratio. */
  fill?: boolean;
  /** Set on above-the-fold clips so the poster is fetched with high priority. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Renders a configured clip:
 * - the poster is always shown first (and stays if no video file exists or it fails),
 * - the video is only mounted when near the viewport, and plays only while visible,
 * - decorative clips autoplay muted with no controls; meaningful clips get play/pause/mute,
 * - reduced-motion and low-power devices never autoplay.
 */
export function MotionMedia({ clip, fill, priority, sizes = "100vw", className }: MotionMediaProps) {
  const autoplayAllowed = useAutoplayAllowed();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [intent, setIntent] = useState<"auto" | "play" | "pause">("auto");
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const desktop = clip.video;
  const mobile = clip.mobile?.video;
  const hasVideo = Boolean(desktop?.webm || desktop?.mp4 || mobile?.webm || mobile?.mp4);
  const wantPlay = inView && (intent === "play" || (intent === "auto" && autoplayAllowed));

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !hasVideo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        setInView(entry.isIntersecting);
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (wantPlay) video.play().catch(() => setPlaying(false));
    else video.pause();
  }, [wantPlay, near]);

  const alt = clip.decorative ? "" : clip.alt;
  const common = { alt, fill: true, sizes, fetchPriority: priority ? "high" : "auto" } as const;
  const desktopImage = getImageProps({ ...common, src: clip.poster.src });
  const mobileImage = clip.mobile ? getImageProps({ ...common, src: clip.mobile.poster.src }) : undefined;
  const { srcSet: desktopSet, ...imgProps } = desktopImage.props;

  const showControls = !clip.decorative && hasVideo;

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden bg-cream", fill ? "absolute inset-0" : "relative rounded-3xl shadow-soft", className)}
      style={fill ? undefined : { aspectRatio: `${clip.poster.width} / ${clip.poster.height}` }}
    >
      {clip.animation ? (
        <ProductAnimation variant={clip.animation} label={clip.decorative ? undefined : clip.alt} />
      ) : (
        <>
      <picture className={cn("absolute inset-0 block", !started && "animate-kenburns")}>
        {mobileImage && (
          <source media="(max-width: 767px)" srcSet={mobileImage.props.srcSet ?? mobileImage.props.src} />
        )}
        <source media="(min-width: 768px)" srcSet={desktopSet ?? imgProps.src} />
        {/* getImageProps returns an optimised src plus lazy loading and sizes for a plain <img>. */}
        <img {...imgProps} alt={alt} className="size-full object-cover" />
      </picture>

      {hasVideo && near && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            started ? "opacity-100" : "opacity-0",
          )}
          muted={muted}
          loop
          playsInline
          preload="none"
          aria-hidden={clip.decorative || undefined}
          aria-label={clip.decorative ? undefined : clip.alt}
          onPlaying={() => {
            setStarted(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
        >
          {mobile?.webm && <source src={mobile.webm} type="video/webm" media="(max-width: 767px)" />}
          {mobile?.mp4 && <source src={mobile.mp4} type="video/mp4" media="(max-width: 767px)" />}
          {desktop?.webm && <source src={desktop.webm} type="video/webm" />}
          {desktop?.mp4 && <source src={desktop.mp4} type="video/mp4" />}
        </video>
      )}
        </>
      )}

      {clip.placeholder && !clip.decorative && (
        <PlaceholderBadge label="Placeholder clip" className="absolute top-3 left-3" />
      )}

      {showControls && (
        <div className="absolute right-3 bottom-3 flex gap-2">
          <button
            type="button"
            onClick={() => setIntent(playing ? "pause" : "play")}
            aria-label={playing ? `Pause video: ${clip.title}` : `Play video: ${clip.title}`}
            className="dark-surface inline-flex size-11 items-center justify-center rounded-full bg-ink/75 text-white backdrop-blur transition hover:bg-ink"
          >
            {playing ? <Pause aria-hidden="true" className="size-5" /> : <Play aria-hidden="true" className="size-5" />}
          </button>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-pressed={muted}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="dark-surface inline-flex size-11 items-center justify-center rounded-full bg-ink/75 text-white backdrop-blur transition hover:bg-ink"
          >
            {muted ? <VolumeX aria-hidden="true" className="size-5" /> : <Volume2 aria-hidden="true" className="size-5" />}
          </button>
        </div>
      )}
    </div>
  );
}
