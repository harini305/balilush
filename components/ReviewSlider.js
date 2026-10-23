'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Reviews.module.css';

// The seven titled testimonials from the source home slider. Manual navigation only.
export default function ReviewSlider({ reviews }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const count = reviews.length;
  const go = (delta) => setIndex((i) => (i + delta + count) % count);
  const review = reviews[index];

  return (
    <div
      className={styles.slider}
      role="region"
      aria-roledescription="carousel"
      aria-label="Guest testimonials"
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <div className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`} aria-live="polite" key={index}>
        <h3 className={styles.slideTitle}>{review.sliderTitle}</h3>
        <blockquote className={styles.slideQuote}>
          {review.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </blockquote>
        <p className={styles.slideAuthor}>
          {review.name}
          {review.location ? `, ${review.location}` : ''} · <Link href={review.roomHref}>{review.room}</Link>
        </p>
      </div>
      <div className={styles.sliderControls}>
        <button type="button" className={styles.arrow} onClick={() => go(-1)}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          <span className="visually-hidden">Previous testimonial</span>
        </button>
        <span className={styles.position} aria-hidden="true">{index + 1} / {count}</span>
        <button type="button" className={styles.arrow} onClick={() => go(1)}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          <span className="visually-hidden">Next testimonial</span>
        </button>
      </div>
    </div>
  );
}
