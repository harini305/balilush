import { BOOKING_URL } from '@/lib/site';
import styles from './book.module.css';

export const metadata = {
  title: 'Book Your Stay',
  description: 'Check availability and book your stay at Bali Lush.',
  alternates: { canonical: '/book' },
};

// The genuine Bali Lush booking engine (Cloudbeds) embedded on the site. Dates, rooms,
// rates and payment are all handled by Cloudbeds; nothing is booked by this site itself.
export default function BookPage() {
  return (
    <section className={styles.page} aria-labelledby="book-title">
      <div className={`container ${styles.head}`}>
        <h1 id="book-title" className={styles.title}>Book Your Stay</h1>
        <p className={styles.note}>
          Choose your dates and room below. If the booking form doesn&apos;t load,{' '}
          <a href={BOOKING_URL} target="_blank" rel="noopener">
            open it in a new tab
          </a>
          .
        </p>
      </div>
      <div className={styles.frameWrap}>
        <iframe
          className={styles.frame}
          src={BOOKING_URL}
          title="Bali Lush booking (Cloudbeds)"
          allow="payment"
        />
      </div>
    </section>
  );
}
