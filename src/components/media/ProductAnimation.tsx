"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight SVG/CSS makeup animation (no video file, a few KB). It only runs
 * while on screen; reduced-motion and low-power devices see a still pose.
 */
export function ProductAnimation({ variant, label }: { variant: "lipstick" | "products"; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "100px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const products = variant === "products";
  return (
    <div
      ref={ref}
      data-active={active}
      className="product-scene absolute inset-0 flex items-center justify-center bg-linear-to-br from-blush via-cream to-blush"
    >
      <svg
        viewBox={products ? "0 30 480 350" : "10 30 140 350"}
        className="size-full max-h-full p-[6%]"
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        {/* sparkles */}
        <g fill="#8e6a2c">
          <path className="spark" style={{ animationDelay: "0s" }} d="M128 90l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" />
          <path className="spark" style={{ animationDelay: "-1.2s" }} d="M24 150l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          {products && <path className="spark" style={{ animationDelay: "-2.4s" }} d="M330 70l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" />}
        </g>

        {/* lipstick */}
        <g>
          {/* Bullet is drawn first and runs down behind the sleeve, so it slides out of it. */}
          <path className="lip-bullet" d="M52 285V212L88 196V285Z" fill="#8f4759" />
          <rect x="40" y="280" width="60" height="90" rx="8" fill="#2b2428" />
          <rect x="38" y="268" width="64" height="14" rx="4" fill="#8e6a2c" />
          <rect x="46" y="238" width="48" height="30" fill="#dcbb84" />
          <g className="lip-cap">
            <rect x="42" y="190" width="56" height="80" rx="6" fill="#2b2428" />
            <rect x="42" y="250" width="56" height="8" fill="#dcbb84" />
            <rect x="48" y="198" width="6" height="44" rx="3" fill="#ffffff" opacity="0.18" />
          </g>
        </g>

        {products && (
          <>
            {/* powder compact */}
            <g>
              <rect x="172" y="330" width="140" height="42" rx="12" fill="#b9974f" />
              <rect x="182" y="336" width="120" height="14" rx="7" fill="#f3dfdb" />
              <ellipse cx="242" cy="343" rx="46" ry="5" fill="#e3c3bd" />
              <g className="compact-lid">
                <rect x="172" y="296" width="140" height="36" rx="12" fill="#dcbb84" />
                <rect x="182" y="304" width="120" height="20" rx="8" fill="#8f4759" opacity="0.85" />
              </g>
            </g>

            {/* nail polish */}
            <g>
              <g className="polish-cap">
                <rect x="394" y="214" width="30" height="72" rx="6" fill="#2b2428" />
                <rect x="406" y="286" width="6" height="52" rx="3" fill="#2b2428" />
              </g>
              <rect x="382" y="304" width="54" height="68" rx="12" fill="#6e3445" />
              <rect x="394" y="286" width="30" height="20" fill="#2b2428" />
              <rect x="390" y="316" width="8" height="40" rx="4" fill="#ffffff" opacity="0.2" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
