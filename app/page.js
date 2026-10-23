import Link from 'next/link';
import Picture from '@/components/Picture';
import BookLink from '@/components/BookLink';
import ReviewSlider from '@/components/ReviewSlider';
import { rooms, sliderReviews } from '@/lib/content';
import { posts } from '@/lib/blog';
import { TRIPADVISOR_URL } from '@/lib/site';
import styles from './home.module.css';

export const metadata = {
  title: { absolute: 'Bali Lush | Authentic Bali Retreat | Rooms & Cabins' },
  description:
    'Bali Lush is a cute little boutique resort set among a gorgeous valley of rice terraces and lush landscaping, with two acres of vegetable gardens, fruit orchard and coconut palms in the Rice Bowl of Bali.',
  alternates: { canonical: '/' },
  openGraph: { images: ['/images/home/garden-teak-house-terraces-1200.jpg'] },
};

const GALLERY = [
  'home/teak-cottage-garden',
  'home/bedroom-evening-light',
  'home/swimming-pool',
  'home/teak-bedroom-canopy-bed',
  'home/garden-lily-pond',
  'home/bedroom-rice-view',
  'home/joglo-roof-garden',
  'home/dining-table-garden-doors',
  'home/pool-guests-swimming',
  'home/bedroom-open-windows',
];

const [featuredPost, ...otherPosts] = posts;

const STAFF = ['staff/staff-1', 'staff/staff-2', 'staff/staff-3', 'staff/staff-4', 'staff/staff-5', 'staff/staff-6'];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={`${styles.hero} on-dark`}>
        <div className={styles.heroMedia} data-hero-media>
          {/* On portrait screens the wide panorama is drawn at ~1.8x the screen height */}
          <Picture name="home/garden-teak-house-terraces" sizes="(orientation: portrait) 185vh, 100vw" priority />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>Experience the Authentic Charm of Bali Lush</h1>
          <p className={styles.heroSub}>A Tranquil Sanctuary in Bali&apos;s Rice Bowl</p>
          <div className={styles.heroActions}>
            <BookLink />
            <Link href="/rooms-and-accommodations" className="btn btn--line">
              View the rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className={`container ${styles.intro}`}>
          <p className={`lede ${styles.introLede}`} data-reveal>
            Bali Lush is a cute little boutique resort set among a gorgeous valley of rice terraces and lush landscaping. With
            two acres of property, complete with vegetable gardens, fruit orchard and coconut palms waiting for you to explore.
            Our traditional antique teak wooden houses, brought directly from the central Java region, provide a peak into the
            traditional farming lifestyle of Bali. Our gorgeous guest houses are truly a home away from home hidden in the
            valleys of the Rice Bowl of Bali. Our village provides a truly unique opportunity to meet locals in their home
            environment.
          </p>
          <div className={styles.relax} data-reveal>
            <h2 className={styles.h2}>Relax and Rejuvenate Amidst Lush Landscapes and Village Life</h2>
            <div className="prose">
              <p>
                We offer our guests a chance to escape the crowds and kick back and relax in an environment that offers hiking,
                natural sight-seeing, and traditional village life set amongst the most beautiful rice terraces of Bali.
              </p>
              <p>
                All our guest rooms include air conditioning, a mini bar, an in-room safe, flat screen TVs and DVD&rsquo;s for
                those days you want to stay in.
              </p>
              <p>
                Bali Lush is also available to <Link href="/retreats" className="text-link">host your own retreat</Link>.
              </p>
            </div>
          </div>
          <div className={`frame ${styles.introImage}`} data-reveal>
            <Picture name="home/bungalow-among-palms" sizes="(min-width: 1024px) 34vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className={`section section--sand ${styles.rooms}`} aria-labelledby="rooms-heading">
        <div className="container">
          <div className={styles.roomsHead}>
            <h2 id="rooms-heading" className={styles.h2}>Cottages &amp; Bungalows</h2>
            <div className={styles.roomsCta}>
              <p>View Availability &amp; Book your Stay</p>
              <BookLink />
            </div>
          </div>
          <ul className={styles.roomGrid}>
            {rooms.map((room) => (
              <li key={room.slug} className={styles.roomItem} data-reveal>
                <Link href={room.href} className={styles.roomLink}>
                  <div className={`frame ${styles.roomImage}`}>
                    <Picture name={room.card} sizes="(min-width: 1100px) 24vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                  <h3 className={styles.roomName}>{room.name}</h3>
                  <p className={styles.roomFacts}>
                    <span>Suitable for {room.suitableFor}</span>
                    <span>Sleeps {room.sleeps}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="section" aria-labelledby="teak-heading">
        <div className={`container ${styles.galleryHead}`} data-reveal>
          <h2 id="teak-heading" className={styles.h2}>Unique Teak Bungalows in Bali&apos;s Stunning Valleys</h2>
          <p className={styles.galleryText}>
            While we are passionate about providing an authentic experience, we don&rsquo;t believe you have to sacrifice the
            comforts of home. Our bungalows, cottages and rooms make sure you don&rsquo;t have to.
          </p>
        </div>
        <div className={styles.strip} tabIndex={0} role="region" aria-label="Photos of the property (scrolls horizontally)">
          <ul className={styles.stripList}>
            {GALLERY.map((name) => (
              <li key={name} className={styles.stripItem}>
                <Picture name={name} sizes="(min-width: 768px) 40vw, 80vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.reviews} on-dark`} aria-labelledby="reviews-heading">
        <div className={styles.reviewsMedia} aria-hidden="true">
          <Picture name="restaurant/garden-joglo-pool" sizes="(min-width: 1024px) 40vw, 100vw" alt="" />
        </div>
        <div className={`container ${styles.reviewsInner}`}>
          <h2 id="reviews-heading" className={styles.reviewsHeading}>What Clients Say</h2>
          <ReviewSlider reviews={sliderReviews} />
          <p className={styles.reviewsLinks}>
            <Link href="/reviews">All guest reviews</Link>
            <a href={TRIPADVISOR_URL} target="_blank" rel="noopener">
              Read More Bali Lush Reviews &amp; Tips on Tripadvisor.com
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>

      {/* Kitchen + activities */}
      <section className="section" aria-label="Lush Kitchen and activities">
        <div className={`container ${styles.pair}`}>
          <article className={styles.pairItem} data-reveal>
            <div className={`frame ${styles.pairImage}`}>
              <Picture name="restaurant/mie-goreng-plates" sizes="(min-width: 900px) 46vw, 100vw" />
            </div>
            <h2 className={styles.h3}>Lush Kitchen</h2>
            <p>
              The menu changes daily based on what is in season and growing in our gardens. Explore our sample menu, and if you
              see something you would like during your stay with us, just let us know, and we will make it for you. We want you
              to be happy at Bali Lush and will always accommodate your requests if we can do so.
            </p>
            <Link href="/lunch-and-dinner" className="btn btn--dark">View Sample Menu</Link>
          </article>
          <article className={styles.pairItem} data-reveal>
            <div className={`frame ${styles.pairImage}`}>
              <Picture name="activities/waterfall-swim" sizes="(min-width: 900px) 46vw, 100vw" />
            </div>
            <h2 className={styles.h3}>Activities &amp; Things To Do</h2>
            <p>
              When you need a break from relaxation, and want to get out there and do something, we offer a breath of
              activities. From outdoor hikes and waterfall explorations, to crafting and cooking lessons, trips to local
              markets, motorbike excursions and a range of unique guided tours.
            </p>
            <Link href="/activities" className="btn btn--dark">Explore Activities</Link>
          </article>
        </div>
      </section>

      {/* Staff */}
      <section className="section section--sand section--tight" aria-labelledby="staff-heading">
        <div className={`container ${styles.staff}`}>
          <h2 id="staff-heading" className={styles.h3}>Our Friendly Staff</h2>
          <ul className={styles.staffGrid}>
            {STAFF.map((name) => (
              <li key={name} className="frame" data-reveal>
                <Picture name={name} sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Blog: latest post featured, the rest as a compact list beside it */}
      <section className={`section ${styles.blogSection}`} aria-labelledby="blog-heading">
        <div className={`container ${styles.blogInner}`}>
          <div className={styles.blogHead}>
            <h2 id="blog-heading" className={styles.h2}>Around the Property &amp; Beyond</h2>
            <div className={styles.blogIntro}>
              <p>Get to learn more about Bali Lush, the property and the surrounding culture. Explore some articles and posts!</p>
              <Link href="/blog" className="text-link">All posts</Link>
            </div>
          </div>
          <div className={styles.blogGrid}>
            <Link href={featuredPost.route} className={styles.blogFeature} data-reveal>
              <div className={`frame ${styles.blogFeatureImage}`}>
                <Picture name={featuredPost.cover} sizes="(min-width: 900px) 55vw, 100vw" alt="" />
              </div>
              <div className={styles.blogFeatureText}>
                <time dateTime={featuredPost.isoDate} className={styles.blogDate}>{featuredPost.date}</time>
                <h3 className={styles.blogFeatureTitle}>{featuredPost.title}</h3>
                {featuredPost.excerpt && <p className={styles.blogExcerpt}>{featuredPost.excerpt}</p>}
              </div>
            </Link>
            <ul className={styles.blogList}>
              {otherPosts.map((post) => (
                <li key={post.route} data-reveal>
                  <Link href={post.route} className={styles.blogItem}>
                    <div className={`frame ${styles.blogThumb}`}>
                      <Picture name={post.cover} sizes="(min-width: 640px) 160px, 112px" alt="" />
                    </div>
                    <div className={styles.blogItemText}>
                      <time dateTime={post.isoDate} className={styles.blogDate}>{post.date}</time>
                      <h3 className={styles.blogTitle}>{post.title}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
