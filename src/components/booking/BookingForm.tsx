"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Send } from "lucide-react";
import { salon } from "@/config/salon";
import {
  MAX_MESSAGE_LENGTH,
  buildBookingUrl,
  emptyBooking,
  todayISO,
  validateBooking,
  type BookingErrors,
  type BookingValues,
} from "@/lib/booking";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatTime } from "@/lib/utils";

const FIELD_ORDER: Array<keyof BookingValues> = ["name", "phone", "email", "serviceId", "date", "time", "message"];

const inputClasses = (invalid: boolean) =>
  cn(
    "w-full min-h-12 rounded-xl border bg-white px-4 py-3 text-base text-ink transition duration-300 placeholder:text-ink-soft/70",
    invalid ? "border-red-700" : "border-ink/25 hover:border-ink/50 focus:border-rose",
  );

interface FieldProps {
  name: keyof BookingValues;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  delay?: number;
  className?: string;
  children: (aria: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; "aria-required": boolean }) => ReactNode;
}

function Field({ name, label, error, hint, required, delay = 0, className, children }: FieldProps) {
  const id = `field-${name}`;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <Reveal delay={delay} className={className}>
      <label htmlFor={id} className="mb-1.5 block text-base font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="text-rose">
            {" "}
            *
          </span>
        )}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy, "aria-required": Boolean(required) })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </Reveal>
  );
}

export function BookingForm() {
  const preset = useSearchParams().get("service") ?? "";
  const [values, setValues] = useState<BookingValues>(() => ({
    ...emptyBooking,
    serviceId: salon.services.some((s) => s.id === preset) ? preset : "",
  }));
  const [errors, setErrors] = useState<BookingErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [minDate] = useState(() => todayISO());
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sentUrl) successRef.current?.focus();
  }, [sentUrl]);

  const update = (key: keyof BookingValues, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: validateBooking(next)[key] }));
  };

  const bind = (key: keyof BookingValues) => ({
    name: key,
    value: values[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => update(key, e.target.value),
    onBlur: () => {
      if (values[key]) setErrors((prev) => ({ ...prev, [key]: validateBooking(values)[key] }));
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateBooking(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }
    const url = buildBookingUrl(values);
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div role="status" className="pop-in rounded-3xl border border-line bg-white p-8 text-center shadow-soft sm:p-12">
        <svg viewBox="0 0 64 64" className="mx-auto size-20" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#f3dfdb" />
          <path className="draw-check" d="M19 33l9 9 17-19" fill="none" stroke="#8f4759" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 ref={successRef} tabIndex={-1} className="mt-6 text-4xl outline-none">
          Your request is ready
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          WhatsApp should have opened with your details filled in. Press <strong>Send</strong> there to share your request with {salon.name}.
        </p>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          This is an appointment request only and does not guarantee confirmation. We will reply to confirm availability.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
            <MessageCircle aria-hidden="true" className="size-5" />
            Open WhatsApp again
          </a>
          <button type="button" onClick={() => setSentUrl(null)} className={buttonClasses("secondary")}>
            Edit my details
          </button>
          <button
            type="button"
            onClick={() => {
              setValues(emptyBooking);
              setErrors({});
              setSentUrl(null);
            }}
            className={buttonClasses("secondary")}
          >
            New request
          </button>
        </div>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k]);

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Appointment request" className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-10">
      {errorList.length > 0 && (
        <div role="alert" className="mb-6 rounded-2xl border border-red-700 bg-red-50 p-4 text-red-800">
          <p className="font-semibold">Please fix {errorList.length === 1 ? "this field" : `these ${errorList.length} fields`} and try again:</p>
          <ul className="mt-2 list-disc pl-5">
            {errorList.map((key) => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="mb-6 text-sm text-ink-soft">Fields marked * are required.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Full name" required error={errors.name}>
          {(a) => <input type="text" autoComplete="name" placeholder="Your name" className={inputClasses(!!errors.name)} {...a} {...bind("name")} />}
        </Field>
        <Field name="phone" label="Phone number" required error={errors.phone} delay={60}>
          {(a) => <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 555 123 4567" className={inputClasses(!!errors.phone)} {...a} {...bind("phone")} />}
        </Field>
        <Field name="email" label="Email address" required error={errors.email} delay={120} className="sm:col-span-2">
          {(a) => <input type="email" autoComplete="email" placeholder="name@example.com" className={inputClasses(!!errors.email)} {...a} {...bind("email")} />}
        </Field>
        <Field name="serviceId" label="Service" required error={errors.serviceId} delay={180} className="sm:col-span-2">
          {(a) => (
            <select className={inputClasses(!!errors.serviceId)} {...a} {...bind("serviceId")}>
              <option value="">Choose a service</option>
              {salon.categories.map((c) => (
                <optgroup key={c.id} label={c.name}>
                  {salon.services
                    .filter((s) => s.categoryId === c.id)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          )}
        </Field>
        <Field name="date" label="Preferred date" required error={errors.date} delay={240}>
          {(a) => <input type="date" min={minDate} suppressHydrationWarning className={inputClasses(!!errors.date)} {...a} {...bind("date")} />}
        </Field>
        <Field name="time" label="Preferred time" required error={errors.time} delay={300}>
          {(a) => (
            <select className={inputClasses(!!errors.time)} {...a} {...bind("time")}>
              <option value="">Choose a time</option>
              {salon.bookingTimeSlots.map((t) => (
                <option key={t} value={t}>
                  {formatTime(t)}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field
          name="message"
          label="Message (optional)"
          error={errors.message}
          hint={`${values.message.length}/${MAX_MESSAGE_LENGTH} characters. Mention allergies, sensitive skin or reference photos.`}
          delay={360}
          className="sm:col-span-2"
        >
          {(a) => <textarea rows={4} placeholder="Anything we should know?" className={inputClasses(!!errors.message)} {...a} {...bind("message")} />}
        </Field>
      </div>

      <p className="mt-6 rounded-2xl bg-cream p-4 text-sm text-ink-soft">
        Submitting this form opens WhatsApp with your appointment request filled in. It is a <strong className="text-ink">request only and does not guarantee confirmation</strong>; we will reply to confirm availability.
      </p>

      <button type="submit" className={cn(buttonClasses("primary", "lg"), "mt-6 w-full sm:w-auto")}>
        <Send aria-hidden="true" className="size-5" />
        Request via WhatsApp
      </button>
    </form>
  );
}
