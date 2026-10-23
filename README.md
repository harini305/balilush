# Bali Lush — website rebuild (Phase 2)

Next.js (App Router, JavaScript) frontend for Bali Lush, rebuilt from the Phase 1 audit in
[`docs/source-audit/`](docs/source-audit/README.md). Local development only — nothing has been pushed or deployed.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build
npm run lint

# Image pipeline (only needed when the image set changes)
npm run images:fetch   # downloads originals listed in scripts/image-list.mjs into assets-source/ (git-ignored)
npm run images:build   # writes derivatives to public/images/ and data/images.json
```

## Structure

| Path | Purpose |
|---|---|
| `app/` | Routes (all static; `/rate-periods` revalidates daily so ended periods drop off) |
| `components/` | Header, footer, `<Picture>`, gallery/lightbox, review slider and filter, menu, motion |
| `data/content/` | The verbatim content files the site uses, copied from `docs/source-audit/content/` |
| `lib/content.js`, `lib/blog.js` | Adapters over `data/content/`. Every wording change is a commented transform referencing the audit issue ID |
| `lib/site.js` | Booking URL, phone, email, navigation |
| `data/images.json` | Generated: dimensions and widths for each derivative |
| `data/alt-text.js` | Alt text written from what each photo shows |
| `scripts/` | Image fetch and derivative scripts |

## Design system

- **Fonts (exactly two):** Source Serif 4 for headings; Assistant (already part of the original brand) for body, navigation, buttons and all UI. Both self-hosted via `next/font`.
- **Colours:** verified brand green `#82B42D` (Book buttons, with dark text for contrast), lime `#B3CE6F` (accents on dark grounds), magenta `#AE095B` (prices, room links, notes — used sparingly), near-black and white, plus warm neutral surfaces.
- **Motion:** GSAP + ScrollTrigger in `components/Motion.js` only — gentle reveal of below-the-fold blocks and a slight settle on hero photos. Disabled under `prefers-reduced-motion`; content is visible without JavaScript.

## Images

- `next.config.mjs` sets `images: { unoptimized: true }`; no route uses Vercel Image Optimization. `<Picture>` renders pre-generated AVIF + WebP `srcset`s with a JPEG fallback, explicit width/height and `sizes`.
- 99 originals (≈242 MB) were downloaded once from the manifest URLs into `assets-source/` (git-ignored, never modified, never deployed); 95 are used. `sharp` generates AVIF + WebP at 480/800/1200/1600 px (2400 px only for the three full-width heroes, marked `maxWidth: 2400` in `scripts/image-list.mjs`), never wider than the original, plus one JPEG fallback. Metadata is stripped and EXIF orientation applied (this also re-encodes the MPO phone files). Output: 669 files, ≈67 MB in `public/images/`; the build script deletes any derivative that is no longer referenced.
- [`docs/phase-2/asset-map.csv`](docs/phase-2/asset-map.csv) maps each manifest ID to its derivative name, widths and alt text.
- The TripAdvisor logo (A042) and the unrendered Wix placeholders (A117–A126) are not used. The logo is the supplied PNG, recompressed losslessly to `public/brand/bali-lush-logo.png`.

## Content decisions (pending owner confirmation)

See `docs/source-audit/08-issues-gaps-questions.md` for issue IDs.

| Issue | Treatment |
|---|---|
| F1 conflicting offers (popup / promo strip / rate table) | No offer is published: no popup, no promo strip, and the rate table's "Free nights" column is withheld |
| F2 rate-table year errors | Those four rows show "Dates to be confirmed"; nothing is guessed |
| F4 past periods | Periods that have ended are hidden automatically |
| F5 dish counts (5–6 vs 10–14 vs 47 listed) | Count clauses withheld on Home and Lunch & Dinner; every listed dish is kept |
| F7 "three free-standing bungalows" / D1 repeated paragraph | The paragraph appears once, without the "three free-standing bungalows" sentence |
| F8 rooms intro "parties of 2 to 5" | Omitted; each room shows its own "Sleeps" figure |
| D1 "Our Friendly Staff" placeholder copy | The heading and staff photos are kept, with no body copy until the owner supplies it |
| D2 Retreats duplicated sections | The duplicated paragraphs aren't repeated; the sections keep their photos and links |
| D3/D4 breakfast duplicates and misplaced "(dairy)" | Duplicate tea and Jamu entries are shown once; "(dairy)" is moved to the yogurt note |
| D6 split amenity bullet | The two halves are rejoined, word for word |
| F12 combined cooking + market package listed twice | Shown once and linked from both activities; "750,000" and "650,000" stay as published (no "Rp" added) |
| B1–B3 dead footer links | Policy, terms and privacy links are omitted until the pages exist; "Host a Retreat" links to `/retreats` |
| F15 address and check-in/out (Cloudbeds only) | Not published |
| Blog spam comments | Not migrated; comments, views and likes are dropped |
| Favicon | Neutral placeholder (`app/icon.svg`) until the owner provides an icon |

## Booking

Every Book button goes to `/book`, an on-site page that embeds the genuine Bali Lush booking engine
(`https://hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr`, the same URL every Book button on the original
site uses). Dates, rooms, rates and payment are handled entirely by Cloudbeds. The page also links to the same
Cloudbeds page in a new tab, in case a browser blocks the embedded form.

## What is deployed

`.vercelignore` keeps `docs/`, `scripts/`, `assets-source/` and the README out of the Vercel upload. The audit's raw crawl data and screenshots (which include the live blog's spam comments) are also kept out of git.

## Redirects

`/home` → `/`, `/blank` → `/`, `/blog/hashtags/*` → `/blog` (permanent).
