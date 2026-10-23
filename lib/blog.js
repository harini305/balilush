// Blog posts from the verbatim page captures. Comments, views, likes and share widgets
// are intentionally not carried over (the source comments are spam — see audit 08 §7).
import pineapple from '@/data/content/pages/post__it-s-that-magical-time-of-the-year-pineapple-season.json';
import penjor from '@/data/content/pages/post__2016__09__01__getting-the-bali-lush-penjor-ready-for-galungan.json';
import rice from '@/data/content/pages/post__2016__08__21__new-rice-planting.json';
import independence from '@/data/content/pages/post__2016__08__16__independence-day-celebrations-bali-style.json';

const texts = (page, tag) => page.blocks.filter((b) => b.tag === tag).map((b) => b.text);
const dateOf = (page) => page.blocks.find((b) => b.tag === 'span' && /\d{4}$/.test(b.text)).text;

export const posts = [
  {
    route: pineapple.route,
    title: pineapple.title,
    date: dateOf(pineapple),
    isoDate: '2024-12-19',
    cover: 'blog/pineapple-season',
    excerpt: texts(pineapple, 'p')[0],
    body: [
      { type: 'p', text: texts(pineapple, 'p')[0] },
      { type: 'h2', text: texts(pineapple, 'p')[1].replace(/:$/, '') },
      {
        type: 'ul',
        items: texts(pineapple, 'li').map((t) => {
          const [text, rest] = t.split(' See this fascinating article on the BBC website');
          if (!rest) return { text };
          const [, label, href] = rest.match(/'(.+?)' (https?:\S+)/) ?? [];
          return { text, link: { lead: 'See this fascinating article on the BBC website', label, href } };
        }),
      },
      { type: 'figure', image: 'blog/pineapple-harvest', caption: texts(pineapple, 'figcaption')[0] },
    ],
  },
  {
    route: penjor.route,
    title: penjor.title,
    date: dateOf(penjor),
    isoDate: '2016-09-01',
    updated: texts(penjor, 'p')[0],
    cover: 'blog/penjor-1',
    excerpt: texts(penjor, 'p')[1],
    body: [
      { type: 'gallery', images: ['blog/penjor-1', 'blog/penjor-2', 'blog/penjor-3'] },
      ...texts(penjor, 'p').slice(1, 4).map((text) => ({ type: 'p', text })),
      { type: 'tags', text: texts(penjor, 'p')[4] },
    ],
  },
  {
    route: rice.route,
    title: rice.title,
    date: dateOf(rice),
    isoDate: '2016-08-21',
    cover: 'blog/rice-planting',
    excerpt: null, // The source post has no body text (audit 08 D8).
    body: [
      { type: 'figure', image: 'blog/rice-planting' },
      { type: 'tags', text: texts(rice, 'p')[0] },
    ],
  },
  {
    route: independence.route,
    title: independence.title,
    date: dateOf(independence),
    isoDate: '2016-08-16',
    cover: 'blog/tug-o-war-1',
    excerpt: texts(independence, 'p')[0],
    body: [
      {
        type: 'gallery',
        images: ['blog/tug-o-war-1', 'blog/tug-o-war-2', 'blog/tug-o-war-3', 'blog/tug-o-war-4', 'blog/tug-o-war-5'],
        captions: texts(independence, 'li'),
      },
      ...texts(independence, 'p').map((text) => ({ type: 'p', text })),
      // The closing paragraph introduces the post's YouTube video (manifest A068).
      { type: 'video', youtubeId: 'YdK8tGh6iD0', title: 'Video: Independence Day Celebrations Bali Style' },
    ],
  },
];

export function getPost(route) {
  return posts.find((p) => p.route === route);
}
