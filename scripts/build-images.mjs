// Generates responsive derivatives from assets-source/ originals into public/images/
// and writes data/images.json (dimensions + available widths) for the <Picture> component.
// Originals are read-only inputs and are never overwritten.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGES } from './image-list.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'assets-source');
const OUT = path.join(ROOT, 'public/images');
const DATA = path.join(ROOT, 'data/images.json');
const STEPS = [480, 800, 1200, 1600, 2400];
// Widest derivative generated. 1600px covers half-screen photos on 2x displays and the photo
// viewer; only full-width heroes (maxWidth: 2400 in image-list.mjs) get the 2400px size.
const DEFAULT_MAX = 1600;

sharp.concurrency(2);

function widthsFor(original, max) {
  const cap = Math.min(original, max);
  const list = STEPS.filter((w) => w <= cap);
  if (!list.includes(cap)) list.push(cap);
  return list.sort((a, b) => a - b);
}

const sources = fs.readdirSync(SRC);
const result = {};
const missing = [];

for (const img of IMAGES) {
  const file = sources.find((f) => f.startsWith(`${img.id}.`));
  if (!file) { missing.push(img.id); continue; }
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const width = swap ? meta.height : meta.width;
  const height = swap ? meta.width : meta.height;
  const widths = widthsFor(width, img.maxWidth ?? DEFAULT_MAX);
  const fallback = widths.filter((w) => w <= 1200).at(-1);
  const base = path.join(OUT, img.name);
  fs.mkdirSync(path.dirname(base), { recursive: true });

  for (const w of widths) {
    const jobs = [
      ['avif', (s) => s.avif({ quality: 52, effort: 4 })],
      ['webp', (s) => s.webp({ quality: 74 })],
    ];
    if (w === fallback) jobs.push(['jpg', (s) => s.jpeg({ quality: 78, mozjpeg: true })]);
    for (const [ext, encode] of jobs) {
      const target = `${base}-${w}.${ext}`;
      if (fs.existsSync(target) && fs.statSync(target).mtimeMs > fs.statSync(input).mtimeMs) continue;
      await encode(sharp(input, { pages: 1 }).rotate().resize({ width: w, withoutEnlargement: true })).toFile(target);
    }
  }
  result[img.name] = { id: img.id, width, height, widths, fallback };
  console.log(`${img.id} ${img.name} ${width}x${height} -> ${widths.join(',')}`);
}

// Remove derivatives that are no longer part of any image's width set.
const keep = new Set();
for (const [name, m] of Object.entries(result)) {
  for (const w of m.widths) { keep.add(`${name}-${w}.avif`); keep.add(`${name}-${w}.webp`); }
  keep.add(`${name}-${m.fallback}.jpg`);
}
let removed = 0;
for (const dir of fs.readdirSync(OUT)) {
  for (const file of fs.readdirSync(path.join(OUT, dir))) {
    if (!keep.has(`${dir}/${file}`)) { fs.unlinkSync(path.join(OUT, dir, file)); removed++; }
  }
}
console.log(`removed ${removed} unused derivatives`);

fs.mkdirSync(path.dirname(DATA), { recursive: true });
fs.writeFileSync(DATA, JSON.stringify(result, null, 1));
console.log(`wrote ${Object.keys(result).length} entries; missing originals: ${missing.join(', ') || 'none'}`);
