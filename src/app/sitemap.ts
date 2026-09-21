import type { MetadataRoute } from "next";
import { sitemapPaths } from "@/config/navigation";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" || path === "/services" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/services" || path === "/contact" ? 0.9 : 0.6,
  }));
}
