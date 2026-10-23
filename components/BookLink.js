import Link from 'next/link';
import { BOOK_PAGE } from '@/lib/site';

// Goes to the on-site booking page (Cloudbeds embedded). It is the same page for every room:
// no room-specific booking links exist.
export default function BookLink({ children = 'Book your stay', className = '', variant = 'book' }) {
  return (
    <Link className={`btn btn--${variant} ${className}`} href={BOOK_PAGE}>
      {children}
    </Link>
  );
}
