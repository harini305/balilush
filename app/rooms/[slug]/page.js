import Link from 'next/link';
import { notFound } from 'next/navigation';
import Picture from '@/components/Picture';
import BookLink from '@/components/BookLink';
import Gallery from '@/components/Gallery';
import ReviewCard from '@/components/ReviewCard';
import { getRoom, reviewsForRoom, rooms } from '@/lib/content';
import { galleryItems } from '@/lib/gallery';
import styles from './room.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return {
    title: room.name,
    description: `${room.name} at Bali Lush. Suitable for ${room.suitableFor}, sleeps ${room.sleeps}. ${room.teaser}`,
    alternates: { canonical: room.href },
    openGraph: { images: [`/images/${room.card}-800.jpg`] },
  };
}

export default async function RoomPage({ params }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const roomReviews = reviewsForRoom(room).slice(0, 4);
  const others = rooms.filter((r) => r.slug !== room.slug);
  const isDuck = room.slug === 'duck-cottage';

  return (
    <>
      <header className={styles.head}>
        <div className={`container ${styles.headInner}`}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/rooms-and-accommodations">Rooms</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{room.name}</span>
          </nav>
          <h1 className={styles.title}>{room.name}</h1>
          <dl className={styles.facts}>
            <div>
              <dt>Suitable for</dt>
              <dd>{room.suitableFor}</dd>
            </div>
            <div>
              <dt>Sleeps</dt>
              <dd>{room.sleeps}</dd>
            </div>
          </dl>
          <div className={styles.book}>
            <BookLink />
            <p className={styles.bookNote}>Opens the Bali Lush booking page, where you choose your dates and room.</p>
          </div>
        </div>
      </header>

      <section className="container" aria-label={`${room.name} photos`}>
        <Gallery
          label={`${room.name} photos`}
          items={galleryItems(room.gallery, { firstSizes: '(min-width: 768px) 50vw, 100vw' })}
        />
      </section>

      <section className="section">
        <div className={`container ${styles.details}`}>
          <div className={styles.description}>
            <h2 className="visually-hidden">About the room</h2>
            {(isDuck ? room.description.slice(0, -1) : room.description).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className={styles.bedsBox}>
              <h3 className={styles.boxTitle}>{isDuck ? room.description.at(-1) : 'Bed configuration'}</h3>
              <ul>
                {room.bedConfigurations.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </div>
          <div className={styles.amenities}>
            <h2 className={styles.h2}>Amenities</h2>
            <ul>
              {room.amenities.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {roomReviews.length > 0 && (
        <section className="section section--sand" aria-labelledby="room-reviews">
          <div className="container">
            <div className={styles.reviewsHead}>
              <h2 id="room-reviews" className={styles.h2}>Reviews from This Room</h2>
              <Link href="/reviews" className="text-link">View All Testimonials</Link>
            </div>
            <ul className={styles.reviewGrid}>
              {roomReviews.map((r) => (
                <li key={r.id} data-reveal>
                  <ReviewCard review={r} showRoom={false} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="other-rooms">
        <div className="container">
          <h2 id="other-rooms" className={styles.h2}>Explore Other Rooms</h2>
          <ul className={styles.others}>
            {others.map((r) => (
              <li key={r.slug} data-reveal>
                <Link href={r.href} className={styles.other}>
                  <div className="frame">
                    <Picture name={r.card} sizes="(min-width: 768px) 30vw, 100vw" alt="" />
                  </div>
                  <span className={styles.otherName}>{r.name}</span>
                  <span className={styles.otherFacts}>Suitable for {r.suitableFor} · Sleeps {r.sleeps}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
