import Link from 'next/link';
import Picture from '@/components/Picture';
import BookLink from '@/components/BookLink';
import { rooms } from '@/lib/content';
import styles from './rooms.module.css';

export const metadata = {
  title: 'Rooms & Accommodations',
  description:
    'Explore our rooms and book your stay: Butterfly Room, Dragonfly Room, Frog Bungalow and Duck Cottage, antique teak houses set among the rice terraces at Bali Lush.',
  alternates: { canonical: '/rooms-and-accommodations' },
  openGraph: { images: ['/images/rooms/cottages-panorama-981.jpg'] },
};

export default function RoomsPage() {
  return (
    <>
      <header className={`container ${styles.head}`}>
        <h1>Cottages &amp; Bungalows</h1>
        <div className={styles.headText}>
          {/* F8: the source's "parties of 2 to … 5" sentence overstates Butterfly and Frog; each room's own "Sleeps" figure is shown below instead. */}
          <p className="lede">Explore our rooms and book your stay. Select a room to see additional details.</p>
          <BookLink />
        </div>
      </header>

      <div className={`container ${styles.panorama}`}>
        <div className="frame" data-hero-media>
          <Picture name="rooms/cottages-panorama" sizes="(min-width: 1320px) 1240px, 100vw" priority />
        </div>
      </div>

      <section className="section" aria-label="Rooms">
        <ol className={`container ${styles.list}`}>
          {rooms.map((room, i) => (
            <li key={room.slug} className={styles.row} data-reveal>
              <Link href={room.href} className={`frame ${styles.image}`} tabIndex={-1} aria-hidden="true">
                <Picture name={room.card} sizes="(min-width: 900px) 42vw, 100vw" priority={i === 0} alt="" />
              </Link>
              <div className={styles.body}>
                <h2 className={styles.name}>
                  <Link href={room.href}>{room.name}</Link>
                </h2>
                <p className={styles.teaser}>{room.teaser}</p>
                <dl className={styles.facts}>
                  <div>
                    <dt>Suitable for</dt>
                    <dd>{room.suitableFor}</dd>
                  </div>
                  <div>
                    <dt>Sleeps</dt>
                    <dd>{room.sleeps}</dd>
                  </div>
                  <div className={styles.beds}>
                    <dt>Beds</dt>
                    <dd>
                      <ul>
                        {room.bedConfigurations.map((b) => <li key={b}>{b}</li>)}
                      </ul>
                    </dd>
                  </div>
                </dl>
                <div className={styles.actions}>
                  <Link href={room.href} className="btn btn--dark">
                    View {room.name}
                  </Link>
                  <BookLink variant="line">Book your stay</BookLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
