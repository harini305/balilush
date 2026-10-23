import shared from '@/data/content/shared.json';

export const SITE_URL = 'https://www.balilush.com';

// Verified booking destination (every Book CTA on the original site uses it).
export const BOOKING_URL = shared.header_cta.href;

// On-site page that embeds the Cloudbeds booking engine, so guests stay on balilush.com.
export const BOOK_PAGE = '/book';

export const PHONE = shared.footer.phone;
export const PHONE_HREF = `tel:${PHONE.replace(/\s+/g, '')}`;
export const EMAIL = shared.footer.email;
export const EMAIL_HREF = `mailto:${EMAIL}`;

// Linked from the original home page; destination returned 403 to automated checks.
export const TRIPADVISOR_URL = shared.business_facts_from_external_sources.tripadvisor_url;

export const NAV = [
  { label: 'Rooms', href: '/rooms-and-accommodations' },
  { label: 'Reviews', href: '/reviews' },
  {
    label: 'Restaurant',
    href: '/restaurant',
    children: [
      { label: 'Breakfast', href: '/breakfast' },
      { label: 'Lunch & Dinner', href: '/lunch-and-dinner' },
    ],
  },
  { label: 'Activities', href: '/activities' },
  { label: 'Retreats', href: '/retreats' },
  { label: 'Blog', href: '/blog' },
];

// Footer "Host a Retreat" was unlinked on the original; /retreats is titled "Host a Retreat".
// Policy, terms and privacy links are omitted until the owner supplies those pages.
export const FOOTER_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms-and-accommodations' },
  { label: 'Restaurant', href: '/restaurant' },
  { label: 'Activities', href: '/activities' },
  { label: 'Host a Retreat', href: '/retreats' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Seasonal Rates', href: '/rate-periods' },
  { label: 'Blog', href: '/blog' },
];

export const COPYRIGHT = shared.footer.copyright;
