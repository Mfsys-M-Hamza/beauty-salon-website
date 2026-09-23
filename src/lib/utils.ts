import { salon } from "@/config/salon";
import type { MediaClip, PageName, Service } from "@/config/types";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** True for values like "[INSTAGRAM URL]" that the client has not filled in yet. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

export function formatPrice(service: Pick<Service, "price" | "priceType">): string {
  const amount = new Intl.NumberFormat(salon.currency.locale, {
    style: "currency",
    currency: salon.currency.code,
    maximumFractionDigits: Number.isInteger(service.price) ? 0 : 2,
  }).format(service.price);
  return service.priceType === "from" ? `From ${amount}` : amount;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

/** "13:00" -> "1:00 PM" (locale independent so server and client match). */
export function formatTime(value: string): string {
  const [hh, mm] = value.split(":").map(Number);
  const suffix = hh >= 12 ? "PM" : "AM";
  return `${hh % 12 || 12}:${String(mm).padStart(2, "0")} ${suffix}`;
}

export const telHref = () => `tel:${salon.contact.phone.dial}`;

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${salon.contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappGreeting = () =>
  `Hello ${salon.name}, I would like to ask about booking an appointment.`;

export function directionsHref(): string {
  const { googleMapsUrl, address } = salon.contact;
  if (!isPlaceholder(googleMapsUrl)) return googleMapsUrl;
  const query = [address.street, address.city, address.region].join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const hasOnlineBooking = () => !isPlaceholder(salon.contact.appointmentUrl);

export const singleLineAddress = () => {
  const { street, city, region, postalCode } = salon.contact.address;
  return [street, city, region, postalCode].filter((part) => !isPlaceholder(part)).join(", ");
};

export function findClip(page: PageName, section: string): MediaClip | undefined {
  return salon.clips.find((c) => c.enabled && c.page === page && c.section === section);
}

export function serviceName(id: string): string | undefined {
  return salon.services.find((s) => s.id === id)?.name;
}
