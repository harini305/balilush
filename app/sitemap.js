import { rooms } from '@/lib/content';
import { posts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

const STATIC = ['/', '/book', '/rooms-and-accommodations', '/rate-periods', '/restaurant', '/breakfast', '/lunch-and-dinner', '/activities', '/retreats', '/reviews', '/blog'];

export default function sitemap() {
  return [...STATIC, ...rooms.map((r) => r.href), ...posts.map((p) => p.route)].map((path) => ({ url: `${SITE_URL}${path}` }));
}
