import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { salon } from "@/config/salon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { directionsHref, isPlaceholder, singleLineAddress, telHref } from "@/lib/utils";

/** Address, contact details and a decorative map with a softly pulsing pin. */
export function LocationCard({ className }: { className?: string }) {
  const { contact } = salon;
  return (
    <Reveal variant="up" className={className}>
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
        <a
          href={directionsHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${salon.name} in Google Maps (opens in a new tab)`}
          className="relative block h-52 bg-cream"
        >
          <svg viewBox="0 0 400 208" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="400" height="208" fill="#f4ece3" />
            <path d="M-10 150 C 90 120, 140 190, 260 140 S 380 90, 420 110" stroke="#e6dcd0" strokeWidth="18" fill="none" />
            <path d="M120 -10 C 140 60, 110 120, 150 220" stroke="#e6dcd0" strokeWidth="14" fill="none" />
            <path d="M-10 60 L 420 40" stroke="#eadfd2" strokeWidth="8" fill="none" />
            <path d="M250 -10 L 300 220" stroke="#eadfd2" strokeWidth="8" fill="none" />
            <rect x="170" y="70" width="60" height="40" rx="8" fill="#e9d8cf" />
            <rect x="300" y="120" width="70" height="50" rx="8" fill="#e9d8cf" />
            <rect x="30" y="90" width="60" height="45" rx="8" fill="#e9d8cf" />
            <circle cx="200" cy="100" r="14" fill="#8f4759" className="pin-ring" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            <path d="M200 118c-9-11-14-18-14-26a14 14 0 0 1 28 0c0 8-5 15-14 26Z" fill="#8f4759" />
            <circle cx="200" cy="92" r="5" fill="#fbf7f2" />
          </svg>
        </a>
        <div className="space-y-4 p-7">
          <h3 className="text-2xl font-semibold">Find us</h3>
          <address className="space-y-3 not-italic">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-rose" />
              <span>{singleLineAddress()}</span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-rose" />
              <a href={telHref()} className="underline-offset-4 hover:underline">
                {contact.phone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-rose" />
              {isPlaceholder(contact.email) ? (
                <span>{contact.email}</span>
              ) : (
                <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              )}
            </p>
          </address>
          <p className="text-sm text-ink-soft">Serving {contact.serviceAreas.join(", ")}.</p>
          <ButtonLink href={directionsHref()} variant="primary">
            <Navigation aria-hidden="true" className="size-5" />
            Get directions
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}
