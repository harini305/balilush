import { Fragment } from 'react';
import Link from 'next/link';
import Picture from '@/components/Picture';
import { activities, activitiesIntro, combinedPackage } from '@/lib/content';
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@/lib/site';
import styles from './activities.module.css';

export const metadata = {
  title: 'Activities & Adventures',
  description: `Activities & Things to Do at Bali Lush. ${activitiesIntro}`,
  alternates: { canonical: '/activities' },
  openGraph: { images: ['/images/activities/waterfall-1200.jpg'] },
};

function PriceList({ prices }) {
  return (
    <dl className={styles.prices}>
      {prices.map((p) => (
        <div key={p.label + p.amount} className={styles.priceRow}>
          <dt>{p.label}</dt>
          <dd>
            <span className="price">{p.amount}</span>
            {p.note && <span className={styles.priceNote}>({p.note})</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Paragraph({ text }) {
  // Yoga: the source's "Please check our Retreats page here." links to /retreats.
  if (text.endsWith('Please check our Retreats page here.')) {
    return (
      <p>
        {text.replace('here.', '')}
        <Link href="/retreats" className="text-link">here</Link>.
      </p>
    );
  }
  return <p>{text}</p>;
}

export default function ActivitiesPage() {
  return (
    <>
      <header className={`${styles.hero} on-dark`}>
        <div className={styles.heroMedia} data-hero-media>
          <Picture name="activities/waterfall" sizes="100vw" priority />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <h1>Activities &amp; Things to Do</h1>
          <p className={styles.heroIntro}>{activitiesIntro}</p>
        </div>
      </header>

      <nav className={styles.index} aria-label="Activities on this page">
        <ol className="container">
          {activities.map((a) => (
            <li key={a.slug}>
              <a href={`#${a.slug}`}>{a.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={`container ${styles.list}`}>
        {activities.map((a) => (
          <Fragment key={a.slug}>
            <article id={a.slug} className={styles.activity}>
              <div className={`frame ${styles.image}`}>
                <Picture name={a.image} sizes="(min-width: 1100px) 300px, (min-width: 720px) 240px, 100vw" />
              </div>
              <div className={styles.body}>
                <h2 className={styles.title}>{a.title}</h2>
                <div className={styles.text}>
                  {a.paragraphs.map((p) => <Paragraph key={p} text={p} />)}
                </div>
              </div>
              <aside className={styles.priceBox} aria-label={`${a.title} prices`}>
                {a.prices.length > 0 ? (
                  <PriceList prices={a.prices} />
                ) : (
                  <p className={styles.free}>No charge. Please bring something to donate to the school.</p>
                )}
                {a.hasCombined && (
                  <p className={styles.combinedLink}>
                    Also available: <a href="#combined-cooking-and-market">{combinedPackage.title}</a>
                  </p>
                )}
              </aside>
            </article>

            {a.slug === 'morning-market-visits' && (
              <section id="combined-cooking-and-market" className={styles.combined} aria-labelledby="combined-title">
                <h2 id="combined-title" className={styles.combinedTitle}>{combinedPackage.title}</h2>
                <PriceList prices={combinedPackage.prices} />
              </section>
            )}
          </Fragment>
        ))}
      </div>

      <section className={styles.contact} aria-label="Contact">
        <div className="container">
          <p>
            To arrange an activity, contact Bali Lush on <a href={PHONE_HREF}>{PHONE}</a> or{' '}
            <a href={EMAIL_HREF}>{EMAIL}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
