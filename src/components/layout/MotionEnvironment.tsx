"use client";

import { useEffect } from "react";
import { isLowPowerDevice } from "@/lib/motion";

/** Flags low-power / data-saver devices on <html> so CSS can drop constant motion. */
export function MotionEnvironment() {
  useEffect(() => {
    if (isLowPowerDevice()) document.documentElement.dataset.lowpower = "true";
  }, []);
  return null;
}
