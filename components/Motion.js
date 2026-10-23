'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Site-wide, restrained motion. Content is fully visible without JavaScript; only elements
// that start below the fold are prepared for a reveal, so nothing above the fold flashes.
//   [data-reveal]      fades/rises in once when scrolled into view
//   [data-hero-media]  settles from a slight zoom on page load
export default function Motion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = document.querySelector('[data-hero-media] img');
      if (hero) gsap.fromTo(hero, { scale: 1.06 }, { scale: 1, duration: 1.6, ease: 'power2.out' });

      const fold = window.innerHeight;
      const targets = gsap.utils
        .toArray('[data-reveal]')
        .filter((el) => el.getBoundingClientRect().top > fold);
      if (!targets.length) return;

      gsap.set(targets, { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(targets, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08, overwrite: true }),
      });
    });

    // Images and fonts can change layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
