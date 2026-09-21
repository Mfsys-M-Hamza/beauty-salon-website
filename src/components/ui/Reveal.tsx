"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li" | "ul" | "p" | "figure";
  variant?: "up" | "left" | "right" | "scale" | "image";
  /** Delay in milliseconds, handy for staggering siblings. */
  delay?: number;
  className?: string;
}

/**
 * Fades an element in the first time it scrolls into view. The hidden state
 * only exists in CSS when scripting is enabled and motion is not reduced, so
 * content is always visible if JavaScript or animation is unavailable.
 */
export function Reveal({ children, as = "div", variant = "up", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      className={cn("reveal", `reveal-${variant}`, visible && "is-visible", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
