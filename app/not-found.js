import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container prose" style={{ display: 'grid', gap: 'var(--space-l)', justifyItems: 'start' }}>
        <h1>Page not found</h1>
        <p>The page you were looking for isn&apos;t here.</p>
        <p>
          <Link href="/" className="text-link">Home</Link> · <Link href="/rooms-and-accommodations" className="text-link">Rooms</Link> ·{' '}
          <Link href="/restaurant" className="text-link">Restaurant</Link> · <Link href="/activities" className="text-link">Activities</Link>
        </p>
      </div>
    </section>
  );
}
