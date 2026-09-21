import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { salon } from "@/config/salon";
import { ButtonLink } from "@/components/ui/Button";
import { hasOnlineBooking, telHref, whatsappGreeting, whatsappHref } from "@/lib/utils";

interface ContactButtonsProps {
  /** "light" is for dark backgrounds. */
  tone?: "default" | "light";
  size?: "md" | "lg";
  className?: string;
}

/** Direct booking options: WhatsApp, phone and (optional) the online booking link. */
export function ContactButtons({ tone = "default", size = "md", className }: ContactButtonsProps) {
  const light = tone === "light";
  return (
    <div className={className ?? "flex flex-wrap gap-3"}>
      <ButtonLink href={whatsappHref(whatsappGreeting())} variant="whatsapp" size={size}>
        <MessageCircle aria-hidden="true" className="size-5" />
        WhatsApp us
      </ButtonLink>
      <ButtonLink href={telHref()} variant={light ? "outline-light" : "secondary"} size={size} ariaLabel={`Call ${salon.name} on ${salon.contact.phone.display}`}>
        <Phone aria-hidden="true" className="size-5" />
        Call {salon.contact.phone.display}
      </ButtonLink>
      {hasOnlineBooking() && (
        <ButtonLink href={salon.contact.appointmentUrl} variant={light ? "light" : "primary"} size={size}>
          <CalendarCheck aria-hidden="true" className="size-5" />
          Book online
        </ButtonLink>
      )}
    </div>
  );
}
