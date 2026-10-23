# 09 — Phase 2 Recommendations & Mandatory Requirements

Phase 2 starts **only after explicit approval**. This document records the requirements and the implementation considerations that came out of the audit. It does not select final fonts, write marketing copy or design layouts.

## 1. Target stack (as briefed)

Next.js (App Router) · JavaScript (no TypeScript unless requested) · React · GSAP + ScrollTrigger · responsive CSS. Static generation for every route (the content is static; booking is external).

## 2. Mandatory design rules (carry forward verbatim)

### Typography
- **Exactly two font families across the entire website**: one for headings; one for body, navigation, buttons, forms, cards, footer and all other UI.
- Both readable, professional and not overly fancy. **No script font** (the original Dancing Script is not carried over), and no third family for decorative headings, special sections, the footer or individual components.
- Hierarchy comes from weight, size, line-height and letter-spacing only.
- Consistent heading and body sizes across equivalent components; a controlled, responsive type scale (e.g. `clamp()`-based tokens).
- Final pair chosen in Phase 2 (options in `05-brand-reference.md` §2.3; Assistant is an on-brand, OFL-licensed candidate). Load via `next/font` (self-hosted, no layout shift).

### Visual design
- Professional, human-designed appearance; intentional image and text alignment.
- Consistent content widths, margins and spacing (one container system and spacing scale).
- No unnecessary decorative numbering, eyebrow text, random symbols, floating badges or ornamental elements.
- Avoid repetitive AI-looking layouts and generic template patterns. Use effects only when they serve a purpose.
- Preserve recognisable identity: logo (as supplied), leaf green `#82B42D` / lime `#B3CE6F`, magenta accent `#AE095B` used sparingly, black/white base, warm teak and rice-terrace photography, optionally the Javanese motif as a subtle accent.

### Content
- Keep pages concise and focused; no repeated paragraphs, unnecessary sections or excessive length.
- Preserve meaningful facts (`content/*.json`).
- **Do not invent** claims, testimonials, FAQs, prices, policies, staff bios, retreat packages or blog posts. Where content is missing (see `08` §5), leave the section out or mark it pending owner content. Don't fill it with made-up text.
- Reviews stay verbatim (truncation with "read more" is allowed).

### Footer
- Compact and content-driven: verified info only (nav, Book CTA, phone, email; address only once confirmed; policy links only once the pages exist).
- No excessive padding, needless columns, duplicated content or oversized layouts.
- The final content section must be fully visible above the footer, with a natural transition into it. No overlap, clipping, excess blank space or fixed-footer interference.

### Images and performance
- Prefer the original assets (`04-assets-manifest.csv`). **No stock, AI-generated or unrelated imagery** where originals exist.
- Resize and compress locally; avoid huge downloads and duplicate copies.
- **Next.js config:** merge `images: { unoptimized: true }` into the existing `next.config` (don't replace unrelated settings), so the default Vercel Image Optimization quota isn't used.
- Still deliver sensible dimensions, compression, modern formats (WebP/AVIF), `loading="lazy"` below the fold, explicit width/height, and responsive `sizes`/`srcSet` from pre-generated variants.
- Blog: if implemented, its initial presentation uses **no more than 10 images** unless the user requests otherwise. Don't overbuild blog features.

## 3. Recommended information architecture

| Nav item | Route(s) | Notes |
|---|---|---|
| Rooms | `/rooms-and-accommodations` (+ optional `/rooms` alias); `/rooms/[slug]` × 4 | Keep the original slugs so existing links and SEO survive |
| Dining | `/restaurant`, `/breakfast`, `/lunch-and-dinner` | Use one consistent label (the original mixes Restaurant / Kitchen/Restaurant / Lush Kitchen) |
| Activities | `/activities` | Add an enquiry CTA (channel per owner) |
| Retreats | `/retreats` | Real copy needed for 2 sections; mailto CTA |
| Reviews | `/reviews` | Working room filter from JSON |
| Offers / Rates | `/rate-periods` | Linked from the offer banner; data-driven from a dated JSON so expired periods hide automatically |
| Blog (low priority) | `/blog`, `/post/...` (keep the original post URLs) | Simple; no comments |
| **Book** (persistent CTA) | Cloudbeds URL | Always visible, including on mobile |

Redirects (Next.js `redirects()` merged into config): `/home` → `/`, `/blank` → `/`, `/blog/hashtags/:tag` → `/blog`. Policy, terms and privacy routes only once the owner supplies content.

## 4. Data sources for implementation

Read directly from `docs/source-audit/content/` (or copy into a `/data` folder at build time):

- `shared.json` → header, footer, offer and booking link
- `rooms.json` → room listing, detail pages, "other rooms"
- `menus.json` → breakfast and lunch/dinner pages
- `activities.json` → activities page
- `reviews.json` → reviews page, room review blocks, home testimonials
- `rate-periods.json` → rates page and current-offer logic (after owner corrections)
- `pages/*.json` → remaining verbatim copy (home, restaurant, retreats, blog posts)

## 5. Image pipeline recommendation

1. **Download once** the originals for the assets actually chosen in the design (manifest `original_url`), into a git-ignored staging folder (e.g. `assets-source/`). Don't download all 253 MB unless needed, and don't commit originals.
2. Generate variants locally (e.g. a `sharp` script): widths such as 480 / 800 / 1200 / 1600 / 2400 (capped at the original width), AVIF + WebP + JPEG fallback, quality ≈ 70–80. Strip metadata and re-encode the MPO files.
3. Output to `public/images/<section>/<descriptive-name>-<w>.<ext>` with stable, meaningful names (not Wix hashes).
4. Write alt text from what the image shows (77 of 99 originals lack useful alt text). Keep it factual.
5. Hero candidates with enough resolution: A022 (5818×3210, home hero), A002 (activities waterfall), A107 (4032×2268 Batukaru drone), A049 / A050 (large originals). Avoid 800px originals for full-bleed use.
6. Textures in `reference-assets/` can be reused as CSS backgrounds (tiny files).

## 6. Motion (GSAP + ScrollTrigger)

- Purposeful only: subtle reveal of section content, gentle hero image scale/parallax, a gallery/carousel drag. No scroll-jacking.
- Respect `prefers-reduced-motion` (disable or simplify).
- Register ScrollTrigger client-side only (`"use client"` components), clean up on unmount, and avoid layout shift.
- Never animate content that must be readable immediately (prices, booking CTA).

## 7. Fix-forward list from the audit (implementation-side, no owner input needed)

- Real H1 on every page; correct heading hierarchy.
- Meta descriptions and OG images for every route (derived from existing copy and photos; no new claims).
- `LodgingBusiness` JSON-LD **only with owner-confirmed** address and contact data.
- `tel:` and `mailto:` links; dead links removed until their targets exist.
- Accessible nav (keyboard dropdown, focus-trapped mobile drawer), visible focus states, WCAG AA contrast (no yellow-on-photo text).
- A header that doesn't overlap content, and a compact scrolled state.
- A Book CTA reachable on mobile at all times.
- If the offer popup is kept: non-blocking, delayed or dismissible, shown once per session, and never covering the hero on first paint.
- Responsive rate table (cards on small screens).
- Long pages: jump links on the menus, a working filter and excerpts on reviews.
- No migration of blog comments, view counts or likes.

## 8. Owner inputs that block or shape Phase 2

See `08-issues-gaps-questions.md` §9 — especially the current offer and rate dates, address/map, policies, enquiry channel, missing Retreats and staff copy, and the blog's scope.

## 9. Confirmation

- The **two-font rule** and all mandatory design, content, footer, image and performance requirements above are recorded for Phase 2.
- **Phase 1 performed no implementation**: no Next.js project was created, no packages were installed in the workspace, no configuration was modified, nothing was pushed to GitHub, and nothing was deployed to Vercel. The only files created are under `docs/source-audit/`.
