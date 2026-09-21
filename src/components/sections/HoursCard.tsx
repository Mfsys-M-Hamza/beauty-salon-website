"use client";

import { useSyncExternalStore } from "react";
import { Clock } from "lucide-react";
import { salon } from "@/config/salon";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatTime } from "@/lib/utils";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const subscribe = () => () => {};

/** Opening hours; today's row is highlighted after hydration (server render has no "today"). */
export function HoursCard({ className }: { className?: string }) {
  const today = useSyncExternalStore(
    subscribe,
    () => DAY_NAMES[new Date().getDay()],
    () => "",
  );
  return (
    <Reveal variant="up" className={cn("rounded-3xl border border-line bg-white p-7 shadow-soft", className)}>
      <h3 className="flex items-center gap-3 text-2xl font-semibold">
        <Clock aria-hidden="true" className="size-6 text-rose" />
        Opening hours
      </h3>
      <ul className="mt-5 divide-y divide-line">
        {salon.hours.map((d, i) => {
          const isToday = d.day === today;
          return (
            <Reveal
              as="li"
              key={d.day}
              delay={i * 60}
              className={cn("flex items-center justify-between gap-4 rounded-xl px-3 py-2.5", isToday && "bg-blush font-semibold")}
            >
              <span>
                {d.day}
                {isToday && <span className="ml-2 text-sm font-medium text-rose-dark">(today)</span>}
              </span>
              <span className={d.closed ? "text-ink-soft" : undefined}>
                {d.closed ? "Closed" : `${formatTime(d.open)} – ${formatTime(d.close)}`}
              </span>
            </Reveal>
          );
        })}
      </ul>
    </Reveal>
  );
}
