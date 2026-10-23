import Link from 'next/link';
import Picture from '@/components/Picture';
import Gallery from '@/components/Gallery';
import { galleryItems } from '@/lib/gallery';
import { EMAIL, EMAIL_HREF } from '@/lib/site';
import styles from './retreats.module.css';

export const metadata = {
  title: 'Host a Retreat',
  description:
    'Host a retreat at Bali Lush: a teak yoga shala with rice terrace views, a kitchen that caters to a range of dietary requirements, and a boutique property far from the madding crowds of south Bali.',
  alternates: { canonical: '/retreats' },
  openGraph: { images: ['/images/retreats/retreat-group-1024.jpg'] },
};

const GALLERY = [
  'retreats/group-flower-mandala',
  'retreats/balinese-dress',
  'retreats/cooking-class',
  'retreats/candle-hands',
  'retreats/group-restaurant',
  'retreats/cooking-class-group',
  'retreats/garden-meditation',
  'retreats/lounge-verandah',
  'blog/penjor-2',
];

// Audit 08 D2: on the source, "Rooms & Accommodations" repeats the "What We Do" copy and
// "Experiences & Activities" repeats "Our Kitchen". Those duplicates are not shown; the
// sections keep their photos and links until the owner supplies their own copy.
export default function RetreatsPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1>Host a Retreat</h1>
            <p className="lede">
              If you looking to take your students somewhere unique and far from the madding crowds of south Bali, we want to
              help you create an experience for your retreat goers that includes relaxation amid nature, fun, adventurous,
              spiritual, and life changing authentic experiences.
            </p>
            <a className="btn btn--book" href={EMAIL_HREF}>Email {EMAIL}</a>
          </div>
          <div className={`frame ${styles.heroImage}`} data-hero-media>
            <Picture name="retreats/shala-cushions" sizes="(min-width: 900px) 42vw, 100vw" priority />
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="what-we-do">
        <div className={`container ${styles.split}`}>
          <div className={`frame ${styles.fillImage}`} data-reveal>
            <Picture name="retreats/retreat-group" sizes="(min-width: 900px) 45vw, 100vw" />
          </div>
          <div className={styles.splitText}>
            <h2 id="what-we-do" className={styles.h2}>What We Do</h2>
            <p>
              Our primary purpose is improving the lives of all who have contact with Bali Lush, whether it be our guests, our
              staff, our village, or ourselves.
            </p>
            <p>Whatever your dream retreat is, we&apos;ll help you make it come to life. Being boutique means we can curate a retreat to meet your needs!</p>
            <p>
              <a href={EMAIL_HREF} className="text-link">Email us</a> to open a discussion about how we can take care of all
              your guests&apos; needs so you can focus on doing what you do best; hosting your retreat.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="rooms">
        <div className="container">
          <div className={styles.rowHead}>
            <h2 id="rooms" className={styles.h2}>Rooms &amp; Accommodations</h2>
            <Link href="/rooms-and-accommodations" className="btn btn--dark">See the four rooms</Link>
          </div>
          <ul className={styles.quad}>
            {['retreats/teak-house-hillside', 'home/teak-bedroom-canopy-bed', 'rooms/dragonfly-desk', 'rooms/cottages-panorama'].map((name) => (
              <li key={name} className="frame" data-reveal>
                <Picture name={name} sizes="(min-width: 900px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Kitchen and yoga shala">
        <div className={`container ${styles.pair}`}>
          <article className={styles.pairItem} aria-labelledby="kitchen">
            <div className={`frame ${styles.pairImage}`} data-reveal>
              <Picture name="menus/retreat-buffet" sizes="(min-width: 900px) 45vw, 100vw" />
            </div>
            <h2 id="kitchen" className={styles.h2}>Our Kitchen</h2>
            <p>
              We are constantly striving to reduce food miles. We grow fruits and vegetables in our gardens and additional
              produce is sourced from our local market and a nearby organic farm.
            </p>
            <p>We are constantly adding to our gardens with the ultimate aim being to make use of every inch of growing space.</p>
            <p>
              We can cater to a range of dietary requirements and for all retreats we communicate in advance with the retreat
              leader to find out more about your guests, their requirements and preferences. It is as important to us as it is
              to you that you guests have an incredible experience.
            </p>
            <Link href="/restaurant" className="btn btn--dark">Learn More</Link>
          </article>
          <article className={styles.pairItem} aria-labelledby="shala">
            <div className={`frame ${styles.pairImage}`} data-reveal>
              <Picture name="retreats/shala-flower-mandala" sizes="(min-width: 900px) 45vw, 100vw" />
            </div>
            <h2 id="shala" className={styles.h2}>The Yoga Shala</h2>
            <p>
              If you looking for a yoga shala with a view, we can certainly provide you with one. Our stunning teak wood yoga
              shala sits at the heart of our resort and is connected to the swimming pool area by an elevated bridge.
            </p>
            <p>The shala offers beautiful views over the adjacent rice terraces and stunning sunrises.</p>
            <p>There is a supply of yoga mats available for those who prefer to travel light.</p>
          </article>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="experiences">
        <div className="container">
          <div className={styles.rowHead}>
            <h2 id="experiences" className={styles.h2}>Experiences &amp; Activities</h2>
            <Link href="/activities" className="btn btn--dark">View Activities</Link>
          </div>
          <ul className={styles.quad}>
            {['activities/waterfall', 'retreats/scooter-rice-fields', 'retreats/offering-lesson', 'retreats/weaving-offering'].map((name) => (
              <li key={name} className="frame" data-reveal>
                <Picture name={name} sizes="(min-width: 900px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="retreat-gallery">
        <div className="container">
          <h2 id="retreat-gallery" className={`${styles.h2} ${styles.galleryTitle}`}>Gallery</h2>
          <Gallery label="Retreat photos" layout="even" items={galleryItems(GALLERY, { sizes: '(min-width: 768px) 33vw, 50vw' })} />
        </div>
      </section>
    </>
  );
}
