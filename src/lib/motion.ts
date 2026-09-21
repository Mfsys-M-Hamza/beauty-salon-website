"use client";

import { useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/** Heuristic for phones and data-saver modes where autoplaying video is unkind. */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  return Boolean(
    nav.connection?.saveData ||
      nav.connection?.effectiveType === "2g" ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2),
  );
}

const noopSubscribe = () => () => {};

export function useLowPowerDevice(): boolean {
  return useSyncExternalStore(noopSubscribe, isLowPowerDevice, () => false);
}

/** Decorative clips autoplay only when this is true. */
export function useAutoplayAllowed(): boolean {
  const reduced = usePrefersReducedMotion();
  const lowPower = useLowPowerDevice();
  return !reduced && !lowPower;
}
