import Link from 'next/link';
import { BOOK_PAGE, COPYRIGHT, EMAIL, EMAIL_HREF, FOOTER_NAV, PHONE, PHONE_HREF } from '@/lib/site';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/bali-lush-logo.png" alt="Bali Lush" width="532" height="196" loading="lazy" />
          <Link className="btn btn--book" href={BOOK_PAGE}>
            Book Now / Check Availability
          </Link>
        </div>

        <nav aria-label="Footer" className={styles.nav}>
          <ul>
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className={styles.contact}>
          <a href={PHONE_HREF}>{PHONE}</a>
          <a href={EMAIL_HREF}>{EMAIL}</a>
        </address>
      </div>
      <div className={`container ${styles.legal}`}>
        <p>{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
