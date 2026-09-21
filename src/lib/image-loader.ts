// Static hosting has no image optimiser, so images are served as-is.
// The loader only adds the sub-path (e.g. "/repo-name" on GitHub Pages) to local files.
export default function imageLoader({ src }: { src: string }): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
