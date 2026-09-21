import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-28 text-center">
      <p className="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Error 404</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-lg text-ink-soft">The link may be old or mistyped. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          View services
        </ButtonLink>
      </div>
    </section>
  );
}
