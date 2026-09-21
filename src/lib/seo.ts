import type { Metadata } from "next";
import { salon } from "@/config/salon";

interface PageMeta {
  title: string;
  description: string;
  /** Path such as "/services". Use "/" for the home page. */
  path: string;
}

/** Builds title, description, canonical URL, Open Graph and Twitter metadata for a page. */
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const fullTitle = salon.seo.titleTemplate.replace("%s", title);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: salon.name,
      title: fullTitle,
      description,
      url: path,
      locale: salon.currency.locale.replace("-", "_"),
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/twitter-image"] },
  };
}

export const absoluteUrl = (path: string) => `${salon.siteUrl}${path === "/" ? "" : path}`;
