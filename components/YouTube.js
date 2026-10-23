'use client';

import { useState } from 'react';

// Click-to-load embed: nothing from YouTube is requested until the visitor asks for the video.
export default function YouTube({ id, title }) {
  const [active, setActive] = useState(false);

  return (
    <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--night)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="on-dark"
          style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', gap: '0.75rem', width: '100%', border: 0, background: 'transparent', color: 'var(--white)', cursor: 'pointer' }}
        >
          <span style={{ display: 'grid', justifyItems: 'center', gap: '0.75rem' }}>
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M26 21v22l18-11z" fill="currentColor" />
            </svg>
            <span style={{ fontWeight: 700 }}>Play video</span>
            <span style={{ fontSize: 'var(--step--1)', opacity: 0.75 }}>Loads from YouTube</span>
          </span>
        </button>
      )}
    </div>
  );
}
