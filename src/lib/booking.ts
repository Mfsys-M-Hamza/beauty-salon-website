import { salon } from "@/config/salon";
import { formatTime, serviceName, whatsappHref } from "./utils";

export interface BookingValues {
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  date: string;
  time: string;
  message: string;
}

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

export const emptyBooking: BookingValues = {
  name: "",
  phone: "",
  email: "",
  serviceId: "",
  date: "",
  time: "",
  message: "",
};

export const MAX_MESSAGE_LENGTH = 500;

/** Local YYYY-MM-DD for today (used for the date input's min attribute). */
export function todayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function validateBooking(values: BookingValues, today = todayISO()): BookingErrors {
  const errors: BookingErrors = {};

  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[+\d\s()-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15)
    errors.phone = "Enter a valid phone number with 7 to 15 digits, for example +1 555 123 4567.";

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Enter a valid email address, for example name@example.com.";

  if (!values.serviceId) errors.serviceId = "Please choose a service.";

  if (!values.date) errors.date = "Please choose a preferred date.";
  else if (values.date < today) errors.date = "Please choose today or a future date.";
  else {
    // Parse as local noon to avoid timezone shifts changing the weekday.
    const dayName = new Date(`${values.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" });
    const hours = salon.hours.find((h) => h.day === dayName);
    if (hours?.closed) errors.date = `We are closed on ${dayName}s. Please choose another day.`;
  }

  if (!values.time) errors.time = "Please choose a preferred time.";

  if (values.message.length > MAX_MESSAGE_LENGTH)
    errors.message = `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`;

  return errors;
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function buildWhatsAppMessage(values: BookingValues): string {
  return [
    `Hello ${salon.name}, I would like to request an appointment.`,
    "",
    `Name: ${values.name.trim()}`,
    `Service: ${serviceName(values.serviceId) ?? values.serviceId}`,
    `Preferred date: ${formatDate(values.date)}`,
    `Preferred time: ${formatTime(values.time)}`,
    `Phone: ${values.phone.trim()}`,
    `Email: ${values.email.trim()}`,
    `Additional message: ${values.message.trim() || "None"}`,
  ].join("\n");
}

export const buildBookingUrl = (values: BookingValues) => whatsappHref(buildWhatsAppMessage(values));
