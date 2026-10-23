# 06 — Functionality & Technical Dependencies

Classification: **Observed** (visible) · **Interaction tested** (we performed the interaction) · **Functionality verified** (the intended outcome was confirmed) · **Partially verified** · **Unverified**.

## 1. Feature matrix

| # | Feature | Where | Status | Evidence / behaviour | Phase 2 consideration |
|---|---|---|---|---|---|
| 1 | Primary navigation links | Header, all pages | **Functionality verified** | All 7 targets return 200 and render | Rebuild as Next.js routes |
| 2 | Restaurant dropdown (desktop) | Header | **Functionality verified** | Hover reveals Breakfast and Lunch & Dinner (`screenshots/state_nav_restaurant_dropdown__desktop.jpg`) | Must also work by keyboard and touch (currently hover-only on desktop) |
| 3 | Mobile hamburger menu | Header ≤ tablet | **Functionality verified** | Opens a right-side drawer; chevron expands the Restaurant children (`state_mobile_menu_*`) | Rebuild accessibly (focus trap, Esc, aria-expanded) |
| 4 | Fixed header | All pages | **Functionality verified** | Header wrapper is `position: fixed; top: 0`; it stays visible while scrolling down and up (no hide/reveal). Its only background is a black-to-transparent top gradient, so the 198px-tall header **overlaps page content**: section headings and buttons show through behind the logo and nav, and the white nav text sits over light textures (`state_home_scrolled_up_header__desktop.jpg`) | Use a compact header with a solid or blurred background once scrolled, and offset anchor targets so content isn't hidden |
| 5 | Promo lightbox (auto popup) | All pages | **Functionality verified** | Auto-opens after ~4.5–5.5s (desktop and mobile); X closes it; doesn't re-open on in-session navigation; the "LEARN MORE" strip button re-opens it | Decide with the owner whether to keep it; if kept, make it a non-blocking banner, show it once per session, and make it dismissible and accessible |
| 6 | "LEARN MORE" promo strip | Home, Rooms | **Functionality verified** | Opens the lightbox; no URL change | Link to /rate-periods instead |
| 7 | Book CTAs → Cloudbeds | Header, popup, rooms, footer, room pages | **Partially verified** | Link resolves (HTTP 200) and the Cloudbeds landing renders the property (dates, promo code, info) with a normal UA. **No availability search or booking was performed.** Every CTA uses the same URL; there are no room-specific deep links | Preserve `https://hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr`; consider `target="_blank"` + `rel="noopener"`; room deep links only if the owner provides Cloudbeds room IDs |
| 8 | Home gallery slider ("Unique Teak Bungalows") | Home | **Observed** | Wix Pro Gallery horizontal slider, 14 images; auto-scrolling not confirmed | Lightweight carousel or scroll-snap row |
| 9 | Home testimonial slider | Home | **Functionality verified** | ← → arrows cycle 7 slides (titles in `content/reviews.json`) | Carousel with accessible controls, or a static selection of 2–3 |
| 10 | Room photo slider | Room pages | **Interaction tested** | 3 visible + "Next Item" arrow; clicking an image did **not** open a fullscreen view | Gallery with a lightbox |
| 11 | Reviews room filter | /reviews | **Partially verified** | `<select>` options: Select a Room / All / Butterfly Room / Dragonfly Room / Duck Cottage / Frog Bungalow. Programmatic `selectOption` did **not** change the 20 visible cards. Powered by Velo (`bundler-velo.parastorage.com` loads only here). Real-user behaviour unknown | Re-implement client-side from `content/reviews.json` (room field exists) |
| 12 | Room cards → detail pages | Home, Rooms, room pages | **Functionality verified** | Links resolve | Static generation from `content/rooms.json` |
| 13 | Email link | Footer | **Observed** | `mailto:info@balilush.com` | Keep |
| 14 | Phone | Footer | **Observed** | Plain text, **not** a `tel:` link | Make it `tel:+6282322609344` (needs WhatsApp confirmation if WhatsApp is the preferred channel — "we'll WhatsApp you the link" appears on /restaurant) |
| 15 | Booking / Cancellation Policy | Footer, mobile menu | **Interaction tested → broken** | `<a>` without href; click does nothing | Needs policy content from the owner |
| 16 | Site Terms / Privacy Policy | Footer | **Interaction tested → not links** | Plain text; pages 404 | Needs content, or remove |
| 17 | Footer "Host a Retreat" | Footer | **Interaction tested → not a link** | Plain text | Link to /retreats |
| 18 | TripAdvisor link | Home | **Unverified** | Link to tripadvisor.com.au hotel page; 403 to scripted fetch (bot protection) | Keep the link; don't show a rating or review count unless supplied |
| 19 | Blog listing / posts | /blog, /post/* | **Observed** | Wix Blog: author, dates, read time, views, likes, comments, share bar (Facebook, X, LinkedIn, copy link), recent posts | Simple static blog (MD/JSON); drop comments, likes and views |
| 20 | Blog comments | Posts | **Observed (not tested)** | Open to the public; 18 spam comments with outbound links | **Do not migrate** comments |
| 21 | Blog post video | Independence Day post | **Observed** | YouTube thumbnail (`img.youtube.com/vi/YdK8tGh6iD0`) with a play button; embed type not interaction-tested | Lazy YouTube embed (`youtube-nocookie.com`) or a link |
| 22 | Blog hashtags | Posts | **Functionality verified** | Link to `/blog/hashtags/*` (noindex archives) | Optional; not needed |
| 23 | RSS feed | /blog | **Observed** | `<link rel="alternate" href="/blog-feed.xml">` | Optional |
| 24 | Search | — | Not present | — | Not needed |
| 25 | Forms (contact, enquiry, newsletter) | — | **Not present** (only form control is the reviews `<select>`) | — | If Phase 2 adds an enquiry form it needs a backend or provider decision — out of scope unless approved |
| 26 | Login / accounts / e-commerce | — | Not present | — | — |
| 27 | Maps / location embed | — | **Not present** | Address only on Cloudbeds | Owner to confirm whether to add a map |
| 28 | Translation / language switcher | — | Not present (`lang="en"`) | — | — |
| 29 | Social media links | — | **Not present** (no Instagram/Facebook profile links found) | Only the blog share buttons | Ask the owner for profile URLs |
| 30 | Analytics / tracking | — | Wix built-in only (`frog.wix.com`, `panorama.wixapps.net`) | No GA/GTM/Meta pixel detected | Owner to decide on analytics in Phase 2 |
| 31 | Animations | All pages | **Observed** | Wix entrance animations possible; nothing scroll-linked observed | Phase 2: GSAP + ScrollTrigger used sparingly, respecting `prefers-reduced-motion` |
| 32 | Back-to-top / anchors | Wix `SCROLL_TO_TOP` anchors | Observed (not visible UI) | — | Not needed |

## 2. External dependencies to retain or replace

| Dependency | Role | Retain? | Notes |
|---|---|---|---|
| **Cloudbeds** (`hotels.cloudbeds.com/en/reservation/tLFmXv`) | Booking engine, rates, availability, payment | **Retain (critical)** | Only conversion path. `?currency=idr` is in every link. Cloudbeds also holds the address, check-in/out, amenities and room inventory. Booking flow not tested. |
| TripAdvisor (`tripadvisor.com.au …d8527654…`) | Social proof link | Retain as a link | Logo image A042 is a third-party trademark (`TripAdvisor-Logo.wine.png`); use per TripAdvisor brand rules or use a text link |
| YouTube video `YdK8tGh6iD0` | Blog post media | Retain as an embed or link | — |
| Wix CDN (`static.wixstatic.com`) | Current home of all images | **Replace** | Download originals once, then optimise and self-host in `/public` (see `09`) |
| Wix Blog, Pro Gallery, Velo, lightbox | Platform features | Replace | Re-implement as simple React components |
| Google avatars (`lh3.googleusercontent.com`) | Comment avatars | Drop | — |

## 3. Things the Phase 2 frontend cannot reproduce without decisions

1. **Live availability or prices**: they live in Cloudbeds. A frontend mock-up must not imply real-time prices.
2. **Reviews filter backend**: Velo/Wix data. Phase 2 can use static JSON.
3. **Policy, terms and privacy content**: doesn't exist yet.
4. **Enquiry handling** for retreats and activities: currently "email us" only.
5. **Popup scheduling** (which offer is current): needs owner input; ideally driven by a dated data file.
