import Link from 'next/link';
import Picture from '@/components/Picture';
import { MenuCategory, MenuNav } from '@/components/Menu';
import { lunchAndDinner } from '@/lib/content';
import styles from '../menu.module.css';

export const metadata = {
  title: 'Lunch & Dinner | Menu',
  description:
    'Each morning at breakfast, our staff will ask you what you’d like for lunch and dinner. Fresh, seasonal dishes from Bali, Indonesia and beyond, based on what’s coming out of our gardens.',
  alternates: { canonical: '/lunch-and-dinner' },
  openGraph: { images: ['/images/menus/retreat-buffet-1200.jpg'] },
};

const [first, second, ...rest] = lunchAndDinner.categories;

export default function LunchDinnerPage() {
  return (
    <>
      <header className={`container ${styles.head}`}>
        <div className={styles.headText}>
          <h1>Lunch &amp; Dinner</h1>
          {/* Visible at every width; the source hid this line on mobile. */}
          <p className={styles.hours}>{lunchAndDinner.hours}</p>
          <h2 className={styles.howTitle}>{lunchAndDinner.howTitle}</h2>
          <p>{lunchAndDinner.how}</p>
          <p className={styles.switch}>
            Also see the <Link href="/breakfast">Breakfast menu</Link>
          </p>
        </div>
        <div className={`frame ${styles.headImage}`} data-hero-media>
          <Picture name="menus/retreat-buffet" sizes="(min-width: 900px) 34vw, 100vw" priority />
        </div>
      </header>

      <div className={styles.menuWrap}>
        <div className={`container ${styles.menuIntro}`}>
          <h2 className={styles.menuTitle}>{lunchAndDinner.menuTitle}</h2>
          <p className={styles.orderNote}>{lunchAndDinner.orderNote}</p>
        </div>
        <MenuNav categories={lunchAndDinner.categories} label="Lunch and dinner menu sections" />
        <div className="container">
          <MenuCategory category={first} />
          <MenuCategory category={second} />
          <ul className={styles.photoRow} aria-label="Dishes from the Bali Lush kitchen">
            {['menus/slaw-salad', 'menus/soto-ayam', 'menus/creamy-soup'].map((name) => (
              <li key={name} className="frame">
                <Picture name={name} sizes="(min-width: 768px) 30vw, 33vw" />
              </li>
            ))}
          </ul>
          {rest.slice(0, 3).map((c) => <MenuCategory key={c.slug} category={c} />)}
          <ul className={styles.photoRow} aria-label="More dishes from the Bali Lush kitchen">
            {['menus/garden-salad', 'menus/stir-fried-noodles', 'menus/mie-goreng'].map((name) => (
              <li key={name} className="frame">
                <Picture name={name} sizes="(min-width: 768px) 30vw, 33vw" />
              </li>
            ))}
          </ul>
          {rest.slice(3).map((c) => <MenuCategory key={c.slug} category={c} />)}
        </div>
      </div>
    </>
  );
}
