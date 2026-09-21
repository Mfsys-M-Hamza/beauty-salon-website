import Link from "next/link";
import { Clock } from "lucide-react";
import type { Service } from "@/config/types";
import { buttonClasses } from "@/components/ui/Button";
import { formatDuration, formatPrice } from "@/lib/utils";

/** One priced service with a booking button that pre-selects it in the form. */
export function ServiceCard({ service, categoryName }: { service: Service; categoryName?: string }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none">
      <div className="flex items-start justify-between gap-3">
        {categoryName ? <p className="text-sm font-semibold tracking-wide text-gold uppercase">{categoryName}</p> : <span />}
        {service.badge && (
          <span className="shrink-0 rounded-full bg-blush px-3 py-1 text-xs font-semibold text-rose-dark">{service.badge}</span>
        )}
      </div>
      <h3 className="mt-2 text-2xl font-semibold text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-ink-soft">{service.description}</p>
      <div className="mt-6 flex items-end justify-between gap-3 border-t border-line pt-4">
        <div>
          <p className="text-xl font-bold text-ink transition-colors group-hover:text-rose">{formatPrice(service)}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
            <Clock aria-hidden="true" className="size-4" />
            {formatDuration(service.durationMinutes)}
          </p>
        </div>
        <Link
          href={`/contact?service=${service.id}#booking`}
          className={buttonClasses("primary")}
          aria-label={`Book ${service.name}`}
        >
          Book
        </Link>
      </div>
    </article>
  );
}
