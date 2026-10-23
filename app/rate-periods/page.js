import Picture from '@/components/Picture';
import BookLink from '@/components/BookLink';
import { ratePeriods } from '@/lib/content';
import styles from './rates.module.css';

export const metadata = {
  title: 'Seasonal Rates',
  description: 'Seasonal rate periods at Bali Lush. Nightly rates and availability are shown on the Bali Lush booking page.',
  alternates: { canonical: '/rate-periods' },
  openGraph: { images: ['/images/home/garden-lily-pond-800.jpg'] },
};

// Re-generated daily so periods that have ended drop off the list (audit 09 §3).
export const revalidate = 86400;

const SEASON_LABEL = { peak: 'Peak', mid: 'Mid', low: 'Low', special: 'Special' };

export default function RatePeriodsPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const rows = ratePeriods.filter((r) => r.disputed || new Date(r.till) >= today);
  const isCurrent = (r) => !r.disputed && new Date(r.from) <= today && new Date(r.till) >= today;

  return (
    <>
      <header className={`container ${styles.head}`}>
        <div className={styles.headText}>
          <h1>Seasonal Rate Periods</h1>
          <p className="lede">Nightly rates and availability are shown on the Bali Lush booking page.</p>
          <BookLink />
        </div>
        <div className={`frame ${styles.headImage}`} data-hero-media>
          <Picture name="home/garden-lily-pond" sizes="(min-width: 900px) 36vw, 100vw" priority />
        </div>
      </header>

      <section className="section section--tight" aria-labelledby="periods">
        <div className="container">
          <h2 id="periods" className={styles.h2}>Season dates</h2>
          {/*
            F1: the source popup, promo strip and this table state different free-night offers, so the
            "Free nights" column is withheld until the owner confirms the current offers.
            F2: rows with year errors keep their label but show "Dates to be confirmed".
          */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Seasonal rate period</th>
                <th scope="col">From</th>
                <th scope="col">Till</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.index} data-season={r.season} data-current={isCurrent(r) || undefined}>
                  <th scope="row">
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.period}>{r.period}</span>
                    <span className="visually-hidden"> ({SEASON_LABEL[r.season]} season)</span>
                    {isCurrent(r) && <span className={styles.current}>Current period</span>}
                  </th>
                  {r.disputed ? (
                    <td colSpan={2} className={styles.tbc}>
                      Dates to be confirmed
                    </td>
                  ) : (
                    <>
                      <td data-label="From">{r.from}</td>
                      <td data-label="Till">{r.till}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
