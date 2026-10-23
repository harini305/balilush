'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Gallery.module.css';

// Thumbnail grid (server-rendered <picture> elements passed as `items[].thumb`) that opens
// a full-screen viewer. Keyboard: ←/→ to move, Esc to close. Touch: swipe left/right.
export default function Gallery({ items, label, layout = 'mosaic' }) {
  const dialogRef = useRef(null);
  const triggerRefs = useRef([]);
  const touchStart = useRef(null);
  const [index, setIndex] = useState(null);

  const count = items.length;
  const go = useCallback((delta) => setIndex((i) => (i + delta + count) % count), [count]);

  const open = (i) => {
    setIndex(i);
    dialogRef.current?.showModal();
    document.documentElement.classList.add('scroll-locked');
  };

  const close = () => dialogRef.current?.close();

  const onClose = () => {
    document.documentElement.classList.remove('scroll-locked');
    triggerRefs.current[index]?.focus();
    setIndex(null);
  };

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  useEffect(() => () => document.documentElement.classList.remove('scroll-locked'), []);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const current = index !== null ? items[index] : null;
  // The mosaic shows at most five tiles; the viewer still steps through every photo.
  const visible = layout === 'mosaic' ? items.slice(0, 5) : items;
  const extra = count - visible.length;

  return (
    <>
      <ul className={`${styles.grid} ${styles[layout]}`} data-count={visible.length} aria-label={label}>
        {visible.map((item, i) => (
          <li key={item.src} className={styles.cell}>
            <button
              type="button"
              ref={(el) => { triggerRefs.current[i] = el; }}
              className={styles.thumb}
              onClick={() => open(i)}
            >
              {item.thumb}
              {extra > 0 && i === visible.length - 1 && (
                <span className={styles.more} aria-hidden="true">+{extra} photos</span>
              )}
              <span className="visually-hidden">View photo {i + 1} of {count} full screen</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label={`${label}: photo viewer`}
        onClose={onClose}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {current && (
          <figure className={styles.stage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} srcSet={current.srcSet} sizes="100vw" alt={current.alt} width={current.width} height={current.height} />
            <figcaption className={styles.counter} aria-live="polite">
              {index + 1} / {count}
              {current.caption ? <span> — {current.caption}</span> : null}
            </figcaption>
          </figure>
        )}
        <button type="button" className={`${styles.control} ${styles.close}`} onClick={close} autoFocus>
          <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" /></svg>
          <span className="visually-hidden">Close photo viewer</span>
        </button>
        {count > 1 && (
          <>
            <button type="button" className={`${styles.control} ${styles.prev}`} onClick={() => go(-1)}>
              <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
              <span className="visually-hidden">Previous photo</span>
            </button>
            <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => go(1)}>
              <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
              <span className="visually-hidden">Next photo</span>
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
