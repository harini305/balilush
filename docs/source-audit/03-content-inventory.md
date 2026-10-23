# 03 — Content Inventory & Preservation Reference

Verbatim source text is stored as structured files so Phase 2 doesn't need to re-research the live site:

| File | Contents |
|---|---|
| `content/pages/*.json` (18 files) | Every visible text block per page in visual order, with tag, section id, y-position, font, size, weight, colour and link target; plus title, meta description, OG tags, canonical and section order. Header, footer, popup and blog comments excluded. |
| `content/shared.json` | Header nav, mobile-menu extra, logo, footer (with dead-link notes), promo lightbox text, promo strip, and **business facts found only on Cloudbeds** (address, coordinates, check-in/out). |
| `content/rooms.json` | 4 rooms: name, suitable for, sleeps, description paragraphs, bed configurations, amenities, OG image. |
| `content/rate-periods.json` | 18 rate-period rows (verbatim, errors included) and row colour key. |
| `content/menus.json` | Breakfast (intro, included items, 4 categories) and lunch/dinner (intro, 8 categories, 51 dishes) plus the restaurant's in-house list. |
| `content/activities.json` | 8 activities: paragraphs and verbatim IDR price lines. |
| `content/reviews.json` | 20 testimonials: room, reviewer, location, text, and the home-slider title where used. |

All text keeps the original spelling and punctuation. Corrections are listed separately in `08-issues-gaps-questions.md` and need the owner's approval before use.

---

## 1. Business & contact facts

| Fact | Value | Source | Status |
|---|---|---|---|
| Business name | Bali Lush | all pages | Verified |
| Phone | +62 823 2260 9344 | footer (all pages), plain text | Verified (as published) |
| Email | info@balilush.com | footer `mailto:` | Verified (as published) |
| Booking engine | https://hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr | every Book CTA | Verified (loads) |
| TripAdvisor | https://www.tripadvisor.com.au/Hotel_Review-g608496-d8527654-Reviews-Bali_Lush-Tabanan_Bali.html | home testimonials | Link present; page not loaded (403 to bots) |
| Restaurant hours | "Open from 8AM until 9PM" | /restaurant, /lunch-and-dinner heroes | Verified |
| Address | Pupuan Sawah, Selemadeg, Tabanan Regency, Bali, Indonesia 82162 | **Cloudbeds only** (not on balilush.com) | External — confirm with owner |
| Coordinates | -8.44633007, 115.05549622 | Cloudbeds JSON-LD | External — confirm |
| Check-in / check-out | 2:00 PM / 12:00 PM | Cloudbeds | External — confirm |
| Village | Manikyang (5 banjars) | Independence Day post; Cloudbeds description | Observed |
| Region claims | "Rice Bowl of Bali", Tabanan, near Mount Batukaru | multiple pages | Verified (as published) |
| Hosts / owners | David & Camron (also spelled "Cameron") Henry; Australian | reviews, blog author "camroncarlonhenry", Cloudbeds contact "Camron Henry" | Observed — spelling to confirm |
| Property | "two acres", vegetable gardens, fruit orchard, coconut palms, 600+ pineapples, private well (water "through 60M of volcanic rock", safe to drink from the tap), heart-shaped pool, teak yoga shala linked to the pool by an elevated bridge, restaurant in a Javanese Joglo rebuilt on site in 2014 | home, rooms, retreats, restaurant, blog | Verified (as published) |
| Currency | IDR (booking link `currency=idr`; activity prices in Rp) | — | Verified |
| Policies | Booking/cancellation, terms, privacy | **not published anywhere** | Missing |

## 2. Navigation and CTA labels (verbatim)

- Header: `Rooms`, `Reviews`, `Restaurant` (→ `Breakfast`, `Lunch & Dinner`), `Activities`, `Retreats`, `Blog`, `BOOK YOUR STAY`
- Mobile menu extra: `View Booking & Cancellation Policy`
- Footer: `Home`, `Host a Retreat`, `Lush Blog`, `Rooms`, `Activities`, `Kitchen/Restaurant`, `Book Now / Check Availability`, `Booking / Cancellation Policy`, `Site Terms | Privacy Policy`, `© 2026 Bali Lush`
- In-page: `VIEW ALL SEASONAL SPECIALS`, `View Availability & Book your Stay`, `LEARN MORE`, `Read More Bali Lush Reviews & Tips on Tripadvisor.com`, `View Sample Menu`, `Explore Activities`, `Book Your Stay`, `> View All Testimonials`, `Explore Other Rooms`, `BREAKFAST MENU`, `LUNCH / DINNER MENU`, `Learn More`, `View Activities`, `Filter reviews by Room:` (`Select a Room`, `All`, room names)

Note the inconsistent naming of the same destinations ("Restaurant" / "Kitchen/Restaurant" / "Lush Kitchen", "Retreats" / "Host a Retreat", "Blog" / "Lush Blog"). Phase 2 should pick one label per destination.

## 3. Offers and promotions (verbatim)

**Popup (site-wide):** "Extended Stay / Off-Peak Super Special" · "Pay 1 Stay 2 - Every 2nd Night Free" · "Valid for stays 1st Nov until 23rd Dec 2026" · "Other Seasonal Specials:" · "Pay 2 Stay 3 - Every 3rd Night Free" · "Valid for stays during Low Season - 8th Jan until 31st March" · "Pay 3 Stay 4 - Every 4th Night Free" · "Valid for stays during Mid Season - 1st Sept until 31st October" · "Only available when you book directly through Bali Lush".

**Promo strip (Home, Rooms):** "Extended Stay Off-Peak Season Special" · "Stay 4 Nights for the Price of 3, or 7 Nights for the Price of 5!" · "Only available when you book directly through Bali Lush".

**Rate table:** `content/rate-periods.json` (Jul 2026 – Jun 2029).

⚠ These three sources disagree (see `08`). Only the business can say which is current.

## 4. Rooms (summary — full text in `content/rooms.json`)

| Room | Suitable for | Sleeps | Bed setup (verbatim summary) |
|---|---|---|---|
| Butterfly Room | Couples | 2-3 | Super King four poster canopy bed 200 x 200 cm with mosquito net and 1 single bed 90 cm x 180 cm |
| Dragonfly Room | Families | Up to 5 | Super King four poster canopy bed 200 x 200 cm with mosquito net; 1 single bed/settee 90 cm x 180 cm and 1 set bunk beds 100 x 200 cm |
| Frog Bungalow | Couples | 2-3 | King size bed 180 x 200 cm with canopy mosquito net or 2 single beds 90 x 200 cm (no mosquito net) |
| Duck Cottage | Families | Up to 5 | 2 Super King beds 200 x 200 cm / 1 Super King + 2 single beds 100 x 200 cm / 4 single beds 100 x 200 cm; day bed → 5th guest bed for an extra child |

Common amenities (all rooms, minor wording variations): air conditioning and ceiling fan(s), block-out curtains, bedside lamps and reading lights, international charging sockets, sateen cotton sheets, summer-weight duvet, luxury hotel pillows, guest soaps by Bali Asli, pool towel + bath towel + face washer per guest, flat-screen LCD TV, DVD player, selection of DVDs and books, minibar, in-room laptop safe, tea and coffee making facilities, tap water safe to drink (private well, 60M of volcanic rock).

**No room prices are published on the website.** Rates live only in Cloudbeds.

## 5. Activities and prices (verbatim, IDR)

| Activity | Price text as published |
|---|---|
| Walks & Treks | Per guide: first 1-2 hours Rp200,000 (each additional hour Rp100,000) |
| Cooking Classes | First 2 guests: 750,000 (each additional guest: Rp187,000) · Additional child under 12yrs: Rp140,000 · Combined Cooking Class and Morning Market Tour — First 2 guests: Rp1,399,000 (each additional guest: Rp 275,000) · Additional child under 12yrs: Rp187,000 |
| Morning Market Visits | First 2 guests: 650,000 (each additional guest: Rp87,500) · Combined… First 2 guests: Rp1,399,000 (each additional guest: Rp275,000) · Additional child under 12yrs: Rp187,000 |
| Guided Motorcycle Tours | Rp280,000 (most popular tour 25 km, 2–3 hours, waterfall swim stop; helmets supplied) |
| Jamu Making | Rp 140,000 1st guest, Rp 70,000 each additional guest |
| Make Your Own Offering | 2hr Class: Rp200,000 for one guest / private class (each additional guest Rp100,000) |
| Visit a Local School | No charge; bring a donation (pens, pencils, workbooks, beginner English tools) |
| Yoga & Yoga Shala | Yoga Classes are Rp462,000 per hour for private instruction or the price can be shared between up to 4 guests |

Other facts: walks are 1hr shortest and 2hrs most common (including a waterfall swim); self-guided walking with Google Map directions; Mount Batu Karu trek offered as a separate activity (no price); market tour at sunrise to Pasar Badung, minimum 2 adults.

## 6. Food

- **Restaurant:** sourdough baked daily (starter "Peggy", born 2020); vegan gluten-free sandwich loaf; recipes shared via WhatsApp on request; house-made muesli, granola, crumpets, calamansi marmalade, banana bread (Bon Appétit recipe), mulberry pies and muffins (seasonal), coconut yogurt; "All our prices already include 6% service charge and 10% government tax."
- **Breakfast:** included with all rooms (1 fruit plate/juice, 1 premium coffee/pot of tea, 1 main or Indonesian, 1 bakery item, plus unlimited Bali coffee, Twinings tea, water and jamu); ordered the night before. Full menu in `content/menus.json`.
- **Lunch & dinner:** ordered at breakfast; daily-changing selection; 51 dishes listed across 8 categories; curries mild by default ("Pedas" for spicy); protein choices: vegetable, tofu, tempe, chicken, pork.

## 7. Reviews

20 testimonials (`content/reviews.json`) by room: Butterfly 5, Dragonfly 5, Duck 7, Frog 3. Seven are reused in the home slider, with titles. Each room page shows 4. Some reviewers have no location (empty field on the site). Keep the text **verbatim** (it's a guest quote). Phase 2 may truncate with "read more", but must not edit the wording.

## 8. Blog posts

| Post | Date (published / updated) | Author | Body | Images | Other |
|---|---|---|---|---|---|
| It's that Magical time of the year - Pineapple Season | 2024-12-19 (JSON-LD 2024-12-20) | camroncarlonhenry | 1 para + "Quite Interesting:" 3 bullets incl. BBC link | cover A012 (32 MB PNG original), A077 + caption "The boys brining in a record haul for a single day harvest: 27 pineapples." | 71 views, 6 spam comments |
| Getting the Bali Lush Penjor ready for Galungan | 2016-09-01 / updated 2022-10-25 | same | 3 paras + hashtags | 3-image gallery DSC_0986/1007/0990 (A014, A073, A074) | 172 views, 1 spam comment |
| New Rice Planting | 2016-08-21 | same | **hashtags only** (#BaliVillageLife #RiceTerraces) | cover A015 | 94 views, 4 spam comments |
| Independence Day Celebrations Bali Style | 2016-08-16 | same | 3 paras | 5-image slideshow A016, A064–A067; YouTube video `YdK8tGh6iD0` | 128 views, 7 spam comments |

Comment text is **not** preserved (spam with outbound SEO links). See `08`.

## 9. SEO metadata

| Route | Meta description | og:image |
|---|---|---|
| / | yes ("Our eco retreat in Bali offers three gorgeous free-standing bungalows…") | **no** |
| /rooms-and-accommodations | yes | no |
| /rooms/* | **no** | yes (room card photo, 800×531) |
| /rate-periods | **no** | no |
| /restaurant | yes | no |
| /breakfast | yes ("Selamat Pagi… Twinnings Tea, Jamu and more.") | no |
| /lunch-and-dinner | yes | no |
| /activities | yes | no |
| /retreats | **no** | no |
| /reviews | yes | no |
| /blog | **no** | no |
| posts | **no** | yes (cover) |

Every page has a canonical URL and `twitter:card = summary_large_image`. `lang="en"`. The favicon is the **generic Wix favicon** (`static.parastorage.com/client/pfavico.ico`) — there is no brand favicon.

## 10. Content priority for the redesign

| Priority | Content |
|---|---|
| **Essential (must be easy to find)** | Book CTA (Cloudbeds), the 4 rooms with sleeps / suitable-for / beds / amenities / photos, breakfast included, restaurant hours, contact (phone, email), location (confirm address), current offer (once reconciled), reviews |
| **Important** | Restaurant story, both menus, activities with prices, retreat hosting + enquiry route, rate periods, drinkable tap water / eco and community story |
| **Condense** | Home intro (3 near-identical eco-retreat paragraphs → 1), staff section copy, room amenities (shared list + room-specific extras), long reviews (excerpt + expand), menu photo strips |
| **Consolidate** | Popup + promo strip + rate table → one offer component plus the rates page; duplicate Retreats paragraphs; the two menu pages could share one template |
| **Low priority** | Blog (4 posts, 3 from 2016), hashtag archives, view counts and likes, TripAdvisor bar (keep as a link) |
| **Missing / needs the owner** | Address and map, directions/transfer info, check-in/out confirmation, booking and cancellation policy, terms, privacy, staff copy, Retreats copy for 2 sections, retreat capacity and pricing, current offer, real favicon |
