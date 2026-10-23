'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BOOK_PAGE, EMAIL, EMAIL_HREF, NAV, PHONE, PHONE_HREF } from '@/lib/site';
import styles from './SiteHeader.module.css';

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  if (href === '/rooms-and-accommodations') return pathname === href || pathname.startsWith('/rooms/');
  if (href === '/blog') return pathname === href || pathname.startsWith('/post/');
  return pathname === href;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerSubOpen, setDrawerSubOpen] = useState(false);
  const dropdownRef = useRef(null);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setDropdownOpen(false);
  }
  useEffect(() => {
    drawerRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointer = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setDropdownOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        dropdownRef.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [dropdownOpen]);

  const openDrawer = () => {
    const dialog = drawerRef.current;
    if (!dialog) return;
    setDrawerSubOpen(pathname === '/restaurant' || pathname === '/breakfast' || pathname === '/lunch-and-dinner');
    dialog.showModal();
    document.documentElement.classList.add('scroll-locked');
  };

  const closeDrawer = () => drawerRef.current?.close();

  const onDrawerClose = () => {
    document.documentElement.classList.remove('scroll-locked');
    menuButtonRef.current?.focus();
  };

  // Clicking the dimmed backdrop (the dialog element itself) closes the drawer.
  const onDrawerClick = (e) => {
    if (e.target === drawerRef.current) closeDrawer();
  };

  return (
    <header className={`${styles.header} on-dark`} data-scrolled={scrolled || undefined}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="Bali Lush home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/bali-lush-logo.png" alt="Bali Lush" width="532" height="196" />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {NAV.map((item) =>
              item.children ? (
                <li key={item.href} className={styles.hasDropdown} ref={dropdownRef} data-open={dropdownOpen || undefined}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    className={styles.dropdownToggle}
                    aria-expanded={dropdownOpen}
                    aria-controls="restaurant-menu"
                    onClick={() => setDropdownOpen((v) => !v)}
                  >
                    <span className="visually-hidden">{item.label} menus</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>
                  <ul id="restaurant-menu" className={styles.dropdown}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} aria-current={pathname === child.href ? 'page' : undefined}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link
            className={`btn btn--book ${styles.book}`}
            href={BOOK_PAGE}
            aria-current={pathname === BOOK_PAGE ? 'page' : undefined}
          >
            <span className={styles.bookLong} aria-hidden="true">Book your stay</span>
            <span className={styles.bookShort} aria-hidden="true">Book</span>
            <span className="visually-hidden">Book your stay</span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-haspopup="dialog"
            aria-controls="site-drawer"
            onClick={openDrawer}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <span className="visually-hidden">Open menu</span>
          </button>
        </div>
      </div>

      <dialog
        id="site-drawer"
        ref={drawerRef}
        className={`${styles.drawer} on-dark`}
        aria-label="Menu"
        onClose={onDrawerClose}
        onClick={onDrawerClick}
      >
        <div className={styles.drawerPanel}>
          <div className={styles.drawerTop}>
            <span className={styles.drawerTitle}>Menu</span>
            <button type="button" className={styles.closeButton} onClick={closeDrawer}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <span className="visually-hidden">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className={styles.drawerList}>
              <li>
                <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
              </li>
              {NAV.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <>
                      <div className={styles.drawerRow}>
                        <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className={styles.subToggle}
                          aria-expanded={drawerSubOpen}
                          aria-controls="drawer-restaurant"
                          onClick={() => setDrawerSubOpen((v) => !v)}
                        >
                          <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                            <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          </svg>
                          <span className="visually-hidden">Show {item.label} menus</span>
                        </button>
                      </div>
                      <ul id="drawer-restaurant" className={styles.drawerSub} hidden={!drawerSubOpen}>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} aria-current={pathname === child.href ? 'page' : undefined}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.drawerFoot}>
            <Link className="btn btn--book" href={BOOK_PAGE}>
              Book your stay
            </Link>
            <a href={PHONE_HREF}>{PHONE}</a>
            <a href={EMAIL_HREF}>{EMAIL}</a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
