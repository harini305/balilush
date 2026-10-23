import Link from 'next/link';
import Picture from '@/components/Picture';
import { MenuCategory, MenuNav } from '@/components/Menu';
import { breakfast } from '@/lib/content';
import styles from '../menu.module.css';

export const metadata = {
  title: 'Breakfast | Menu',
  description:
    'Selamat Pagi. Every room at Bali Lush includes breakfast: a fruit plate or fresh juice, premium coffee or pot of tea, a main or Indonesian breakfast and a bakery item, plus Bali coffee, tea, water and jamu.',
  alternates: { canonical: '/breakfast' },
  openGraph: { images: ['/images/menus/breakfast-omelette-1200.jpg'] },
};

export default function BreakfastPage() {
  return (
    <>
      <header className={`container ${styles.head}`}>
        <div className={styles.headText}>
          <p className={styles.kicker} lang="id">
            {breakfast.greeting[0]} <span>{breakfast.greeting[1]}</span>
          </p>
          <h1>Breakfast Menu</h1>
          <p className="lede">{breakfast.greetingEnglish}</p>
          <p className={styles.orderNote}>{breakfast.orderNote}</p>
          <p className={styles.switch}>
            Also see the <Link href="/lunch-and-dinner">Lunch &amp; Dinner menu</Link>
          </p>
        </div>
        <div className={`frame ${styles.headImage}`} data-hero-media>
          <Picture name="menus/breakfast-omelette" sizes="(min-width: 900px) 34vw, 100vw" priority />
        </div>
      </header>

      <section className="container" aria-labelledby="included">
        <div className={styles.included}>
          <div>
            <h2 id="included" className={styles.includedTitle}>{breakfast.includedTitle}</h2>
            <ul className={styles.includedList}>
              {breakfast.included.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div>
            <h2 className={styles.includedTitle}>{breakfast.alsoTitle}</h2>
            <ul className={styles.includedList}>
              {breakfast.also.map((i) => <li key={i}>{i}</li>)}
              <li>
                <strong>{breakfast.jamu.name}</strong> — {breakfast.jamu.text} {breakfast.jamuServe}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.menuWrap}>
        <h2 className="visually-hidden">Breakfast menu</h2>
        <MenuNav categories={breakfast.categories} label="Breakfast menu sections" />
        <div className="container">
          <MenuCategory category={breakfast.categories[0]} />
          <ul className={styles.photoRow} aria-label="Breakfast at Bali Lush">
            {['menus/papaya-harvest', 'menus/fresh-juices', 'menus/sourdough-plate'].map((name) => (
              <li key={name} className="frame">
                <Picture name={name} sizes="(min-width: 768px) 30vw, 33vw" />
              </li>
            ))}
          </ul>
          {breakfast.categories.slice(1).map((c) => <MenuCategory key={c.slug} category={c} />)}
        </div>
      </div>
    </>
  );
}
