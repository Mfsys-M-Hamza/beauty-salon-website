// Static hosting has no image optimiser, so this generates the resized WebP copies that
// src/lib/image-loader.ts points to: public/_img/<width>/<path>.webp for every JPEG/PNG in
// public/images. Runs before `next build`; unchanged images are skipped.
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/images";
const OUT = "public/_img";
// Keep in sync with images.imageSizes + images.deviceSizes in next.config.ts.
const IMAGE_WIDTHS = [96, 256, 384, 640, 960, 1280, 1920];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

async function isFresh(target, sourceTime) {
  try {
    return (await stat(target)).mtimeMs >= sourceTime;
  } catch {
    return false;
  }
}

let written = 0;
let skipped = 0;
for await (const file of walk(SRC)) {
  const rel = path.relative("public", file).replace(/\.(jpe?g|png)$/i, ".webp");
  const sourceTime = (await stat(file)).mtimeMs;
  for (const width of IMAGE_WIDTHS) {
    const target = path.join(OUT, String(width), rel);
    if (await isFresh(target, sourceTime)) {
      skipped++;
      continue;
    }
    await mkdir(path.dirname(target), { recursive: true });
    // Never upscale: widths above the original just get the original size.
    await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(target);
    written++;
  }
}
console.log(`optimize-images: wrote ${written}, skipped ${skipped} up to date`);
