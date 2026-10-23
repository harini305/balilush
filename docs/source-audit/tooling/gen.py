import json, glob, os, re, csv, sys, collections
sys.stdout.reconfigure(encoding='utf-8')
OUT = sys.argv[1]  # docs/source-audit
DATA = 'data'
os.makedirs(f'{OUT}/content/pages', exist_ok=True)
BASE = 'https://www.balilush.com'

ROUTES = {
 'home': '/', 'rooms_and_accommodations': '/rooms-and-accommodations', 'rooms_duck_cottage': '/rooms/duck-cottage',
 'rooms_dragonfly_room': '/rooms/dragonfly-room', 'rooms_frog_bungalow': '/rooms/frog-bungalow', 'rooms_butterfly_room': '/rooms/butterfly-room',
 'rate_periods': '/rate-periods', 'restaurant': '/restaurant', 'breakfast': '/breakfast', 'lunch_and_dinner': '/lunch-and-dinner',
 'activities': '/activities', 'retreats': '/retreats', 'reviews': '/reviews', 'blog': '/blog',
 'post_it_s_that_magical_time_of_the_year_pineapple_season': '/post/it-s-that-magical-time-of-the-year-pineapple-season',
 'post_2016_09_01_getting_the_bali_lush_penjor_ready_for_galungan': '/post/2016/09/01/getting-the-bali-lush-penjor-ready-for-galungan',
 'post_2016_08_21_new_rice_planting': '/post/2016/08/21/new-rice-planting',
 'post_2016_08_16_independence_day_celebrations_bali_style': '/post/2016/08/16/independence-day-celebrations-bali-style',
}

def hexc(c):
    m = re.match(r'rgba?\((\d+), (\d+), (\d+)', c or '')
    return '#%02X%02X%02X' % tuple(int(x) for x in m.groups()) if m else c

def load(p, vp='desktop'):
    return json.load(open(f'{DATA}/{p}__{vp}.json', encoding='utf8'))

def is_header(s): return s and (s.endswith('kbgajy18'))
def is_footer(s): return s and s.endswith('kbgakgyt')
POPUP_MARK = None

def clean(t): return t.replace('​', '').replace(' ', ' ').strip()

def page_blocks(p):
    d = load(p)
    blocks = []
    is_post = p.startswith('post_')
    stop = False
    for t in d['texts']:
        sec = t['section']
        if is_header(sec) or is_footer(sec): continue
        if sec is None: continue  # promo lightbox (fixed overlay) - stored in shared.json
        if t['tag'] in ('div', 'span') and not is_post:
            if len(clean(t['text'])) < 2: continue
        txt = clean(t['text'])
        if not txt: continue
        if is_post and txt in ('Recent Posts',): stop = True
        if stop: break
        if is_post and t['tag'] == 'li' and sec == 'comp-mcw29p15': continue
        blocks.append({'tag': t['tag'], 'text': txt, 'section_id': sec, 'y': t['box']['y'],
                       'font': t['style']['ff'].split(',')[0], 'size': t['style']['fs'], 'weight': t['style']['fw'], 'color': hexc(t['style']['color']),
                       **({'href': t['href']} if t.get('href') else {})})
    # dedupe identical consecutive (figcaption/span dupes)
    out = []
    for b in blocks:
        if out and out[-1]['text'] == b['text']: continue
        out.append(b)
    return d, out

summary = {}
for p, route in ROUTES.items():
    d, blocks = page_blocks(p)
    secs = []
    for s in d['sections']:
        if is_header(s['id']) or is_footer(s['id']): continue
        secs.append({'section_id': s['id'], 'y': s['box']['y'], 'height': s['box']['h'], 'text_preview': s['textPreview'][:160]})
    rec = {'route': route, 'url': BASE + route, 'title': d['title'], 'meta_description': d['meta'].get('description'),
           'og': {k: v for k, v in d['meta'].items() if k.startswith('og:') or k.startswith('twitter:')},
           'canonical': [l['href'] for l in d['links_head'] if 'canonical' in l['rel']],
           'sections_in_order': secs, 'blocks': blocks,
           'note': 'Blocks are in visual order (desktop 1440px). Header, footer and the site-wide promo lightbox are in ../shared.json. Blog comments (spam) intentionally excluded.'}
    json.dump(rec, open(f'{OUT}/content/pages/{route.strip("/").replace("/", "__") or "home"}.json', 'w', encoding='utf8'), indent=1, ensure_ascii=False)
    summary[p] = rec

# ---------- shared ----------
home = load('home')
popup = [clean(t['text']) for t in home['texts'] if t['section'] is None and clean(t['text'])]
shared = {
 'header_nav': [
   {'label': 'Rooms', 'href': '/rooms-and-accommodations'}, {'label': 'Reviews', 'href': '/reviews'},
   {'label': 'Restaurant', 'href': '/restaurant', 'children': [{'label': 'Breakfast', 'href': '/breakfast'}, {'label': 'Lunch & Dinner', 'href': '/lunch-and-dinner'}]},
   {'label': 'Activities', 'href': '/activities'}, {'label': 'Retreats', 'href': '/retreats'}, {'label': 'Blog', 'href': '/blog'}],
 'header_cta': {'label': 'BOOK YOUR STAY', 'href': 'https://hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr'},
 'mobile_menu_extra': {'label': 'View Booking & Cancellation Policy', 'href': None, 'note': 'Rendered in mobile menu; no destination found (no href).'},
 'logo': {'file': 'bali_lush_logo_edited.png', 'url': 'https://static.wixstatic.com/media/046d7e_7ff9f91ac8994566901ec78d9a852c4a~mv2.png', 'size': '532x196 PNG (transparent)'},
 'footer': {
   'nav': [{'label': 'Home', 'href': '/'}, {'label': 'Host a Retreat', 'href': None, 'note': 'Not linked on live site (plain text). Intended target presumably /retreats.'},
           {'label': 'Lush Blog', 'href': '/blog'}, {'label': 'Rooms', 'href': '/rooms-and-accommodations'}, {'label': 'Activities', 'href': '/activities'}, {'label': 'Kitchen/Restaurant', 'href': '/restaurant'}],
   'cta': {'label': 'Book Now / Check Availability', 'href': 'https://hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr'},
   'phone': '+62 823 2260 9344', 'email': 'info@balilush.com',
   'policy_link': {'label': 'Booking / Cancellation Policy', 'href': None, 'note': '<a> element without href; clicking does nothing. Policy text not found anywhere on site.'},
   'legal': {'text': 'Site Terms | Privacy Policy', 'href': None, 'note': 'Plain text, not linked; no terms/privacy pages exist (404).'},
   'copyright': '© 2026 Bali Lush'},
 'promo_lightbox': {'aria_label': 'Season Special Pop-up', 'trigger': 'Auto-opens ~4.5-5.5 s after first page load in a session (desktop and mobile); did not re-open on subsequent navigation in the same session.',
   'text_in_order': popup,
   'links': [{'label': 'book directly', 'href': 'https://hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr'}, {'label': 'VIEW ALL SEASONAL SPECIALS', 'href': '/rate-periods'}, {'label': 'BOOK YOUR STAY', 'href': 'https://hotels.cloudbeds.com/en/reservation/tLFmXv?currency=idr'}],
   'close': 'X icon (aria-label "Back to site")'},
 'promo_strip': {'pages': ['home', 'rooms-and-accommodations'], 'heading': 'Extended Stay Off-Peak Season Special', 'subheading': 'Stay 4 Nights for the Price of 3, or 7 Nights for the Price of 5!',
   'aside': 'Only available when you book directly through Bali Lush', 'button': {'label': 'LEARN MORE', 'behaviour': 'Re-opens the promo lightbox (no URL change)'}, 'note': 'Offer wording conflicts with the lightbox and /rate-periods - see 08-issues.'},
 'business_facts_from_external_sources': {
   'source': 'Cloudbeds booking engine page (hotels.cloudbeds.com/en/reservation/tLFmXv) structured data + visible text, 2026-10-21. NOT shown anywhere on balilush.com - confirm with the business before publishing.',
   'address': 'Pupuan Sawah, Selemadeg, Tabanan Regency, Bali, Indonesia 82162', 'geo': {'lat': -8.44633007, 'lng': 115.05549622},
   'check_in': '2:00 PM', 'check_out': '12:00 PM', 'contact_name_on_cloudbeds': 'Camron Henry',
   'amenities_listed_on_cloudbeds': ['Air conditioning', 'Board games / puzzles', 'Books, DVDs, music for kids', 'Cooking class', 'Darts', 'Garden', 'Internet', 'Laundry service', 'Massage', 'Non-smoking rooms', 'Pool / Beach towels', 'Restaurant', 'Safety deposit box', 'Shrine', 'Swimming pool', 'Walking Tours', '(+1 more behind "View All (17)")'],
   'tripadvisor_url': 'https://www.tripadvisor.com.au/Hotel_Review-g608496-d8527654-Reviews-Bali_Lush-Tabanan_Bali.html',
   'tripadvisor_location_in_url': 'Tabanan, Bali'}
}
json.dump(shared, open(f'{OUT}/content/shared.json', 'w', encoding='utf8'), indent=1, ensure_ascii=False)

# ---------- reviews ----------
rv = load('reviews'); reviews = []; cur = None
for t in rv['texts']:
    if t['section'] != 'comp-mcxa9h64' and not (cur and t['section'] == 'comp-mcxa9h64'):
        pass
    if t['tag'] == 'a' and t.get('href', '') and '/rooms/' in t['href']:
        cur = {'room': clean(t['text']), 'room_href': t['href'].replace(BASE, ''), 'text': [], 'name': None, 'location': None}; reviews.append(cur); continue
    if cur and t['tag'] == 'p':
        if t['style']['ff'].startswith('wix-madefor-text-v2') and t['style']['fw'] == '500':
            if t['box']['x'] < 400: cur['name'] = clean(t['text'])
            else: cur['location'] = clean(t['text']) or None
        elif t['box']['x'] < 400: cur['text'].append(clean(t['text']))
for r in reviews: r['text'] = '\n\n'.join(x for x in r['text'] if x)
# home slider titles (from interaction log)
slider_titles = {'My family & I have been traveling': 'Stay Longer Next Time', 'My husband and I had 3 wonderful nights': 'Absolute gem in Tabanan',
                 'My husband and I came here for our honeymoon': 'Honeymoon', 'I fell deep in love with Bali Lush': 'Bali Lush ecolodge',
                 'The Bali in your dream': 'A magical place in Bali', 'A very unique Hotel': '"Peaceful Paradise"', 'We had the best time at Bali lush': 'Best Bali experience'}
for r in reviews:
    for k, v in slider_titles.items():
        if r['text'].startswith(k): r['home_slider_title'] = v
json.dump({'source': BASE + '/reviews', 'count': len(reviews), 'note': 'Verbatim guest testimonials as published on balilush.com (original spelling retained). home_slider_title = title shown in the home page "WHAT CLIENTS SAY" slider (7 slides). Room pages show 4 of these each under "Reviews from This Room...".', 'reviews': reviews},
          open(f'{OUT}/content/reviews.json', 'w', encoding='utf8'), indent=1, ensure_ascii=False)

# ---------- rate periods ----------
rp = load('rate_periods'); rows = []; row = None
for t in rp['texts']:
    if t['section'] != 'comp-msyvl8dj3' or t['box']['y'] < 590: continue
    x = t['box']['x']; txt = clean(t['text'])
    if x < 200: row = {'period': txt.replace('\n', ' / '), 'from': None, 'till': None, 'free_nights': None}; rows.append(row)
    elif row and x < 600: row['from'] = txt
    elif row and x < 900: row['till'] = txt
    elif row: row['free_nights'] = txt
json.dump({'source': BASE + '/rate-periods', 'columns': ['SEASONAL RATE PERIOD', 'FROM', 'TILL', 'FREE NIGHTS'],
           'row_colours': {'Peak / Christmas-New Year / European High Season': '#4A90E2', 'Mid Season': '#27AE60', 'Low Season': '#F1C40F', 'Super Special Rates': '#E67E22'},
           'rows': rows, 'note': 'Verbatim. No nightly room prices are published on the site - pricing lives in Cloudbeds. Several rows contain year errors - see 08-issues-gaps-questions.md.'},
          open(f'{OUT}/content/rate-periods.json', 'w', encoding='utf8'), indent=1, ensure_ascii=False)

# ---------- menus ----------
def menu(p, start_y):
    d = load(p); cats = []; cat = None; item = None
    for t in d['texts']:
        if t['section'] is None or is_footer(t['section']) or t['box']['y'] < start_y: continue
        txt = clean(t['text'])
        if not txt: continue
        if t['tag'] == 'h1' and 'dancingscript' in t['style']['ff']:
            cat = {'category': txt, 'items': [], 'notes': []}; cats.append(cat); item = None
        elif cat and t['tag'] == 'h2':
            item = {'name': txt, 'description': None}; cat['items'].append(item)
        elif cat and t['tag'] == 'p':
            if item and item['description'] is None and not txt.startswith('*'): item['description'] = txt
            else: cat['notes'].append(txt)
    return cats
bf = load('breakfast')
breakfast_intro = [clean(t['text']) for t in bf['texts'] if t['section'] == 'comp-mf5ocysf2' and t['box']['y'] < 1150 and clean(t['text'])]
json.dump({'breakfast': {'source': BASE + '/breakfast', 'intro': breakfast_intro, 'categories': menu('breakfast', 1150)},
           'lunch_and_dinner': {'source': BASE + '/lunch-and-dinner', 'intro': [b['text'] for b in summary['lunch_and_dinner']['blocks'] if b['y'] < 1000], 'categories': menu('lunch_and_dinner', 1000)},
           'restaurant_in_house_list': [b['text'] for b in summary['restaurant']['blocks'] if b['tag'] == 'li'],
           'note': 'Verbatim from live site. No menu prices are published. Items marked * / (VG) / (V) / (GF) as on site. Some category headings/notes contain errors - see 08-issues.'},
          open(f'{OUT}/content/menus.json', 'w', encoding='utf8'), indent=1, ensure_ascii=False)

# ---------- activities ----------
acts = []; a = None
for b in summary['activities']['blocks']:
    if b['tag'] == 'h2': a = {'title': b['text'], 'paragraphs': [], 'pricing': []}; acts.append(a)
    elif a and b['tag'] == 'p':
        (a['pricing'] if b['color'] == '#AE095B' else a['paragraphs']).append(b['text'])
for a in acts: a['pricing'] = [p for p in a['pricing'] if p]
json.dump({'source': BASE + '/activities', 'intro': summary['activities']['blocks'][1]['text'], 'activities': acts,
           'note': 'Prices verbatim in IDR as shown (pink #AE095B text on site). Some prices omit "Rp" - see 08-issues.'},
          open(f'{OUT}/content/activities.json', 'w', encoding='utf8'), indent=1, ensure_ascii=False)

# ---------- rooms ----------
rooms = []
for p in ['rooms_butterfly_room', 'rooms_dragonfly_room', 'rooms_frog_bungalow', 'rooms_duck_cottage']:
    r = summary[p]; bl = r['blocks']
    name = next(b['text'] for b in bl if 'dancingscript' in b['font'])
    suit = next((bl[i + 2]['text'] for i, b in enumerate(bl) if b['text'] == 'Suitable for'), None)
    vals = [b['text'] for b in bl if b['section_id'] == 'comp-maraff1e' and b['tag'] == 'p' and b['text'] not in ('Suitable for', 'Sleeps')]
    desc = [b['text'] for b in bl if b['section_id'] == 'comp-mfwniwpf' and b['tag'] == 'p' and b['y'] and b.get('size') == '16px']
    lis = [b for b in bl if b['section_id'] == 'comp-mfwniwpf' and b['tag'] == 'li']
    beds = [b['text'] for b in lis if bl and b.get('y') and next(x for x in load(p)['texts'] if x['text'].strip() == b['text'])['box']['x'] < 400]
    amen = [b['text'] for b in lis if b['text'] not in beds]
    rv_ = [b['text'] for b in bl if b['section_id'] == 'comp-mf6wyo49' and b['tag'] == 'p']
    rooms.append({'name': name, 'route': r['route'], 'suitable_for': vals[0] if vals else None, 'sleeps': vals[1] if len(vals) > 1 else None,
                  'description': desc, 'bed_configurations': beds, 'amenities': amen, 'reviews_block_raw': rv_, 'og_image': r['og'].get('og:image')})
json.dump({'note': 'Verbatim from room detail pages (Wix dynamic pages, collection "rooms"). Order as in site listing: Butterfly, Dragonfly, Frog, Duck. No prices on site.', 'rooms': rooms},
          open(f'{OUT}/content/rooms.json', 'w', encoding='utf8'), indent=1, ensure_ascii=False)

# ---------- assets manifest ----------
raw = json.load(open('assets_raw.json', encoding='utf8'))
labels = json.load(open('seclabels.json', encoding='utf8'))
PAGE_ROUTE = ROUTES
def use_for(a):
    n = a['name'].lower(); secs = ' '.join(a['sections']).lower(); alts = ' '.join(a['alts']).lower()
    if 'logo' in n and 'tripadvisor' not in n: return 'Brand logo (header + footer)'
    if 'tripadvisor' in n: return 'Third-party logo (TripAdvisor link bar)'
    if 'googleusercontent' in a['original_url']: return 'Blog comment / author avatar (third-party, do not reuse)'
    if 'youtube' in a['original_url']: return 'YouTube video thumbnail (embedded video in blog post)'
    if a['original_url'].startswith('https://www.balilush.com/post'): return 'Broken img (blog "recent posts" placeholder src) - ignore'
    if a['type'] == 'background': return 'Decorative tiling texture / section background'
    return 'Photograph'
rows = []
for i, a in enumerate(raw, 1):
    f = a['file'] or {}
    secl = []
    for s in a['sections']:
        pg, sid = s.split('#', 1)
        lab = labels.get(s, sid)
        secl.append(f"{PAGE_ROUTE.get(pg, pg)} :: {re.sub(r' +', ' ', lab)[:70]}")
    concerns = []
    if (f.get('bytes') or 0) > 2_000_000: concerns.append(f"large original ({round(f['bytes']/1e6,1)} MB)")
    if (f.get('w') or 0) > 3000: concerns.append('very high resolution - resize')
    if f.get('fmt') == 'PNG' and (f.get('bytes') or 0) > 1_000_000: concerns.append('photo stored as PNG - convert to JPEG/WebP/AVIF')
    if f.get('fmt') == 'MPO': concerns.append('MPO (multi-picture JPEG from phone) - re-encode')
    if f.get('w') and (f['w'] < 900) and use_for(a) == 'Photograph' and any(int(x.split('x')[0]) > 900 for x in [a['max_display']]): concerns.append('original smaller than desktop display width - may look soft')
    if len(a['pages']) > 2: concerns.append(f"reused on {len(a['pages'])} pages")
    if not a['alts'] or all(re.match(r'^(image|DSC_?\d+|[0-9A-F-]{20,}|.*\.(jpe?g|png))', x, re.I) for x in a['alts']): concerns.append('no meaningful alt text')
    rows.append({
        'id': f'A{i:03d}', 'asset_type': use_for(a), 'element': a['type'], 'filename': a['name'], 'wix_media_id': a['key'][4:] if a['key'].startswith('wix:') else '',
        'original_url': a['original_url'], 'pages': ' | '.join(PAGE_ROUTE.get(p, p) for p in a['pages']), 'sections': ' | '.join(secl),
        'alt_text_on_site': ' | '.join(a['alts']), 'original_width': f.get('w') or '', 'original_height': f.get('h') or '', 'original_bytes': f.get('bytes') or '',
        'format': f.get('fmt') or '', 'max_display_size_desktop': a['max_display'], 'served_sizes_seen': ' '.join(a['served'][:4]),
        'local_path': 'docs/source-audit/reference-assets/' + (('bali_lush_logo_edited__046d7e_7ff9f91ac8994566901ec78d9a852c4a.png') if 'logo_edited' in a['name'] else a['name']) if (a['type'] == 'background' and 'wixstatic' in a['original_url']) or 'logo_edited' in a['name'] else '',
        'availability': ('remote (Wix CDN, HTTP 206/200 verified)' if f.get('status') in (200, 206) else ('remote third-party' if 'wixstatic' not in a['original_url'] else 'unknown')),
        'concerns': '; '.join(concerns)})
# add SSR-only placeholders
for k in ['8bb438_02133a81229f49e09dc4c20f107f1eb6~mv2.jpg', '8bb438_189ac9d807b640ffbeca24c41d965bae~mv2.jpg', '8bb438_22ae62c08916403d955425d5e8c70a11~mv2.jpg', '8bb438_31254b5ad37446c8949144e34adc2113~mv2.jpg', '8bb438_324d1f8b463e45d891b5de00c83989ad~mv2.jpg', '8bb438_c9e1a83e7f7b43799dbe5a8d3fd81f0b~mv2.jpg', '8bb438_dbc34d8b0df546e3b720b14ff670ba83~mv2.jpg', '8bb438_e83d8cc28a044555b7672018983789a7~mv2.jpg', '8bb438_f2d393d3ad61468890a2616c56fff0f5~mv2.jpg', '8bb438_f7a5e921e855433896901546de91b43e~mv2.png']:
    rows.append({'id': f'A{len(rows)+1:03d}', 'asset_type': 'Unrendered reference (likely Wix template placeholder in rooms dynamic-page data)', 'element': 'none', 'filename': k, 'wix_media_id': k,
                 'original_url': 'https://static.wixstatic.com/media/' + k, 'pages': '/rooms/* (HTML source only)', 'sections': '', 'alt_text_on_site': '', 'original_width': '', 'original_height': '', 'original_bytes': '',
                 'format': '', 'max_display_size_desktop': '0x0', 'served_sizes_seen': '', 'local_path': '', 'availability': 'referenced in SSR HTML, never displayed', 'concerns': 'Do not use unless confirmed as Bali Lush photography'})
with open(f'{OUT}/04-assets-manifest.csv', 'w', newline='', encoding='utf-8-sig') as fh:
    w = csv.DictWriter(fh, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)
print('pages', len(summary), 'reviews', len(reviews), 'rate rows', len(rows), 'assets', len(rows))
print('rooms', [(r['name'], r['suitable_for'], r['sleeps'], len(r['description']), len(r['bed_configurations']), len(r['amenities'])) for r in rooms])
print('acts', [(a['title'], len(a['pricing'])) for a in acts])
