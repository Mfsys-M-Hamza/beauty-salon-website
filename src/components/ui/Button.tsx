import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "whatsapp";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-rose text-white hover:bg-rose-dark hover:shadow-lift",
  secondary: "border border-ink/30 text-ink hover:bg-ink hover:text-ivory",
  light: "bg-ivory text-ink hover:bg-white hover:shadow-lift",
  "outline-light": "border border-white/70 text-white hover:bg-white/15",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark hover:shadow-lift",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap",
    "transition duration-300 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none",
    size === "lg" ? "min-h-14 px-8 text-lg" : "min-h-12 px-6 text-base",
    variants[variant],
    className,
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/** Internal paths use next/link; tel:, mailto: and https: links use a plain anchor. */
export function ButtonLink({ href, variant, size, className, children, ariaLabel }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
