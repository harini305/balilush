# Bali Lush — Source Website Audit (Phase 1)

**Site audited:** https://www.balilush.com (Wix) · **Date:** 2026-10-21 · **Status:** Phase 1 complete. Waiting for approval before Phase 2.

This folder documents the original website so the Phase 2 rebuild (Next.js App Router + React + GSAP) can be done without re-researching the live site. No redesign, code, config change, push or deploy was made.

## Documents

| File | What it covers |
|---|---|
| [01-audit-report.md](01-audit-report.md) | Overview, coverage (inspected / partial / broken / unverified), limitations, tech fingerprint, key findings |
| [02-page-inventory.md](02-page-inventory.md) | Route table with recommendations, shared components, page-by-page section inventory, navigation map |
| [03-content-inventory.md](03-content-inventory.md) | Business facts, labels, offers, rooms, activities and prices, food, reviews, blog, SEO metadata, content priority |
| [04-assets-manifest.csv](04-assets-manifest.csv) | 126 assets: ID, type, filename, original URL, pages and sections, alt text, original dimensions and bytes, display size, local path, availability, concerns |
| [05-brand-reference.md](05-brand-reference.md) | Logo, original fonts and type scale, verified and estimated colours, shapes, motifs, tone; what to keep vs drop |
| [06-functionality-and-dependencies.md](06-functionality-and-dependencies.md) | Feature matrix with verification level, external dependencies (Cloudbeds, TripAdvisor, YouTube) |
| [07-responsive-observations.md](07-responsive-observations.md) | Desktop 1440 / tablet 768 / mobile 390 behaviour, heights, type scaling, mobile-only differences |
| [08-issues-gaps-questions.md](08-issues-gaps-questions.md) | Factual conflicts, placeholder text, typos, broken links, gaps, SEO/a11y, spam, asset risks, **questions for the owner** |
| [09-phase-2-recommendations.md](09-phase-2-recommendations.md) | **Mandatory Phase 2 rules** (two-font rule and others), IA, data sources, image pipeline, motion, fix-forward list |

## Supporting folders

| Folder | Contents |
|---|---|
| `content/` | Verbatim structured content: `shared.json`, `rooms.json`, `menus.json`, `activities.json`, `reviews.json`, `rate-periods.json`, `pages/*.json` (18 pages) |
| `screenshots/` | 68 JPEG captures (18 pages × 3 viewports + interaction states + Cloudbeds). See `screenshots/INDEX.md` |
| `reference-assets/` | Original logo PNG and 6 tiling textures (≈300 KB). The photos stay on the Wix CDN (≈253 MB) — URLs are in the manifest |
| `raw-crawl/` | 54 raw crawl JSON files (page × viewport: texts with computed typography, images, links, sections, colour stats, request hosts), the interaction log, the Cloudbeds landing extract and raw asset data |
| `tooling/` | The audit scripts (Playwright crawler, interaction tests, asset and size extraction, content generator) for reproducibility. They are research tools, not part of the website |

## At a glance

- **18 live routes** (home, rooms listing, 4 rooms, rate periods, restaurant, breakfast, lunch & dinner, activities, retreats, reviews, blog + 4 posts), plus legacy `/home` and `/blank` and 5 noindex hashtag archives.
- **One conversion path:** the external Cloudbeds booking engine.
- **Biggest content issues:** conflicting offers and rate dates, placeholder or duplicated copy (home staff section, retreats), missing address, policies and contact page, and spam comments on the blog.
- **Brand:** magenta-umbrella logo with white script and green stroke; leaf green `#82B42D`, lime `#B3CE6F`, magenta `#AE095B`, black/white; teak and rice-terrace photography; Javanese and leaf motifs. The original uses 4 font families plus 1 fallback; Phase 2 must use exactly **two**.
