// Downloads the original photographs used by the rebuilt site from the URLs in
// docs/source-audit/04-assets-manifest.csv into assets-source/ (git-ignored).
// Originals are never modified; derivatives are produced by build-images.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { IMAGES } from './image-list.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const MANIFEST = path.join(ROOT, 'docs/source-audit/04-assets-manifest.csv');
const OUT = path.join(ROOT, 'assets-source');

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows;
  return body.filter((r) => r.length > 1).map((r) => Object.fromEntries(head.map((h, i) => [h.replace(/^﻿/, ''), r[i]])));
}

const manifest = Object.fromEntries(parseCsv(fs.readFileSync(MANIFEST, 'utf8')).map((r) => [r.id, r]));
fs.mkdirSync(OUT, { recursive: true });

const ids = [...new Set(IMAGES.map((i) => i.id))];
const log = [];
let cursor = 0;

async function worker() {
  while (cursor < ids.length) {
    const id = ids[cursor++];
    const entry = manifest[id];
    if (!entry?.original_url) { log.push({ id, status: 'missing-in-manifest' }); continue; }
    const ext = path.extname(new URL(entry.original_url).pathname) || '.jpg';
    const file = path.join(OUT, `${id}${ext}`);
    if (fs.existsSync(file) && fs.statSync(file).size === Number(entry.original_bytes)) {
      log.push({ id, status: 'cached', bytes: fs.statSync(file).size });
      continue;
    }
    try {
      const res = await fetch(entry.original_url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(file, buf);
      log.push({ id, status: 'downloaded', bytes: buf.length, expected: Number(entry.original_bytes) });
      console.log(`${id} ${(buf.length / 1e6).toFixed(1)} MB`);
    } catch (err) {
      log.push({ id, status: 'failed', error: String(err) });
      console.error(`${id} failed: ${err}`);
    }
  }
}

await Promise.all(Array.from({ length: 4 }, worker));
log.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(path.join(OUT, 'fetch-log.json'), JSON.stringify(log, null, 1));
const failed = log.filter((l) => l.status === 'failed' || l.status === 'missing-in-manifest');
console.log(`done: ${log.length} assets, ${failed.length} failed`);
