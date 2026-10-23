# 02 — Page & Route Inventory

All routes are under `https://www.balilush.com`. Section order is as rendered at 1440px desktop. Asset IDs (`A###`) refer to `04-assets-manifest.csv`. Verbatim text for each page is in `content/pages/*.json`, and structured data in `content/*.json`.

## 1. Route table

| # | Route | Title tag | Type | Status | In sitemap | Phase 2 recommendation |
|---|---|---|---|---|---|---|
| 1 | `/` | Bali Lush \| Authentic Bali Retreat \| Rooms & Cabins | Home | 200 | yes | **Implement** |
| 2 | `/rooms-and-accommodations` | Rooms & Accommodations \| Bali Lush | Listing | 200 | yes | **Implement** (consider `/rooms` alias) |
| 3 | `/rooms/butterfly-room` | Butterfly Room \| Bali Lush | Detail (Wix dynamic, collection "rooms") | 200 | yes | **Implement** |
| 4 | `/rooms/dragonfly-room` | Dragonfly Room \| Bali Lush | Detail | 200 | yes | **Implement** |
| 5 | `/rooms/frog-bungalow` | Frog Bungalow \| Bali Lush | Detail | 200 | yes | **Implement** |
| 6 | `/rooms/duck-cottage` | Duck Cottage \| Bali Lush | Detail | 200 | yes | **Implement** |
| 7 | `/rate-periods` | Seasonal Rates \| Bali Lush | Secondary (offers) | 200 | yes | **Implement** after the business confirms dates (see `08`) |
| 8 | `/restaurant` | Restaurant \| Bali Lush | Main | 200 | yes | **Implement** |
| 9 | `/breakfast` | Breakfast \| Menu \| Bali Lush | Secondary (menu) | 200 | yes | **Implement** (or consolidate with lunch/dinner as tabs on one menu page, keeping both URLs) |
| 10 | `/lunch-and-dinner` | Lunch & Dinner \| Menu \| Bali Lush | Secondary (menu) | 200 | yes | **Implement** (as above) |
| 11 | `/activities` | Activities & Adventures \| Bali Lush | Main | 200 | yes | **Implement** |
| 12 | `/retreats` | Host a Retreat \| Bali Lush | Main | 200 | yes | **Implement** — needs real copy for two sections |
| 13 | `/reviews` | Guest Reviews & Testimonials \| Bali Lush | Main | 200 | yes | **Implement** |
| 14 | `/blog` | Blog \| Bali Lush | Listing (Wix Blog) | 200 | yes | **Low priority** — simple listing, ≤10 images |
| 15 | `/post/it-s-that-magical-time-of-the-year-pineapple-season` | It's that Magical time of the year - Pineapple Season | Blog post (2024-12-19) | 200 | yes | Implement as a simple post (drop comments) |
| 16 | `/post/2016/09/01/getting-the-bali-lush-penjor-ready-for-galungan` | Getting the Bali Lush Penjor ready for Galungan | Blog post (2016, updated 2022) | 200 | yes | Implement as simple post |
| 17 | `/post/2016/08/21/new-rice-planting` | New Rice Planting | Blog post (2016, image + hashtags only) | 200 | yes | Implement or review (almost no text) |
| 18 | `/post/2016/08/16/independence-day-celebrations-bali-style` | Independence Day Celebrations Bali Style | Blog post (2016) | 200 | yes | Implement as simple post (includes a YouTube video) |
| — | `/home` | (same as `/`) | Duplicate | 200 | no | **Legacy** → 301 to `/` |
| — | `/blank` | Home \| Bali Lush (shows 404 body) | Old blank page | 200 (soft-404) | no | **Legacy** → 301 to `/` or return 410 |
| — | `/blog/hashtags/*` (5) | `#Tag` | Tag archives (noindex) | 200 | no | **Do not implement**; 301 to `/blog` |
| — | `/blog-feed.xml` | RSS | Utility | advertised | no | Optional — review later |
| — | Cloudbeds `hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr` | Bali Lush - Bali, Indonesia - Book Now | External booking | 200 | — | **Keep as the booking link** |

**Not found (404):** about, about-us, contact, contact-us, gallery, faq(s), book-now, booking, book-online, terms, terms-and-conditions, privacy, privacy-policy, booking-policy, cancellation-policy, rooms, rooms-1, rates, specials, copy-of-home, events, shop, account, services, retreat, yoga, kitchen, menu, dinner, lunch, reviews-1, testimonials, location, map, getting-here, our-story, staff, team, blog/categories, blog/page/2, post, rooms/kambing-house, _api.

### Classification

- **Main navigation:** Rooms, Reviews, Restaurant (dropdown: Breakfast, Lunch & Dinner), Activities, Retreats, Blog, plus the external BOOK YOUR STAY CTA.
- **Secondary:** /rate-periods (reachable only from the popup and the promo strip), /breakfast, /lunch-and-dinner.
- **Detail:** 4 room pages.
- **Listing / archive:** /rooms-and-accommodations, /blog, hashtag archives.
- **Editorial:** 4 posts.
- **Contact / enquiry:** none (contact is only the footer phone and email; Retreats says "Email us" without a link).
- **Booking / transaction:** external Cloudbeds only.
- **Utility:** sitemap.xml, robots.txt, blog-feed.xml.
- **Legacy / duplicate:** /home, /blank.

---

## 2. Shared components (every page)

| Component | Description |
|---|---|
| **Header** | Transparent, overlaid on each page's hero image, **fixed** (stays at top while scrolling down and up; its only background is a black-to-transparent gradient, so it overlaps light sections and their headings — Verified). Logo left (A001, 220×72 displayed). Nav: Rooms · Reviews · Restaurant ▾ · Activities · Retreats · Blog in Wix Madefor Text 18px/500, white, hover #B3CE6F. Right: "BOOK YOUR STAY" button (#82B42D at 85% opacity, white 13px uppercase text, radius ≈5px). Height 198px desktop, 160px tablet, 140px mobile. |
| **Restaurant dropdown** | Hover reveals Breakfast and Lunch & Dinner (Verified). |
| **Mobile / tablet nav** | Hamburger → full-height right-side dark drawer over a dimmed page: Rooms, Reviews, Restaurant (with chevron toggle → Breakfast, Lunch & Dinner), Activities, Retreats, Blog, and a lime "View Booking & Cancellation Policy" item with no destination (Verified). The tablet header also shows the BOOK YOUR STAY button. On mobile the Book button is **not visible in the header** (it lives in the popup and footer only). |
| **Promo lightbox** | "Season Special Pop-up". Auto-opens about 4.5–5.5s after the first page load in a session (desktop and mobile verified); not re-shown on later navigation in the same session. Pool photo background (A011) with a lime border (#B3CE6F 3px). Text and links are in `content/shared.json`. Closes via the X ("Back to site"). |
| **Footer** | Black. Left: 2-column nav (Home, Host a Retreat*, Lush Blog / Rooms, Activities, Kitchen/Restaurant) in 20.5px white. Right: logo, green "Book Now / Check Availability" button, +62 823 2260 9344 (plain text, not a `tel:` link), info@balilush.com (`mailto:`), "Booking / Cancellation Policy" in #B3CE6F (dead link). Bottom bar: "© 2026 Bali Lush" and "Site Terms \| Privacy Policy" (unlinked) in #6E6E6E 14px. Height 422px desktop. *not linked |
| **Hero banner pattern** | Interior pages use a full-width 451px-tall photo with a dark overlay, an H1 in Assistant 52px/700 white, and an optional intro line. |
| **Room card** | Photo card with the room name in Dancing Script (white, top-left) and "Sleeps / 2-3 or Up to 5" bottom-left; the whole card links to the room page. Used on Home, the Rooms listing and "Explore Other Rooms". |
| **Promo strip** | Green rice-field texture strip (A053): "Extended Stay Off-Peak Season Special / Stay 4 Nights for the Price of 3, or 7 Nights for the Price of 5!" + "Only available when you book directly through Bali Lush" + black "LEARN MORE" button (re-opens the lightbox). Appears on Home and Rooms listing. |

---

## 3. Page-by-page inventory

### 3.1 Home — `/`

- **Purpose:** brand introduction, room overview, social proof, cross-links to kitchen, activities and blog; drive bookings.
- **Sections (in order):**
  1. **Hero** (900px, full viewport): photo A022 (teak house + garden + rice terraces); H2 "Experience the Authentic Charm of Bali Lush" (Assistant 62px), sub "A Tranquil Sanctuary in Bali's Rice Bowl". No CTA in the hero itself. *No H1 on the home page.*
  2. **Intro paragraph** (white, full width): "Bali Lush is a cute little boutique resort…"
  3. **"Relax and Rejuvenate Amidst Lush Landscapes and Village Life"**: 2 columns — text left (4 paragraphs incl. room amenities summary, "also available to host your own retreat"), photo right (A023).
  4. **"Unique Teak Bungalows in Bali's Stunning Valleys"**: grey texture background (A051); text left, horizontally scrolling **Pro Gallery slider** of 14 photos right (A023–A036).
  5. **"COTTAGES & BUNGALOWS"**: Javanese motif texture band (A052) with heading, "View Availability & Book your Stay" text and a green BOOK YOUR STAY button; 2×2 room cards (A037–A040).
  6. **Promo strip** (109px).
  7. **"WHAT CLIENTS SAY"**: rice-path photo background (A041 / restaurant photo) over a black panel; testimonial **slider with 7 slides** (← → arrows), each with an italic title and quote; the bar below holds the TripAdvisor logo (A042) and the link "Read More Bali Lush Reviews & Tips on Tripadvisor.com".
  8. **"Our Friendly Staff"**: text left (*body copy is the duplicated eco-retreat paragraph, not about staff*); 3×2 staff photo grid (A043–A048).
  9. **"Lush Kitchen" + "Activities & Things To Do"**: leaf texture background; two text+photo pairs (A049 waterfall, A050 food) with black buttons "View Sample Menu" (→ /lunch-and-dinner) and "Explore Activities" (→ /activities).
  10. **"AROUND THE PROPERTY & BEYOND"**: dark leaf texture (A054/A055); heading and intro left; Wix Blog widget showing all 4 posts (cover, title, excerpt, hashtags).
  11. Footer.
- **Content to retain:** hero line and sub, the intro paragraph, amenities summary, room cards (name + sleeps), reviews, kitchen and activities summaries, blog teasers. Merge the repeated eco-retreat paragraph (it appears 3× on this page).
- **Interactive:** popup, gallery slider, testimonial slider, room card links, CTA buttons, blog cards.
- **Responsive:** mobile stacks all sections into one column; the hero headline is centred-left over the photo; staff grid becomes 2 columns; tablet is a scaled desktop layout.
- **SEO:** good title and meta description; **no og:image**; no H1; JSON-LD `WebSite` only (no `LodgingBusiness`/`Hotel` schema).
- **Risks:** the hero headline is hidden behind the popup on first visit; the gallery's original files include a 14 MB JPEG (A027).
- **Redesign notes:** one clear hero CTA (Book / View rooms), a single concise intro, rooms early, one testimonial treatment, staff section with real staff copy (needs content), and a simpler blog teaser (or drop it).

### 3.2 Rooms listing — `/rooms-and-accommodations`

- **Sections:** Hero (A087, "Cottages & Bungalows" H1 + intro "Explore our rooms and book your stay… parties of 2 to larger parties of 5…") → 2×2 room cards on a motif texture → promo strip → footer.
- **Retain:** intro, 4 room cards (name, sleeps). Add "suitable for" and a teaser line per room from the detail pages.
- **SEO:** meta description present; no og:image.
- **Redesign:** a richer card (photo, name, sleeps, suitable-for, bed setup, link and Book) helps comparison.

### 3.3 Room detail — `/rooms/{butterfly-room | dragonfly-room | frog-bungalow | duck-cottage}`

Identical template (Wix dynamic page):

1. **Title bar** (388px, motif texture A052): room name in Dancing Script 55px; "Suitable for" / "Sleeps" facts; black "Book Your Stay" button (→ Cloudbeds generic link, **not room-specific**).
2. **Photo slider** (1273px tall section, Pro Gallery, 3 visible + "Next Item" arrow). Butterfly A103–A107 (+A037), Dragonfly A086, A108, A109 (+A038), Frog A025, A026, A034, A116 (+A039), Duck A110–A115 (+A040).
3. **Description + Amenities**: left column has description paragraphs (and, for Duck Cottage, a bed-configuration list); right column has an "Amenities:" bulleted list (16–18 items).
4. **"Reviews from This Room..."** + link "> View All Testimonials" (→ /reviews): 4 review cards in 2 columns on a drone photo of Mount Batukaru and the rice paddies (A107).
5. **"Explore Other Rooms"**: 3 room cards.
6. Footer.

| Room | Suitable for | Sleeps | Building / key facts (verbatim summary) |
|---|---|---|---|
| Butterfly Room | Couples | 2-3 | Deluxe king room; half of "Kambing house" (≈100-year-old teak 'Limasan' from Central Java); shares an entrance with Dragonfly; closest to the rice terraces and river, furthest from the restaurant and pool; coolest, least natural light; bathroom picture window over the terraces; Super King four-poster 200×200 + single 90×180; king cannot be split |
| Dragonfly Room | Families | Up to 5 | Deluxe family room; other half of Kambing house; dining table + 5 chairs on its verandah half; "our favorite room" for its floor-to-ceiling windows onto a private rice terrace; Super King four-poster + single/settee 90×180 + bunk set 100×200 |
| Frog Bungalow | Couples | 2-3 | First and "most popular" guest room; stand-alone antique teak rice barn; elevated garden terrace (roses, gardenias, tuberose); open-air bathroom with partial roof; King 180×200 with net **or** 2 singles 90×200 |
| Duck Cottage | Families | Up to 5 | Stand-alone family bungalow, largest room, open-plan, private open-air bathroom, own entrance and balcony lined with clove trees; configurations: 2 Super Kings / 1 Super King + 2 singles / 4 singles; day bed for a 5th (child) |

- **SEO:** og:image set (room card photo); **no meta description**; no H1 (the room name is an H2); JSON-LD ImageObject only.
- **Risks:** Duck gallery originals of 6.6–10.6 MB (A111–A113); unrendered placeholder images in the HTML source (A117–A126).
- **Redesign:** keep the room facts at the top with a strong Book CTA; gallery with a lightbox; amenities in a compact multi-column list; bed configurations as structured data; 2–4 reviews; links to the other rooms.

### 3.4 Seasonal rates — `/rate-periods`

- **Sections:** Hero (A031, "SEASONAL RATE PERIODS") → colour-coded table (header row black; rows coloured blue = peak, green = mid, yellow = low, orange = super special) with columns SEASONAL RATE PERIOD / FROM / TILL / FREE NIGHTS covering Jul 2026 – Jun 2029 (18 rows, `content/rate-periods.json`) → footer.
- **Note:** no nightly prices anywhere on the site. The table contains date and label errors (see `08`).
- **SEO:** no meta description.
- **Redesign:** a readable responsive table or season cards, the current season highlighted, past periods hidden, and the offer rules stated once.

### 3.5 Restaurant — `/restaurant`

- **Sections:** Hero (A004; "Lush Kitchen & Restaurant", "Open from 8AM until 9PM") → "What Makes Our Food Special" (sourdough starter "Peggy" since 2020; gluten-free vegan sandwich loaf note in magenta) → "Curated Recipes" (recipes shared via WhatsApp on request) + grey panel "We also make in-house for breakfast:" (7 items in green #82B42D: muesli, crumpets, granola, calamansi marmalade, banana bread, mulberry pies and muffins, coconut yogurt) + green buttons BREAKFAST MENU / LUNCH / DINNER MENU + note "All our prices already include 6% service charge and 10% government tax." → "The Restaurant Space" (Joglo rebuilt on site in 2014) → photo collage of 5 (A041, A081, A082, A079, A080) → footer.
- **Note:** the tax note mentions "prices", but **no prices are shown** on either menu page.
- **Redesign:** a strong food story page with direct links to both menus.

### 3.6 Breakfast — `/breakfast`

- **Sections:** Hero (A017, "Breakfast Menu") → dark translucent panel: "Selamat Pagi / Silakan Makan Sarapan", "Good Morning - Enjoy Your Breakfast", "Please note our staff will take your order the night before.", "All Rooms Include Breakfast with the Following:" (1× Fruit Plate or Juice, 1× Premium Coffee or Pot Tea, 1× Main or Indonesian, 1× Bakery) and "Also Included:" (Bali Coffee, Twinnings Tea, Water; Jamu description) → menu cards on a tan woven texture (A021): Premium Coffee or Pot of Tea (8) · photo strip of 4 (A018, A019, A017, A020) · Main Breakfast (8) · (dairy) Indonesian Breakfast (5) · Bakery (5) + gluten-free bread ingredients → footer.
- Structured items: `content/menus.json`.
- **Redesign:** a clear "included with every stay" box plus a scannable menu with dietary tags (V, VG, GF).

### 3.7 Lunch & Dinner — `/lunch-and-dinner`

- **Sections:** Hero (A004, "Lunch & Dinner", "Open from 8AM until 9PM" — *the hours line is not shown on mobile*) → "How it Works Every Day" (order at breakfast; ~10–14 dishes daily) → dark header card "Lunch / Dinner Menu / Please note our staff will take your order in the morning." → categories in Dancing Script: Starters (8), [photo strip 4], Salads (9), [photo strip 4], Soups (5), Pasta (5), Stir-Fry (4), Curries (4 + notes), Indonesian (8 + note), Burgers & Sandwiches (4) → footer. Images A056–A063.
- **Note:** this page lists 51 dishes, while Home says "A selection of 5 to 6 menu items is available each day" and this page says "approximately 10-14 dishes". This is an inconsistency.
- **Redesign:** category navigation (jump links or tabs), compact two-column item list, and fewer decorative photo strips.

### 3.8 Activities — `/activities`

- **Sections:** Hero (A002 waterfall; "Activities & Things to Do" + intro) → 8 alternating cards (text left, photo right, white cards on a grey background), each with a price line in magenta: Walks & Treks (A003), Cooking Classes (A004), Morning Market Visits (A005), Guided Motorcycle Tours (A006), Jamu Making (A007), Make Your Own Offering (A008), Visit a Local School (A009, free; donate supplies), Yoga & Yoga Shala (A010) → footer.
- **Prices (IDR, verbatim):** `content/activities.json`.
- **Note:** activities can't be booked online; there is no enquiry CTA on the page.
- **Redesign:** activity cards with duration, price and minimums, plus an enquiry CTA (email/WhatsApp — the channel must be confirmed).

### 3.9 Retreats — `/retreats`

- **Sections:** Hero (A083, "Host a Retreat" + intro) → "What We Do" (text + photo A084) → "Rooms & Accommodations" (4-photo grid A085, A024, A086, A087 + **text duplicated from "What We Do"**) → "Our Kitchen" (text + food photo A056, "Learn More" → /restaurant) → "The Yoga Shala" (photo A088 + text) → "Experiences & Activities" (**text duplicated from "Our Kitchen"** + 4 photos A002, A089, A090, A091; "View Activities" → /activities) → masonry gallery of 15 retreat photos (A092–A102, A088, A084, A073) → footer.
- **Missing:** an actual contact method ("Email us to open a discussion…" has no link), capacity, pricing and packages.
- **Redesign:** rewrite the duplicated blocks (copy must come from the business — **do not invent**), add a clear enquiry CTA (mailto info@balilush.com), and a curated gallery of at most 8–10 photos.

### 3.10 Reviews — `/reviews`

- **Sections:** Hero (A011 pool photo — the same image as the popup background; "What Guests are Saying" + intro; **"Filter reviews by Room:"** `<select>` top-right) → 20 review cards (room name link in magenta, quote in italic, name left, location right) on a grey background → footer.
- **Data:** `content/reviews.json` (room, name, location, text, home slider title).
- **Interactive:** the room filter (Velo) — see `06`.
- **Redesign:** a cleaner card grid with a working filter, a "Read more" toggle for long reviews, and the TripAdvisor link (rating and count unverified — do not invent).

### 3.11 Blog — `/blog` and 4 posts

- **Listing:** Wix Blog "All Posts" tab, 4 cards in a row (cover, author "camroncarlonhenry", date, read time, title, excerpt, views, comments, like). No categories, search or pagination.
- **Posts:** author line, title (Madefor Display 40px), body, image galleries (Independence: 5-image slideshow "Tug o War: Adi & Village Police 1–5" + YouTube video; Penjor: 3-image gallery; Pineapple: cover + 1 captioned image + BBC link; Rice planting: 1 image + hashtags only), share bar (Facebook, X, LinkedIn, copy link), views/comments/like, "Recent Posts" (3 cards), and comments (all spam).
- **Assets:** covers A012, A014–A016; post images A064–A067, A073–A074, A077.
- **Redesign:** low priority. A simple listing plus a post template with at most 10 images in the initial presentation; no comments.

---

## 4. Navigation map (verified)

```
Header:  [Logo→/]  Rooms→/rooms-and-accommodations  Reviews→/reviews  Restaurant→/restaurant ▾(Breakfast→/breakfast, Lunch & Dinner→/lunch-and-dinner)
         Activities→/activities  Retreats→/retreats  Blog→/blog   [BOOK YOUR STAY→Cloudbeds]
Popup:   book directly→Cloudbeds · VIEW ALL SEASONAL SPECIALS→/rate-periods · BOOK YOUR STAY→Cloudbeds
Footer:  Home→/  Host a Retreat(✗)  Lush Blog→/blog  Rooms→/rooms-and-accommodations  Activities→/activities  Kitchen/Restaurant→/restaurant
         Book Now / Check Availability→Cloudbeds  info@balilush.com→mailto  Booking / Cancellation Policy(✗)  Site Terms | Privacy Policy(✗)
In-page: Home "View Sample Menu"→/lunch-and-dinner · "Explore Activities"→/activities · room cards→/rooms/* · TripAdvisor (external)
         Room pages "> View All Testimonials"→/reviews · Restaurant buttons→/breakfast,/lunch-and-dinner · Retreats "Learn More"→/restaurant, "View Activities"→/activities
         Reviews room names→/rooms/*
```
