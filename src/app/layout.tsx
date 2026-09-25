import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { salon } from "@/config/salon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { MotionEnvironment } from "@/components/layout/MotionEnvironment";
import { JsonLd } from "@/components/ui/JsonLd";
import { beautySalonSchema } from "@/lib/schema";

const heading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(salon.siteUrl),
  title: { default: salon.seo.defaultTitle, template: salon.seo.titleTemplate },
  description: salon.seo.description,
  keywords: salon.seo.keywords,
  applicationName: salon.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: salon.name,
    title: salon.seo.defaultTitle,
    description: salon.seo.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: salon.seo.defaultTitle, description: salon.seo.description },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg` },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf7f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyWhatsApp />
        <MotionEnvironment />
        <JsonLd data={beautySalonSchema()} />
      </body>
    </html>
  );
}
