# 05 — Brand Reference (original site)

Values marked **Verified** come from computed CSS in the live DOM (`raw-crawl/*.json`). Values marked **Estimate** were sampled from screenshots or image files.

## 1. Logo

| Item | Detail |
|---|---|
| File | `bali_lush_logo_edited.png` — 532×196 PNG, transparent, 56 KB. Saved at `reference-assets/bali_lush_logo_edited__046d7e_7ff9f91ac8994566901ec78d9a852c4a.png` (A001) |
| Composition | Magenta Balinese ceremonial umbrella (*tedung*) left; hand-script wordmark "Bali lush" in **white with a light-grey outline**; a bright green brush stroke beneath (grass / rice-terrace motif) |
| Logo colours (Estimate, from pixels) | Magenta ≈ `#C00071` / `#B00072`; greens ≈ `#00A914` (bright) and `#005F2B` (shadow); wordmark white `#FFFFFF` |
| Placement | Header top-left (220×72 desktop) on top of dark hero photos; footer right on black (≈150px wide) |
| Variations | **Only the light (white-wordmark) version exists.** There is no dark-on-light version, no icon-only mark and no favicon (the site uses the default Wix favicon). The wordmark is an image, not a font. |
| Phase 2 implication | The logo needs a dark backdrop (hero overlay, dark header or footer). A light header would need a dark variant, which must come from the business — **do not redraw the logo**. A favicon could be cropped from the umbrella only with the owner's approval. |

## 2. Typography (original)

### 2.1 Families detected (loaded webfonts, Verified)

| Family (Wix font id) | Real typeface | Weights loaded | Where used |
|---|---|---|---|
| `assistant-v2`, `assistant-light`, `assistant-semibold` | **Assistant** (Google Fonts, humanist sans) | 300, 400, 500, 600, 700 | H1 page heroes, section H2s, promo and popup headings, rate table, activity titles, room info labels |
| `madefor-text`, `wix-madefor-text-v2` | **Wix Madefor Text** (Wix proprietary sans) | 400, 400i, 500, 600, 600i, 700, 800 | Body copy, nav, buttons, footer, menu item names, review text — the most-used family (≈1,140 text nodes) |
| `madefor-display`, `madefor-display-bold` | **Wix Madefor Display** | 400, 700 | Wix Blog widget (post titles 40px, "All Posts" 36px, home blog cards) |
| `dancingscript-regular` | **Dancing Script** (Google Fonts, script) | 400, 700 | Room names (37–55px), menu category headings (43–50px) |
| `helveticaneuew01-45ligh` etc. | Helvetica Neue | — | Fallback in Wix font stacks only |

That makes **4 visible families plus 1 fallback** on the original site.

### 2.2 Typographic scale (desktop 1440, Verified computed values)

| Role | Family | Size / line-height | Weight | Tracking | Colour |
|---|---|---|---|---|---|
| Home hero headline (H2) | Assistant | 62.1 / 68.3px | 700 | normal | #FFFFFF |
| Home hero sub | Assistant | 30.2 / 39.3px | 400 | normal | #FFFFFF |
| Interior hero H1 | Assistant | 52.0 / 57.2px | 700 | normal | #FFFFFF |
| Section H2 (home, retreats) | Assistant semibold | 36 / 46.8px | 400 (semibold cut) | normal | #000000 |
| Section H2 (restaurant) | Assistant | 36.2 / 39.8px | 700 | normal | #000000 |
| Uppercase section label ("COTTAGES & BUNGALOWS", "WHAT CLIENTS SAY") | Assistant | 31.8 / 41.4px | 700 | 3.18px (≈0.1em) | #000 / #FFF |
| Activity / room page H2 | Assistant | 30.2–31.6px | 500–600 | normal | #000000 |
| Popup title | Assistant | 45.9 / 45.9px | 600 | 4.59px (0.1em) | #FFFFFF |
| Popup offer lines | Assistant | 29.95 / 38.9px | 600 | 0.1em | #FFFFFF; validity lines #FFF801 20.7px |
| Room name | Dancing Script | 37.6px (cards), 43.3px (other-room cards), 55px (detail title) | 400 | normal | #FFF on photo / #000 on texture |
| Menu category | Dancing Script | 43.3–50.1px | 700 | normal | #000000 |
| Menu item name | Wix Madefor Text v2 | 23 / 29.9px | 500 | normal | #000000 |
| Body | Wix Madefor Text | 16–18px / 1.6 (25.6–28.8px) | 400 | normal | #000000 |
| Body (home intro) | Wix Madefor Text | 17 / 27.2px | 400 | normal | #000000 |
| Price / note text | Wix Madefor Text | 18 / 28.8px (14.8px on restaurant tax note) | 400 | normal | #AE095B |
| Nav item | Wix Madefor Text v2 | 18px | 500 | normal | #FFFFFF → hover #B3CE6F |
| Header CTA | Wix Madefor Text | 13 / 20.8px uppercase | 400 | normal | #FFFFFF on #82B42D (85%) |
| Content buttons | Wix Madefor Text | 15.3–18.2px | 400 | normal | #FFFFFF on #000 or #82B42D |
| Testimonial quote (home) | Assistant light | 22.7px italic | 400 | normal | #FFFFFF |
| Review card text (/reviews) | Wix Madefor Text | 17 / 27.2px italic | 400 | normal | #000000 |
| Footer nav | Wix Madefor Text | 20.5 / 51.2px | 400 | normal | #FFFFFF |
| Footer contact | Wix Madefor Text | 18 / 28.8px | 400 | normal | #FFFFFF; policy link #B3CE6F |
| Footer legal | Wix Madefor Text | 14px | 400 | normal | #6E6E6E |
| Blog post title | Wix Madefor Display bold | 40 / 56px | 700 | normal | #000000 |
| Blog body | Wix Madefor Text | 18 / 27px | 400 | normal | #000000 |

**Mobile (390px):** interior H1 29.0px; blog post H1 26px; body 14–17px (most often 14.6px and 15.6px). **Tablet (768px):** interior H1 27.7px; body ≈13–15px — scaled-down desktop.

**Observed issues:** heading styles are inconsistent (Assistant 36px at weight 400 "semibold" in some sections, 700 in others); a script face is used for functional labels (room names, menu categories); letter-spaced uppercase appears only on some section labels; and the body text size drifts between 16, 17 and 18px.

### 2.3 Typography direction for Phase 2 (requirement — final choice deferred)

The redesigned site must use **exactly two font families**: one for headings, and one for body text, navigation, buttons, forms, cards and footer. Dancing Script must **not** be carried over as a third face. Wix Madefor is proprietary to Wix and should not be self-hosted without checking the licence.

Candidate pairs for the Phase 2 decision (not selected here):

- **Assistant is already part of the brand and openly licensed (Google Fonts, OFL).** It works as either the body face or the heading face, which keeps continuity.
- Heading options that suit a warm, natural, boutique tone without being fancy: a readable serif (e.g. Lora, Source Serif 4, Fraunces at low optical settings, Libre Caslon Text) or Assistant itself at heavier weights.
- Body options: Assistant, or another neutral humanist sans (e.g. Source Sans 3, Nunito Sans, Inter).

## 3. Colour (original)

### 3.1 Brand colours

| Role | HEX | Status | Usage |
|---|---|---|---|
| **Leaf green (primary CTA)** | `#82B42D` | Verified | Header BOOK button (at 85% opacity), footer "Book Now", restaurant menu buttons, "COTTAGES" Book button, restaurant in-house list text |
| **Lime green (light accent)** | `#B3CE6F` | Verified | Nav hover/active, popup Book button (and at 89% opacity), popup border, footer policy link, mobile menu active item |
| **Magenta (accent)** | `#AE095B` | Verified | Prices on Activities, notes on Restaurant, room links on Reviews, "> View All Testimonials" — echoes the logo umbrella |
| Logo magenta | ≈ `#C00071` | Estimate (logo pixels) | Logo only |
| Logo green | ≈ `#00A914` / `#005F2B` | Estimate | Logo only |
| Black | `#000000` | Verified | Body text, headings, footer background, secondary buttons ("View Sample Menu", "LEARN MORE", room "Book Your Stay"), rate table header |
| White | `#FFFFFF` | Verified | Text on photos, page background |

### 3.2 Neutrals and surfaces

| Role | HEX | Status |
|---|---|---|
| Light section background | `#F0F0F0` | Verified (also as 1px borders) |
| Card / pattern background | `#D8D8D8`, `#DFDFDF`–`#EEEEEE` | Verified / Estimate (textures) |
| Footer legal text | `#6E6E6E` | Verified |
| TripAdvisor bar | ≈ `#282828` | Estimate |
| Dark leaf texture section | ≈ `#363636` | Estimate |
| Photo overlays | `#000000` at 0.57–0.60 opacity; `#764D28` at 0.48 (warm overlay) | Verified |
| Menu background (tan woven texture) | ≈ `#B6A392` (lunch) / `#CDC1B3` (breakfast) | Estimate (texture `6a12a00025…png` tinted) |
| Menu header card | ≈ `#8C7F71` translucent dark | Estimate |

### 3.3 Incidental / non-brand colours (don't treat as brand)

| HEX | Where | Assessment |
|---|---|---|
| `#FFF801` | Popup validity lines | Promotional highlight; poor contrast on photos; not a brand colour |
| `#4A90E2`, `#27AE60`, `#F1C40F`, `#E67E22` | Rate table row colours (peak / mid / low / super special) | Generic "flat UI" palette; functional colour coding only |
| `#1A6AFF`, `#1155CC` | Default Wix link blue (mobile menu internals, blog links) | Template default |
| `#FF3D00`, `#E99F0A`, `#202122`, `#3E3E3E` | Wix Blog widget (like heart, etc.) | Widget defaults |

## 4. Shape, depth and other visual identity

| Element | Original |
|---|---|
| Border radius | Buttons ≈3.4–5.7px (subtle); review cards on room pages ≈22.5px; round arrows/avatars 50%; most images square-cornered |
| Shadows | Essentially none (one Wix default) — the design is flat |
| Borders | 1px `#F0F0F0` dividers; 2px white; 3px `#82B42D` / lime popup frame |
| Icons | Very few: chevrons (dropdown, slider arrows), hamburger, X, social share icons on the blog, TripAdvisor owl logo. Thin line style. |
| Decorative motifs | Tiling textures (all in `reference-assets/`): **Javanese/Balinese drop-motif pattern** (`824b47eb…png`, grey on white) behind room cards and room titles; **leaf-outline pattern** (`0da768_9e43…png`, `79e0a317…png`) on home kitchen/blog sections (light and dark versions); **fine linen texture** (`0da768_6d91…png`); **tan woven texture** (`6a12a00025…png`) behind menus; **rice-field photo strip** (`0da768_8657…png`) in the promo strip |
| Image treatment | Full-bleed hero photos with dark overlays; square-cornered photo grids and sliders; photos are natural and unfiltered (teak interiors with white mosquito nets, rice terraces, garden, food flat-lays, staff portraits, village life) |
| Tone / personality | Warm, authentic, family-run, eco and community-minded, a little homespun ("cute little boutique resort"). The visuals combine the tropical lushness of the green brand with the warm teak browns of the photography. |

## 5. What to carry into Phase 2 vs leave behind

| Keep (recognisable identity) | Leave behind (clutter / inconsistency) |
|---|---|
| Logo (as supplied) on dark grounds | Script typeface as a third font |
| Leaf green `#82B42D` as the primary CTA colour; lime `#B3CE6F` as the hover/light accent | Neon-yellow popup text; flat-UI rate-table colours (use a calmer encoding) |
| Magenta `#AE095B` as a sparing accent (prices, links) | Too many heading styles and weights |
| Black/white base and warm teak/rice-terrace photography | Heavy texture on every section (use a texture once or twice at most, e.g. the Javanese motif as a subtle band) |
| Flat, low-radius shapes | Popup auto-opening over the hero |
| The Javanese pattern as a light brand motif | Repeated paragraphs and placeholder sections |
