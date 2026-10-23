'use client';

import { useState } from 'react';
import styles from './Reviews.module.css';

// Room filter for /reviews. Each review's room comes from content/reviews.json
// (the room link shown on every card of the source page).
export default function ReviewsBrowser({ rooms, items }) {
  const total = items.length;
  const counts = Object.fromEntries(rooms.map((r) => [r.slug, items.filter((i) => i.room === r.slug).length]));
  const [room, setRoom] = useState('all');
  const shown = room === 'all' ? total : counts[room];
  const options = [{ slug: 'all', name: 'All rooms', count: total }, ...rooms.map((r) => ({ ...r, count: counts[r.slug] }))];

  return (
    <div data-filter={room}>
      <div className={styles.filter} role="group" aria-labelledby="filter-label">
        <span id="filter-label" className={styles.filterLabel}>Filter reviews by room</span>
        <div className={styles.filterOptions}>
          {options.map((o) => (
            <button
              key={o.slug}
              type="button"
              className={styles.filterButton}
              aria-pressed={room === o.slug}
              onClick={() => setRoom(o.slug)}
            >
              {o.name} <span className={styles.count}>{o.count}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {shown} {shown === 1 ? 'review' : 'reviews'}
      </p>
      <ul className={styles.masonry}>
        {items.map((item) => (
          <li key={item.id} className={styles.item} hidden={room !== 'all' && item.room !== room}>
            {item.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
