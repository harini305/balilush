import Link from 'next/link';
import ReviewText from './ReviewText';
import styles from './Reviews.module.css';

export default function ReviewCard({ review, showRoom = true }) {
  return (
    <figure className={styles.card}>
      {showRoom && (
        <Link href={review.roomHref} className={styles.room}>
          {review.room}
        </Link>
      )}
      <blockquote className={styles.quote}>
        <ReviewText paragraphs={review.paragraphs} />
      </blockquote>
      <figcaption className={styles.author}>
        <span className={styles.name}>{review.name}</span>
        {review.location && <span className={styles.location}>{review.location}</span>}
      </figcaption>
    </figure>
  );
}
