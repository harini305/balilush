import Link from 'next/link';
import Picture from '@/components/Picture';
import { inHouseList } from '@/lib/content';
import styles from './restaurant.module.css';

export const metadata = {
  title: 'Restaurant',
  description:
    'Our restaurant offers breakfast, lunch, and dinner, and is situated at the top of Bali Lush. It is the heart of the property and a true sanctuary for food, fun, family and friends.',
  alternates: { canonical: '/restaurant' },
  openGraph: { images: ['/images/restaurant/garden-vegetables-1200.jpg'] },
};

export default function RestaurantPage() {
  return (
    <>
      <header className={`${styles.hero} on-dark`}>
        <div className={styles.heroMedia} data-hero-media>
          <Picture name="restaurant/garden-vegetables" sizes="100vw" priority />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <h1>Lush Kitchen &amp; Restaurant</h1>
          <p className={styles.hours}>Open from 8AM until 9PM</p>
        </div>
      </header>

      <section className="section">
        <div className={`container ${styles.story}`}>
          <div className={styles.storyText}>
            <h2 className={styles.h2}>What Makes Our Food Special</h2>
            <p className="lede">
              At Bali Lush, we&apos;re passionate about food. Good food begins with good bread, which is why we make our own
              sourdough bread in-house every day.
            </p>
            <p>
              Our sourdough starter is called Peggy, and Peggy came to life in 2020 when we had to close for that first year of
              COVID. Peggy is the basis of our Country Loaf and Honey, Oats &amp; Rye Sourdough Discard Loaf.
            </p>
            <p className={styles.gf}>
              For our gluten-free guests, we offer a Gluten-Free Sandwich Loaf, which is also vegan—please check out our{' '}
              <Link href="/breakfast#bakery">breakfast menu</Link> for the full ingredients list.
            </p>
          </div>
          <div className={`frame ${styles.storyImage}`} data-reveal>
            <Picture name="restaurant/garden-joglo-pool" sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="recipes">
        <div className="container">
          <div className={styles.recipesHead}>
            <div className={styles.recipesText}>
              <h2 id="recipes" className={styles.h2}>Curated Recipes</h2>
              <p>
                All of our recipes have been curated over the years from food magazines, recipe books, TV shows, cooking classes
                abroad and on the island, YouTube, food blogs, friends, and family. We are very happy to share with you what has
                been freely shared with us—just ask for the recipe of anything you like, and we&apos;ll WhatsApp you the link.
              </p>
            </div>
            <div className={styles.menuLinks}>
              <Link href="/breakfast" className="btn btn--dark">Breakfast Menu</Link>
              <Link href="/lunch-and-dinner" className="btn btn--dark">Lunch / Dinner Menu</Link>
              <p className={styles.tax}>All our prices already include 6% service charge and 10% government tax.</p>
            </div>
          </div>
          <div className={styles.inHouse} data-reveal>
            <h3 className={styles.h3}>We also make in-house for breakfast:</h3>
            <dl>
              {inHouseList.map((item) => (
                <div key={item.name} className={styles.inHouseItem}>
                  <dt>{item.name}</dt>
                  <dd>{item.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="space">
        <div className={`container ${styles.space}`}>
          <div className={styles.spaceText} data-reveal>
            <h2 id="space" className={styles.h2}>The Restaurant Space</h2>
            <p>
              Our restaurant, situated at the top of Bali Lush, is the heart of the property and a true sanctuary for food, fun,
              family and friends. Housed in a beautifully repurposed open-air Joglo—a traditional Javanese teak residence we
              carefully sourced from Central Java and rebuilt on site in 2014—our space blends cultural heritage with modern
              comfort. Surrounded by lush greenery and stunning views, this inviting pavilion creates the perfect atmosphere to
              enjoy your meal, take in a book, play a board game or make new friends with other guests, our restaurant offers a
              unique blend of authentic architecture and yummy food in the tranquil Balinese countryside.
            </p>
          </div>
          <ul className={styles.collage}>
            {['restaurant/sate-grill', 'restaurant/dining-terrace', 'restaurant/sate-grill-two', 'restaurant/dining-room'].map((name) => (
              <li key={name} className="frame" data-reveal>
                <Picture name={name} sizes="(min-width: 900px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
