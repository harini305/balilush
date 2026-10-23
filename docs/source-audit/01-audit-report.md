# 01 — Audit Report: balilush.com

**Audit date:** 2026-10-21  
**Source:** https://www.balilush.com (apex `balilush.com` and `http://` both 301 → `https://www.balilush.com/`)  
**Platform:** Wix (Thunderbolt renderer; Wix Blog, Wix Pro Gallery, Wix dynamic pages, Wix lightbox), served via Cloudflare  
**Phase:** 1 of 2 — research only. No code, redesign, configuration change, push or deploy was performed.

Legend used across these docs: **Verified** = observed directly in the live DOM, HTTP response or a test interaction. **Observed** = seen in screenshots or the DOM but not interaction-tested. **Estimate** = inferred (for example a colour sampled from a photographic texture). **Unknown** = could not be determined.

---

## 1. Website overview

Bali Lush is a small boutique eco-retreat / guest house in the Tabanan "rice bowl" region of Bali. It has four bookable rooms in three antique Javanese teak buildings, plus an on-site restaurant (the "Lush Kitchen"), guided activities, a yoga shala, and a retreat-hosting offer. The website is a brochure site. Its job is to:

1. Present the rooms (Butterfly Room, Dragonfly Room, Frog Bungalow, Duck Cottage).
2. Push visitors to the **external Cloudbeds booking engine** (the only conversion path).
3. Promote seasonal "pay X stay Y" free-night specials (site-wide auto-popup, promo strip and `/rate-periods` table).
4. Show the food offer (restaurant, breakfast menu, lunch/dinner menu), activities with IDR prices, retreat hosting, guest reviews and a small, dormant blog.

There is no on-site form, account area, e-commerce, search, map, contact page or social media link.

## 2. Coverage summary

| Metric | Result |
|---|---|
| Routes listed in sitemaps | 18 (10 static pages, 4 room dynamic pages, 4 blog posts) + 1 blog category entry (= `/blog`) |
| Routes successfully inspected (desktop 1440, tablet 768, mobile 390) | **18 / 18** |
| Extra live routes discovered (not in sitemap) | `/home` (duplicate of `/`), `/blank` (soft-404), 5 × `/blog/hashtags/*` (noindex tag archives) |
| Candidate routes probed for hidden pages | 45 common paths (about, contact, gallery, faq, terms, privacy, booking-policy, …) — all **404** |
| Full-page screenshots | 54 (18 pages × 3 viewports) + 10 interaction-state captures + 1 external (Cloudbeds) |
| Structured raw data | 54 JSON crawl files (text + computed typography, images, links, sections, colour stats, third-party hosts) |
| Unique media assets inventoried | 116 rendered (107 Wix-hosted) + 10 unrendered references in HTML source |

### 2.1 Pages successfully inspected (all three viewports)

`/`, `/rooms-and-accommodations`, `/rooms/butterfly-room`, `/rooms/dragonfly-room`, `/rooms/frog-bungalow`, `/rooms/duck-cottage`, `/rate-periods`, `/restaurant`, `/breakfast`, `/lunch-and-dinner`, `/activities`, `/retreats`, `/reviews`, `/blog`, `/post/it-s-that-magical-time-of-the-year-pineapple-season`, `/post/2016/09/01/getting-the-bali-lush-penjor-ready-for-galungan`, `/post/2016/08/21/new-rice-planting`, `/post/2016/08/16/independence-day-celebrations-bali-style`.

### 2.2 Pages inspected only partially

| Route | What was checked | What was not |
|---|---|---|
| `/home` | HTTP 200, title, canonical (`https://www.balilush.com`) and rendered content = identical to `/` | Not screenshotted separately (duplicate) |
| `/blank` | HTTP 200, title "Home \| Bali Lush"; renders Wix "Page not found (Error 404)" body | — (soft-404 legacy page) |
| `/blog/hashtags/{BaliVillageLife, Galungan, RiceTerraces, activities, offerings}` | HTTP 200, `<meta name="robots" content="noindex">`, title `#Tag` | Not screenshotted; they are auto-generated Wix tag archives |
| `/blog-feed.xml` | Advertised via `<link rel="alternate">` on `/blog` | Contents not audited |
| Cloudbeds booking engine (external) | Landing page loads (title "Bali Lush - Bali, Indonesia - Book Now"); date pickers, promo-code field, property info, amenities, address, check-in/out visible | **No dates searched, no booking flow attempted** (would interact with a live reservation system) |

### 2.3 Pages discovered but inaccessible

None. Every discovered internal route responded.

### 2.4 Broken or unavailable routes and links

| Item | Status |
|---|---|
| Footer "Host a Retreat" | Plain text — **not a link** (every other footer nav item is linked) |
| Footer "Booking / Cancellation Policy" | `<a>` with **no href**; click does nothing; no policy content exists on the site |
| Mobile menu "View Booking & Cancellation Policy" | Rendered as a link-styled item with **no destination** |
| Footer "Site Terms \| Privacy Policy" | Plain text; `/terms*`, `/privacy*` all **404** |
| `/blank` | Soft-404 (HTTP 200 + "Page not found" body) — SEO issue |
| `/home` | Duplicate of `/` (canonical points to `/`, so it is harmless but should be redirected) |
| Blog "Recent Posts" thumbnails | Some `<img>` elements carry the post URL as `src` (Wix rendering quirk) and show as 0×0 |
| TripAdvisor link | Returned **403** to scripted requests (bot protection); link target appears valid but is **unverified** |

### 2.5 Interactive states that could not be fully verified

- **Reviews room filter** (`<select>` "Filter reviews by Room:" — options All / Butterfly / Dragonfly / Duck / Frog). Programmatic selection did **not** change the 20 visible reviews. Either the Velo handler needs a trusted user event, or the filter is broken. **Partially verified.**
- **Room gallery expand**: clicking a gallery image did not open a fullscreen viewer, and the URL did not change. The "Next Item" arrow exists. Behaviour beyond the slider is **unverified**.
- **Blog likes, comments, share buttons** (Facebook, X, LinkedIn, copy link): observed only, not exercised (they would write to a live site).
- **Cloudbeds booking, payment and availability**: not tested.
- **Hover states** were captured for the nav (Restaurant dropdown, hover colour) only. Button hover states were not systematically captured.
- **Animations**: Wix entrance animations may exist; full-page capture after scrolling showed all content settled. No scroll-linked effects were observed.

### 2.6 Technical / access limitations

- The audit used automated Chrome (Playwright) plus `curl`. A Wix site is client-rendered and lazy-loaded, so captures were taken after progressive scrolling and waits.
- **Headless Chrome is detected by Cloudbeds** ("Oops! Something went wrong"). A normal desktop user agent loaded it fine. Some third parties may behave differently for real users.
- The promo lightbox overlays the first viewport in most full-page screenshots (see `screenshots/INDEX.md`).
- Tablet was emulated with an iPad user agent at 768px. Wix served its **scaled desktop layout** (not the mobile layout) at that width.
- Original font files are Wix-hosted webfonts. They were identified by name and weight, but not downloaded (licensing, and the Phase 2 two-font rule makes them non-essential).
- Original photography totals **≈253 MB** on the Wix CDN. Per the brief, it was **not** duplicated into the workspace. Every asset has a verified source URL in `04-assets-manifest.csv`. Only the logo and six small tiling textures (≈300 KB total) were saved to `reference-assets/`.

## 3. Technology fingerprint (verified from network requests)

| Host | Purpose |
|---|---|
| `www.balilush.com` | Wix site (SSR + client hydration) |
| `static.parastorage.com`, `siteassets.parastorage.com` | Wix runtime JS/CSS, fonts |
| `static.wixstatic.com` | Wix media (images, textures) |
| `frog.wix.com`, `panorama.wixapps.net` | Wix analytics / performance telemetry |
| `browser.sentry-cdn.com` | Wix error monitoring |
| `bundler-velo.parastorage.com` | **Velo (custom code)** — loaded on `/reviews` only (powers the room filter) |
| `lh3.googleusercontent.com` | Blog author/commenter avatars |
| `img.youtube.com` | YouTube thumbnail in the Independence Day post (video id `YdK8tGh6iD0`) |
| `hotels.cloudbeds.com` | External booking engine (link target only) |

No Google Analytics/Tag Manager, Meta pixel, chat widget, map embed or translation tool was detected.

## 4. Key findings (summary)

1. **Single conversion path**: every "Book" CTA (header, popup, room pages, footer, promo strip) goes to `https://hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr`. It must be preserved exactly.
2. **Content is rich but repetitive.** The same "Our eco retreat in Bali offers three gorgeous free-standing bungalows…" paragraph appears 4+ times on the home page, including as the body of "Our Friendly Staff". The Retreats page reuses placeholder paragraphs under the wrong headings.
3. **Pricing and offer data conflict.** The popup, promo strip and rate table disagree, and the rate table has several year errors (see `08`).
4. **Missing essentials**: no address, map, directions, check-in/out times, contact page, booking/cancellation policy, terms or privacy pages. Some of these facts exist only on Cloudbeds.
5. **Spam**: all 4 blog posts carry spam comments with outbound SEO links (gambling, essay mills, "black magic" sites, and others). Blog content is from 2016 plus one 2024 post.
6. **Media weight**: several originals are 10–32 MB (6000px JPEGs, 4032px PNG photos). Phase 2 needs a resize and compress step.
7. **Typography sprawl**: 5 font families in use (Assistant, Wix Madefor Text, Wix Madefor Display, Dancing Script, Helvetica Neue fallback). Phase 2 must reduce this to exactly two.
8. **Brand identity** rests on the logo (magenta tedung umbrella, white script wordmark, green brush stroke), leaf-green CTAs (#82B42D / #B3CE6F), a magenta accent (#AE095B), black/white, Balinese leaf and Javanese motif textures, and warm teak and rice-terrace photography.

## 5. Document map

See `README.md` for the index. Page-by-page detail is in `02`, verbatim content in `03` + `content/`, assets in `04`, brand in `05`, functionality in `06`, responsive behaviour in `07`, issues in `08`, and Phase 2 requirements in `09`.
