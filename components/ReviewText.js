'use client';

import { useId, useState } from 'react';
import styles from './Reviews.module.css';

const LIMIT = 420;

// Verbatim review paragraphs. Long reviews start as an excerpt with a "Read more" toggle;
// the full text is always in the DOM for search engines and screen readers.
export default function ReviewText({ paragraphs }) {
  const id = useId();
  const total = paragraphs.join(' ').length;
  const long = total > LIMIT;
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.textWrap}>
      <div id={id} className={styles.text} data-clamped={long && !open ? '' : undefined}>
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {long && (
        <button type="button" className={styles.more} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
