'use client';

import { useEffect } from 'react';

// Publishes the footer's rendered height as --footer-h so a closing section can size itself
// to share the last screen with the footer. Layouts fall back to a fixed estimate without JS.
export default function FooterHeight() {
  useEffect(() => {
    const footer = document.querySelector('body > footer');
    if (!footer) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--footer-h', `${footer.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(footer);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--footer-h');
    };
  }, []);

  return null;
}
