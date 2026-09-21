import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { salon } from "@/config/salon";
import { legalNav, mainNav } from "@/config/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { directionsHref, formatTime, isPlaceholder, singleLineAddress, telHref } from "@/lib/utils";

export function Footer() {
  const { contact } = salon;
  const firstOpen = salon.hours.find((d) => !d.closed);
  return (
    <footer className="dark-surface bg-ink pb-24 text-white/85 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-3xl font-semibold text-white">{salon.name}</p>
          <p className="mt-3 max-w-xs">{salon.shortDescription}</p>
          <SocialLinks tone="light" className="mt-6" />
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold tracking-[0.18em] text-gold-light uppercase">Explore</h2>
          <ul className="mt-4 space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-[0.18em] text-gold-light uppercase">Visit us</h2>
          <address className="mt-4 space-y-3 not-italic">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-light" />
              <a href={directionsHref()} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                {singleLineAddress()}
              </a>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-light" />
              <a href={telHref()} className="hover:text-white hover:underline">
                {contact.phone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-light" />
              {isPlaceholder(contact.email) ? (
                <span>{contact.email}</span>
              ) : (
                <a href={`mailto:${contact.email}`} className="hover:text-white hover:underline">
                  {contact.email}
                </a>
              )}
            </p>
          </address>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-[0.18em] text-gold-light uppercase">Opening hours</h2>
          <ul className="mt-4 space-y-1.5">
            {salon.hours.map((d) => (
              <li key={d.day} className="flex justify-between gap-4">
                <span>{d.day}</span>
                <span>{d.closed ? "Closed" : `${formatTime(d.open)} – ${formatTime(d.close)}`}</span>
              </li>
            ))}
          </ul>
          {firstOpen && (
            <p className="mt-3 flex items-center gap-2 text-sm text-white/70">
              <Clock aria-hidden="true" className="size-4" /> Appointments recommended
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {salon.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
