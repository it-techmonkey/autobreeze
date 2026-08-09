/**
 * One-off image optimizer for public/.
 *
 * The car photos were camera originals (1920px, 300-480 KB each, 110 MB total).
 * Nothing in the UI renders above ~1600px, so the extra pixels were only ever
 * decoded and thrown away — and on a cold cache Next's optimizer had to load
 * every 1920px source into memory to generate each variant, which is what made
 * the detail pages crawl.
 *
 * Run with:  node scripts/optimize-images.mjs [--dry]
 *
 * Originals live in ../_image_originals_backup_2026-08-03 (verified to contain
 * all 455 files) — this script rewrites public/ in place.
 */

import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = join(process.cwd(), "public");

/**
 * Widths are driven by what the layout actually paints, not by the source:
 *   - car gallery / hero fill at most a ~1200px column on a 2x display
 *   - brand logos render into a 112px box
 * Anything larger is decoded and discarded.
 */
const MAX_WIDTH = 1280;
const LOGO_MAX_WIDTH = 400;
const JPEG_QUALITY = 78;
const DRY_RUN = process.argv.includes("--dry");

/**
 * Converting a .png to .jpg would break every hardcoded reference (the logo
 * paths in BrandMarquee/Navbar/Footer, HERO_IMAGES in Hero). Re-encode PNGs as
 * PNGs and keep the filename — the size win comes from the resize either way.
 */
const KEEP_EXTENSION = true;

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function relative(file) {
  return file.slice(PUBLIC_DIR.length + 1).split("\\").join("/");
}

async function optimize(file) {
  const ext = extname(file).toLowerCase();
  if (!IMAGE_EXT.has(ext)) return null;

  const before = (await stat(file)).size;
  const rel = relative(file);
  const image = sharp(file, { failOn: "none" });
  const meta = await image.metadata();

  // Brand logos paint into a 112px box; the car photos and hero need real width.
  const targetWidth = rel.startsWith("img/brand/") ? LOGO_MAX_WIDTH : MAX_WIDTH;

  // Only downscale; never upscale a source that is already small.
  const resized =
    meta.width && meta.width > targetWidth
      ? image.resize({ width: targetWidth, withoutEnlargement: true })
      : image;

  const pipeline =
    ext === ".png"
      ? resized.png({ compressionLevel: 9, effort: 10 })
      : resized.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });

  const buffer = await pipeline.toBuffer();

  // Never write a result that is larger than what we started with.
  if (buffer.length >= before) {
    return { rel, before, after: before, skipped: true };
  }

  if (!DRY_RUN) {
    // sharp cannot read and write the same path in one pass; stage then swap.
    const tmp = file + ".tmp";
    await sharp(buffer).toFile(tmp);
    await unlink(file);
    await rename(tmp, file);
  }

  return { rel, before, after: buffer.length };
}

const results = [];
for await (const file of walk(PUBLIC_DIR)) {
  try {
    const r = await optimize(file);
    if (r) results.push(r);
  } catch (err) {
    console.error(`FAILED  ${relative(file)}: ${err.message}`);
  }
}

const before = results.reduce((s, r) => s + r.before, 0);
const after = results.reduce((s, r) => s + r.after, 0);
const mb = (n) => (n / 1048576).toFixed(1) + " MB";

const skipped = results.filter((r) => r.skipped);
if (skipped.length) {
  console.log(`\n${skipped.length} already optimal, left untouched.`);
}

console.log(
  `\n${DRY_RUN ? "[dry run] " : ""}${results.length} images: ${mb(before)} -> ${mb(after)} ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% smaller)`
);
