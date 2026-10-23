# 07 — Responsive Observations

**Viewports tested (all 18 pages):**

| Name | Size | Emulation | Wix layout served |
|---|---|---|---|
| Desktop | 1440×900 | Chrome desktop UA, DPR 1 | Desktop layout |
| Tablet | 768×1024 | iPad (gen 7) UA, touch, DPR 1 | **Scaled-down desktop layout** (same composition, smaller type) with a hamburger menu |
| Mobile | 390×844 | iPhone 13 UA, touch (DPR 1 for full pages, DPR 3 for state shots) | Separate Wix mobile layout (single column) |

No other breakpoints were probed. Wix switches layouts at fixed breakpoints, so behaviour between these widths (e.g. 1024px, 1280px) is **unverified**.

## 1. Page heights and overflow (px, Verified)

| Page | Desktop | Tablet | Mobile | Horizontal overflow |
|---|---|---|---|---|
| / | 7,094 | 5,315 | 7,489 | none |
| /rooms-and-accommodations | 1,799 | 1,252 | 2,434 | none |
| /rooms/butterfly-room | 4,118 | 3,397 | 4,837 | none |
| /rooms/dragonfly-room | 4,403 | 3,987 | 5,680 | none |
| /rooms/frog-bungalow | 4,531 | 4,021 | 5,146 | none |
| /rooms/duck-cottage | 4,301 | 3,827 | 5,232 | none |
| /rate-periods | 2,325 | 1,410 | 1,614 | none |
| /restaurant | 3,072 | 3,098 | 3,177 | none |
| /breakfast | 4,723 | 3,131 | 4,682 | none |
| /lunch-and-dinner | 7,953 | 5,677 | 8,234 | none |
| /activities | 5,486 | 3,132 | 7,102 | none |
| /retreats | 4,981 | 4,490 | 6,551 | none |
| /reviews | 8,352 | 4,776 | **9,694** | none |
| /blog | 1,483 | 2,048 | 3,263 | none |
| posts (4) | 2,994–4,942 | 2,935–4,844 | 3,187–5,458 | none |

`/reviews` (9.7k px on mobile) and `/lunch-and-dinner` (8.2k px) are very long scrolls on a phone. Phase 2 should add filtering, jump links or collapsing.

## 2. Header and navigation

| | Desktop | Tablet | Mobile |
|---|---|---|---|
| Header height | 198px | 160px | 140px |
| Positioning | fixed, gradient-only background, overlaps content | fixed | fixed |
| Logo | 220px wide, left | small, left | large (~190px), left |
| Nav | 6 inline links + dropdown | hamburger | hamburger |
| Book CTA in header | yes | yes | **no** |
| Menu panel | — | right drawer | right-side dark drawer covering ~57% of width over a dimmed page; large 20px+ links; Restaurant has a chevron sub-toggle; extra "View Booking & Cancellation Policy" (dead) at the bottom |

## 3. Typography changes

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Interior H1 | 52px | 27.7px | 29px |
| Home hero headline | 62px | not measured (scaled, est. ≈33px) | not measured (est. ≈36px; 2 lines + 2-line sub) |
| Blog post H1 | 40px | 40px | 26px |
| Body copy | 16–18px | **≈13–15px** (scaled desktop, small for reading) | 14–17px (most often 14.6px and 15.6px) |

## 4. Layout behaviour by component

| Component | Desktop | Mobile (390) | Notes |
|---|---|---|---|
| Hero | 900px (home) / 451px (inner) full-bleed photo + overlay | Home hero full-height with headline; inner heroes shorter | Popup covers the hero ~5s after load on both |
| Two-column text + image | side by side | stacked (image below text on home; above on some pages) | — |
| Home gallery slider | text left + slider right | full-width slider below text | — |
| Room cards | 2×2 grid | 2×2 grid kept (small cards, Dancing Script labels shrink) | Readability of small script labels is weak on mobile |
| Promo strip | single row | stacked, with text wrapping | — |
| Testimonial slider | arrows top-right | arrows kept | Long italic text, justified on /reviews mobile — uneven word spacing |
| Staff grid | 3×2 | 3×2 small thumbnails | — |
| Rate table | 4 columns, coloured rows | **4 columns kept at 390px**, text wraps to 2–3 lines per cell; cramped but no overflow | Phase 2: card or stacked layout |
| Menus | centred single column on texture | same, full width | Long |
| Activities | text card + photo side by side | stacked; photo after text | — |
| Retreats masonry gallery | 4-column masonry | 2-column | — |
| Reviews filter | select top-right of hero | below intro | — |
| Footer | 2-col nav left, contact block right, legal bar | stacked and centred: nav (2 cols) → logo → Book button → email → phone → policy → legal | Phone shown before email on desktop, after it on mobile |

## 5. Mobile-specific content differences (Verified by text diff)

- `/lunch-and-dinner`: the hero line **"Open from 8AM until 9PM" is missing on mobile**.
- Blog posts on mobile hide the view counts and "Sort by" label, and show "Show More" for comments.
- Everything else matches desktop text.

## 6. Issues to avoid repeating

1. The tablet layout is a shrunken desktop with ~13px body text. Phase 2 needs a true tablet layout.
2. The fixed header overlaps content on every page.
3. The mobile header has no Book CTA. Booking should always be one tap away on mobile (e.g. a header button or a compact sticky bar).
4. The rate table is cramped at 390px.
5. Justified italic review text on mobile is hard to read.
6. Very long mobile pages (reviews, menus, activities).
7. The popup obscures the first screen on mobile — the most valuable viewport.
