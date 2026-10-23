import Picture from '@/components/Picture';
import ReviewCard from '@/components/ReviewCard';
import ReviewsBrowser from '@/components/ReviewsBrowser';
import { reviews, rooms } from '@/lib/content';
import { TRIPADVISOR_URL } from '@/lib/site';
import styles from './reviews.module.css';

export const metadata = {
  title: 'Guest Reviews & Testimonials',
  description: 'People from all over the world have come to stay at Bali Lush. Explore some testimonials from our guests.',
  alternates: { canonical: '/reviews' },
  openGraph: { images: ['/images/reviews/pool-terraces-1024.jpg'] },
};

export default function ReviewsPage() {
  return (
    <>
      <header className={`container ${styles.head}`}>
        <div className={styles.headText}>
          <h1>What Guests are Saying</h1>
          <p className="lede">
            People from all over the world have come to stay at Bali Lush. Explore some testimonials from our guests.
          </p>
        </div>
        <div className={`frame ${styles.headImage}`} data-hero-media>
          <Picture name="reviews/pool-terraces" sizes="(min-width: 900px) 40vw, 100vw" priority />
        </div>
      </header>

      <section className="section section--sand" aria-label="Reviews">
        <div className="container">
          <ReviewsBrowser
            rooms={rooms.map((r) => ({ slug: r.slug, name: r.name }))}
            items={reviews.map((r) => ({ id: r.id, room: r.roomSlug, node: <ReviewCard review={r} /> }))}
          />
          <p className={styles.tripadvisor}>
            <a href={TRIPADVISOR_URL} target="_blank" rel="noopener" className="text-link">
              Read More Bali Lush Reviews &amp; Tips on Tripadvisor.com
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
