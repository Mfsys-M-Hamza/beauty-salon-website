import { MessageCircle } from "lucide-react";
import { salon } from "@/config/salon";
import { whatsappGreeting, whatsappHref } from "@/lib/utils";

/** Floating WhatsApp button, mobile and tablet only. */
export function StickyWhatsApp() {
  return (
    <a
      href={whatsappHref(whatsappGreeting())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${salon.name} on WhatsApp (opens in a new tab)`}
      className="fixed right-4 bottom-4 z-40 inline-flex min-h-14 items-center gap-2 rounded-full bg-whatsapp px-5 font-semibold text-white shadow-lift transition hover:bg-whatsapp-dark lg:hidden"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
      WhatsApp
    </a>
  );
}
