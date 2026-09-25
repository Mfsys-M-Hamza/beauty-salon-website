// Static hosting has no image optimiser, so scripts/optimize-images.mjs pre-generates WebP copies
// at each configured width; this loader points each srcset entry at the matching file.
// It also adds the sub-path (e.g. "/repo-name" on GitHub Pages) to local files.
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (src.startsWith("/images/") && /\.(jpe?g|png)$/i.test(src)) {
    return `${base}/_img/${width}${src.replace(/\.(jpe?g|png)$/i, ".webp")}`;
  }
  return `${base}${src}`;
}
