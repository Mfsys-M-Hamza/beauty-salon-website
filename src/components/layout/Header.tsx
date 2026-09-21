"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { salon } from "@/config/salon";
import { mainNav } from "@/config/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={close} className="flex items-center gap-3" aria-label={`${salon.name}, home`}>
          <span
            aria-hidden="true"
            className="flex size-11 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold tracking-wide text-gold-light"
          >
            {salon.logo.initials}
          </span>
          <span className="font-display text-xl leading-none font-semibold text-ink sm:text-2xl">{salon.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center px-4 text-base font-medium transition-colors",
                    "after:absolute after:inset-x-4 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-rose after:transition-transform after:duration-300 hover:after:scale-x-100",
                    isActive(item.href) ? "text-rose after:scale-x-100" : "text-ink hover:text-rose",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={cn(buttonClasses("primary"), "max-sm:hidden")}>
            Book an Appointment
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-12 items-center justify-center rounded-full border border-ink/25 text-ink lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-ivory shadow-soft lg:hidden"
      >
        <ul className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center rounded-xl px-4 text-lg font-medium",
                  isActive(item.href) ? "bg-blush text-rose-dark" : "text-ink hover:bg-cream",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link href="/contact" onClick={close} className={cn(buttonClasses("primary", "lg"), "w-full")}>
              Book an Appointment
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
