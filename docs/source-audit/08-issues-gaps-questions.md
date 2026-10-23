# 08 — Issues, Gaps, Risks & Open Questions

Nothing here has been "fixed" in the content files. Everything in `content/` is verbatim. Corrections need the business owner's confirmation.

## 1. Factual conflicts (need an owner decision)

| # | Issue | Evidence |
|---|---|---|
| F1 | **Three different offer statements.** Popup: Pay 1 Stay 2 (1 Nov–23 Dec 2026), Pay 2 Stay 3 (Low Season 8 Jan–31 Mar), Pay 3 Stay 4 (Mid Season 1 Sept–31 Oct). Promo strip: "Stay 4 Nights for the Price of 3, or 7 Nights for the Price of 5!" (a different mechanic). Rate table: Mid Season also runs 1 Apr–30 Jun (the popup omits this). | `content/shared.json`, `content/rate-periods.json` |
| F2 | **Rate-table year errors:** row label "European High Season 2027" is dated **Jul 1–Aug 31, 2028**; "Low Season" runs **November 1, 2027 – December 19, 2028** (a 13-month span; probably Nov 1, 2028); Low Season 2028 starts Jan **10** while other years start Jan 8; Christmas 2027 ends Jan **9**, 2028 while other years end Jan 7. | /rate-periods |
| F3 | Nov 1–Dec 23 is "Super Special — Pay 1 Stay 2" in 2026 but "Low Season — Pay 2 Stay 3" in 2027. Intentional or not? | /rate-periods |
| F4 | Past periods are still listed (Jul–Oct 2026 as of the audit date 2026-10-21). | /rate-periods |
| F5 | **Dish counts conflict:** Home "A selection of 5 to 6 menu items is available each day"; Lunch & Dinner "approximately 10-14 dishes"; the menu lists 51 dishes. | /, /lunch-and-dinner |
| F6 | The restaurant says "All our prices already include 6% service charge and 10% government tax", but **no prices are published** on either menu. | /restaurant |
| F7 | "Three gorgeous free-standing bungalows" (home, meta description) vs **four** bookable rooms. Butterfly and Dragonfly are two halves of Kambing house, so they are not free-standing. One review says "5 very well appointed bungalows". | /, /rooms/* |
| F8 | Rooms intro: "Each of our unique rooms and cottages can accommodate … parties of 2 to larger parties of 5" — but Butterfly and Frog sleep 2-3. | /rooms-and-accommodations |
| F9 | Frog Bungalow "Sleeps 2-3", but its description offers only a King or 2 singles and says "most suitable for couples, 2 friends or a single traveller". How is a 3rd guest accommodated? | /rooms/frog-bungalow |
| F10 | Single-bed sizes differ: Butterfly 90×180, Dragonfly settee 90×180, Frog 90×200, Duck 100×200. Plausible, but confirm. | rooms |
| F11 | Hosts' name spelled **Camron** (Cloudbeds, blog author, some reviews) and **Cameron** (other reviews). Confirm the preferred public spelling. Reviews stay verbatim. | reviews, Cloudbeds |
| F12 | Activity prices: "First 2 guests: **750,000**" and "**650,000**" lack "Rp"; the child price in the combined package (Rp187,000) equals the cooking-class additional-adult price; combined-package pricing is duplicated under two activities. | /activities |
| F13 | "Gentle walks and more extensive treks can be arranged for the following prices:" is followed only by a per-guide price. The Mount Batu Karu trek is "a completely separate activity" with no price. | /activities |
| F14 | Yoga: a "local instructor … in our neighbouring village" vs the on-site shala; the private-class price is per hour, shareable by up to 4. | /activities |
| F15 | Check-in/out times, address and coordinates appear **only on Cloudbeds**. Confirm before publishing. | `content/shared.json` |

## 2. Placeholder / duplicated content

| # | Issue | Where |
|---|---|---|
| D1 | "Our eco retreat in Bali offers three gorgeous free-standing bungalows … make sure you don't have to." appears **3× on the home page** (Relax section, Teak Bungalows, **Our Friendly Staff**) and in the meta description. The staff section has no staff copy at all. | / |
| D2 | Retreats "Rooms & Accommodations" repeats the "What We Do" paragraphs verbatim; "Experiences & Activities" repeats the "Our Kitchen" paragraphs verbatim. These are template placeholders, and real copy is missing. | /retreats |
| D3 | Breakfast: "Jamu …" description shown twice; "Loose Leaf Tea — Ginger, Peppermint, Lemongrass" duplicates "Fresh Herb Tea"; "Loose Leaf Black Tea" appears under both Coffee/Tea and Main Breakfast. | /breakfast |
| D4 | Breakfast category heading reads "**(dairy) Indonesian Breakfast**" — "(dairy)" belongs to the previous note "Plain Yogurt (dairy)". | /breakfast |
| D5 | Spice Islands Granola description is truncated ("…sunflower seeds, oats and"). | /breakfast |
| D6 | Amenity bullet split mid-sentence: "2 standard and 2 super king luxury hotel pillows for the King bed and 1 standard and 1 super." / "King pillow for every single bed as needed." | room pages |
| D7 | Reviews: the same 7 testimonials appear on Home (slider), /reviews and the room pages. Fine for the redesign, but avoid repeating them on one screen. | — |
| D8 | "New Rice Planting" post has **no body text** (image + hashtags only). | blog |

## 3. Spelling / grammar observed (for owner review — do not silently correct)

Site copy (not reviews): "a **peak** into" (peek) · "**Cappucino**" · "**Twinnings** Tea" (Twinings — also in the meta description) · "the **sent** of clove" (scent) · "**seperate**" · "one of two rooms that **that** make up" · "herbal medicine **know was** Jamu" (known as) · "yoga **shall** is available" (shala) · "If you looking" (×2, Retreats) · "that **you** guests have" (your) · "we offer a **breath** of activities" (breadth) · "If you want to discover Real Bali, **that** makes sure you sign up" · "Canang Sari (**pronounce** …)" · "Duck Cottage is stand-alone family bungalow" · "**Indepence** Day" · "**competetion**" · "fought **to won**" · "There **was** activities" · "source **which of** water" · "premade **deorations**" · "**with stand** the rigours" · "The boys **brining** in" · "**far to** valuable" · alt texts "Bali **Accomodations**", "**rise** bowl area", "Bali jungle retreat and **gettaway**".

Reviews contain their own typos (e.g. "junglel", "lot's", "accomodation"). These are guest quotes: **keep them verbatim**.

## 4. Broken / missing functionality

| # | Issue |
|---|---|
| B1 | Footer "Booking / Cancellation Policy" and mobile-menu "View Booking & Cancellation Policy" go nowhere, and the policy text doesn't exist. |
| B2 | "Site Terms \| Privacy Policy" are not links; the pages don't exist. |
| B3 | Footer "Host a Retreat" isn't linked. |
| B4 | The reviews room filter did not filter in automated testing (see `06`). |
| B5 | Room gallery has no fullscreen/lightbox view. |
| B6 | Phone isn't a `tel:` link; the Retreats "Email us" isn't a `mailto:`. |
| B7 | No Book CTA in the mobile header. |
| B8 | `/blank` soft-404 (200 status); `/home` duplicate of `/`. |
| B9 | Book links are identical for all rooms (no room or date deep-link). |

## 5. Gaps (content that doesn't exist on the site)

Address and map · directions / airport transfer info (a review mentions "one and a half hour to two drive from the airport or an hour from Canggu") · check-in/out (only on Cloudbeds) · booking & cancellation policy · terms · privacy policy · contact page / enquiry route · social media profiles · staff copy · Retreats copy (2 sections), retreat capacity and packages · accessibility notes (hillside property; a review mentions "130 steps from bungalow to the restaurant" and "a good number of stairs") · real favicon / app icons · OG share image for main pages · current room rates (Cloudbeds only).

## 6. SEO / accessibility risks

- No H1 on the home page or room pages; heading levels misused (prices and menu items as H2, menu categories as H1).
- Missing meta descriptions on /retreats, /rate-periods, /blog, room pages and posts. No og:image on main pages. Generic Wix favicon.
- JSON-LD is only `WebSite`, `BlogPosting` and `ImageObject` — no `LodgingBusiness`/`Hotel` schema (Cloudbeds has one with the address).
- Alt text is often missing or a filename ("DSC_0986", "026B8F1E-….jpeg", "image").
- Contrast: yellow #FFF801 and white text over busy photos (popup); white nav over light textures under the fixed header.
- Script font (Dancing Script) for functional labels; italic justified review text.
- The auto-opening modal on every first visit.

## 7. Spam & reputational risk (live site — outside the Phase 1 scope to change)

**18 spam comments** across the 4 blog posts contain outbound links to unrelated sites: essay-writing services, gambling ("Goa Game"), day trading, insurance, an Arabic spell-casting/"love spell" site, an adult site ("Berlinintim"), shoe resellers, an online school, and others. The audit recommends the owner **delete these comments and disable or moderate comments on the live Wix site now**, regardless of the rebuild. Phase 2 must not migrate comments.

## 8. Asset & performance risks

- ≈253 MB of photo originals. Twelve files exceed 5 MB: A012 32.1 MB (pineapple PNG), A077 28.7 MB (PNG), A049 23.4 MB (waterfall JPEG 6000×4000), A050 15.4 MB, A027 14.2 MB, A003 13.9 MB, A005 13.0 MB, A111 10.6 MB, A112 7.0 MB, A113 6.6 MB, A007 5.4 MB, A089 5.3 MB.
- Photos stored as PNG: A010 ("7.png"), A012, A077.
- MPO (multi-picture phone JPEGs, re-encode): A007, A017–A020, A044, A047, A057–A059, A061–A063, A081.
- 44 photos have originals ≤900px wide (mostly 800×531 — e.g. all four room-card images A037–A040, the testimonial background A041 shown full-width, staff photos A043–A048, many room gallery images A103–A110, A114–A116). They will look soft on large or retina displays: fine for cards, weak for full-bleed heroes. The full list is in the manifest (`original_width`).
- 77 of 99 photos have no meaningful alt text on the live site.
- Ten unrendered `8bb438_…` images in the room page source are probably Wix template placeholders — don't use them without confirmation (A117–A126).
- TripAdvisor logo (A042) is a third-party mark.

## 9. Questions for the business owner

1. Which offer(s) are current, and what are the exact rules (popup vs promo strip vs table)? Should the popup stay?
2. Please confirm or correct the rate-table dates flagged in F2/F3, and whether past periods can be removed.
3. Confirm the address, map pin, check-in/out times and transfer/directions info for publishing.
4. Provide the booking & cancellation policy, terms and privacy policy text (or confirm they should be omitted).
5. Preferred enquiry channel for retreats and activities: email, WhatsApp, phone? Is the phone number also WhatsApp?
6. Copy for "Our Friendly Staff" and for the Retreats "Rooms & Accommodations" and "Experiences & Activities" sections. Any retreat capacity or package info?
7. Daily dish count wording (5–6 vs 10–14) and whether menu prices should be shown.
8. "Camron" or "Cameron" for public copy?
9. Frog Bungalow third-guest arrangement (Sleeps 2-3)?
10. Are there social media profiles to link?
11. Are higher-resolution originals available for the 800px room photos? Is there a dark version of the logo and a square icon for the favicon?
12. Keep the blog? If yes, which posts (the 2016 posts, and "New Rice Planting" with no text)?
13. Should the TripAdvisor logo be shown, or a text link only?
14. Do Cloudbeds room-specific links exist (for per-room Book buttons)?
