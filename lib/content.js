// Content adapters over the verbatim audit files (copied from docs/source-audit/content/ into data/content/).
// Wording is kept as published. Every deviation is a commented, audit-referenced
// transform (see docs/source-audit/08-issues-gaps-questions.md).
import roomsData from '@/data/content/rooms.json';
import reviewsData from '@/data/content/reviews.json';
import menusData from '@/data/content/menus.json';
import activitiesData from '@/data/content/activities.json';
import ratesData from '@/data/content/rate-periods.json';

/* ---------- Rooms ---------- */

const ROOM_MEDIA = {
  'butterfly-room': {
    card: 'rooms/butterfly-card',
    gallery: ['rooms/butterfly-card', 'rooms/butterfly-balcony', 'rooms/butterfly-beds', 'rooms/butterfly-desk', 'rooms/butterfly-bathroom', 'rooms/batukaru-drone'],
    // Verbatim sentence from the room description, used on listing rows.
    teaser: 'The bathroom has the most spectacular view of all the bathrooms at Bali Lush; a picture window looks directly out across the rice terraces making for a very special shower experience.',
    beds: ['Super King four poster canopy bed 200 x 200 cm with mosquito net', '1 single bed 90 cm x 180 cm'],
  },
  'dragonfly-room': {
    card: 'rooms/dragonfly-card',
    gallery: ['rooms/dragonfly-card', 'rooms/dragonfly-desk', 'rooms/dragonfly-canopy-bed', 'rooms/dragonfly-bunk-beds'],
    teaser: 'Dragonfly Room is our favorite room at Bali Lush due to the large floor to ceiling windows that have been placed on the side facing our own private Rice Terrace.',
    beds: ['Super King four poster canopy bed 200 x 200 cm with mosquito net', '1 single bed/settee 90 cm x 180 cm', '1 set bunk beds 100 x 200 cm'],
  },
  'frog-bungalow': {
    card: 'rooms/frog-card',
    gallery: ['rooms/frog-card', 'rooms/frog-exterior', 'rooms/frog-outdoor-bathroom', 'rooms/frog-terrace-view', 'rooms/frog-canopy-bed'],
    teaser: 'Frog Bungalow was our very first guest accommodation and is still our most popular.',
    beds: ['King size bed 180 x 200 cm with canopy mosquito net', 'or 2 single beds 90 x 200 cm (no mosquito net)'],
  },
  'duck-cottage': {
    card: 'rooms/duck-card',
    gallery: ['rooms/duck-card', 'rooms/duck-garden', 'rooms/duck-bed', 'rooms/duck-beds', 'rooms/duck-open-plan', 'rooms/duck-balcony', 'rooms/duck-bathroom'],
    teaser: 'Our largest guest room, the interior space is a single oversized open plan living space and bedroom with private open air bathroom.',
    beds: null, // Duck Cottage publishes its own bed_configurations list.
  },
};

// D6: one amenity bullet is split mid-sentence on the source ("…1 standard and 1 super." /
// "King pillow for …"). Rejoin the two halves without changing a word.
function joinSplitAmenity(list) {
  const out = [];
  for (const item of list) {
    const prev = out.at(-1);
    if (prev && /1 standard and 1 super\.?$/.test(prev) && /^King pillow/.test(item)) {
      out[out.length - 1] = `${prev.replace(/\.$/, '')} ${item}`;
    } else {
      out.push(item);
    }
  }
  return out;
}

export const rooms = roomsData.rooms.map((room) => {
  const slug = room.route.split('/').pop();
  const media = ROOM_MEDIA[slug];
  return {
    slug,
    href: room.route,
    name: room.name,
    suitableFor: room.suitable_for,
    sleeps: room.sleeps,
    description: room.description,
    bedConfigurations: room.bed_configurations.length ? room.bed_configurations : media.beds,
    amenities: joinSplitAmenity(room.amenities),
    // Reviews shown under "Reviews from This Room..." on the source room page.
    reviewNames: room.reviews_block_raw,
    ...media,
  };
});

export function getRoom(slug) {
  return rooms.find((r) => r.slug === slug);
}

/* ---------- Reviews ---------- */

export const reviews = reviewsData.reviews.map((r, i) => ({
  id: `review-${i + 1}`,
  room: r.room,
  roomHref: r.room_href,
  roomSlug: r.room_href.split('/').pop(),
  paragraphs: r.text.split(/\n\n+/),
  name: r.name,
  location: r.location,
  sliderTitle: r.home_slider_title ?? null,
}));

export const sliderReviews = reviews.filter((r) => r.sliderTitle);

export function reviewsForRoom(room) {
  return reviews.filter((r) => r.roomSlug === room.slug && room.reviewNames.includes(r.name));
}

/* ---------- Menus ---------- */

const breakfastSource = menusData.breakfast;

export const breakfast = {
  greeting: breakfastSource.intro[0].split('\n'),
  greetingEnglish: breakfastSource.intro[1],
  orderNote: breakfastSource.intro[2],
  includedTitle: breakfastSource.intro[3],
  included: [breakfastSource.intro[5], breakfastSource.intro[8], breakfastSource.intro[9], breakfastSource.intro[11]],
  alsoTitle: breakfastSource.intro[4],
  also: [breakfastSource.intro[6]],
  // D3: the Jamu description appears twice on the source; show it once, with the serving note.
  jamu: { name: 'Jamu', text: `${breakfastSource.intro[7].replace(/^Jamu - /, '')}` },
  jamuServe: breakfastSource.intro[10].replace(/^Made from .*?palm sugar\. /, ''),
  categories: breakfastSource.categories.map((c) => {
    // D4: "(dairy)" belongs to the preceding yogurt note, not the category heading.
    const category = c.category.replace(/^\(dairy\)\s*/, '');
    let items = c.items;
    let notes = c.notes;
    if (c.category === 'Main Breakfast') {
      // D3: "Loose Leaf Black Tea" is repeated here from the coffee and tea list.
      items = items.filter((i) => i.name !== 'Loose Leaf Black Tea');
      notes = notes.map((n) => n.replace(/Plain Yogurt$/, 'Plain Yogurt (dairy)'));
    }
    return { category, slug: slugify(category), items, notes };
  }),
};

const lunchSource = menusData.lunch_and_dinner;

export const lunchAndDinner = {
  hours: lunchSource.intro[1],
  howTitle: lunchSource.intro[2],
  // F5: dish counts conflict (home "5 to 6", this page "approximately 10-14", 47 listed).
  // The count clause is withheld until the owner confirms it.
  how: lunchSource.intro[3].replace(' of approximately 10-14 dishes', ' of dishes'),
  menuTitle: lunchSource.intro[4],
  orderNote: lunchSource.intro[5],
  categories: lunchSource.categories.map((c) => ({ ...c, slug: slugify(c.category) })),
};

export const inHouseList = menusData.restaurant_in_house_list.map((entry) => {
  const [name, note] = entry.split('\n');
  return { name: name.trim(), note: note?.trim() ?? '' };
});

/* ---------- Activities ---------- */

const ACTIVITY_MEDIA = {
  'Walks & Treks': 'activities/walks-treks',
  'Cooking Classes': 'restaurant/garden-vegetables',
  'Morning Market Visits': 'activities/morning-market',
  'Guided Motorcycle Tours': 'activities/motorcycle-tour',
  'Jamu Making': 'activities/jamu-making',
  'Make Your Own Offering': 'activities/offering',
  'Visit a Local School': 'activities/local-school',
  'Yoga & Yoga Shala': 'activities/yoga',
};

// Price lines split into label / amount / qualifier. Every figure is copied verbatim from
// activities.json, including the two amounts published without "Rp" (F12).
const ACTIVITY_PRICES = {
  'Walks & Treks': [{ label: 'Per guide: first 1-2 hours', amount: 'Rp200,000', note: 'each additional hour Rp100,000' }],
  'Cooking Classes': [
    { label: 'First 2 guests', amount: '750,000', note: 'each additional guest: Rp187,000' },
    { label: 'Additional child under 12yrs', amount: 'Rp140,000' },
  ],
  'Morning Market Visits': [{ label: 'First 2 guests', amount: '650,000', note: 'each additional guest: Rp87,500' }],
  'Guided Motorcycle Tours': [{ label: 'Price', amount: 'Rp280,000' }],
  'Jamu Making': [
    { label: '1st guest', amount: 'Rp 140,000' },
    { label: 'each additional guest', amount: 'Rp 70,000' },
  ],
  'Make Your Own Offering': [
    { label: '2hr Class: one guest / private class', amount: 'Rp200,000', note: 'each additional guest Rp100,000' },
  ],
  'Visit a Local School': [],
  'Yoga & Yoga Shala': [
    { label: 'Private instruction, per hour', amount: 'Rp462,000', note: 'or the price can be shared between up to 4 guests' },
  ],
};

// The combined package is published identically under both Cooking Classes and Morning
// Market Visits (F12); it is shown once and referenced from both activities.
export const combinedPackage = {
  title: 'Combined Cooking Class and Morning Market Tour',
  prices: [
    { label: 'First 2 guests', amount: 'Rp1,399,000', note: 'each additional guest: Rp275,000' },
    { label: 'Additional child under 12yrs', amount: 'Rp187,000' },
  ],
};

export const activitiesIntro = activitiesData.intro;

export const activities = activitiesData.activities.map((a) => ({
  title: a.title,
  slug: slugify(a.title),
  paragraphs: a.paragraphs,
  prices: ACTIVITY_PRICES[a.title],
  image: ACTIVITY_MEDIA[a.title],
  hasCombined: a.title === 'Cooking Classes' || a.title === 'Morning Market Visits',
}));

/* ---------- Seasonal rate periods ---------- */

// F2: rows whose dates contain year errors on the source. Their dates are not shown
// (and not guessed) until the owner confirms them.
const DISPUTED_ROWS = new Set([9, 10, 12, 14]);

export const ratePeriods = ratesData.rows.map((row, index) => ({
  index,
  period: row.period,
  from: row.from,
  till: row.till,
  disputed: DISPUTED_ROWS.has(index),
  season: /Peak|High Season/.test(row.period) ? 'peak' : /Super Special/.test(row.period) ? 'special' : /Mid/.test(row.period) ? 'mid' : 'low',
}));

/* ---------- helpers ---------- */

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
