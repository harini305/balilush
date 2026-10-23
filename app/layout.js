import { Assistant, Source_Serif_4 } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Motion from '@/components/Motion';
import FooterHeight from '@/components/FooterHeight';
import { SITE_URL } from '@/lib/site';
import './globals.css';

// Exactly two families: Source Serif 4 for headings, Assistant (from the original site) for everything else.
const serif = Source_Serif_4({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-serif', display: 'swap' });
const sans = Assistant({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bali Lush | Authentic Bali Retreat | Rooms & Cabins',
    template: '%s | Bali Lush',
  },
  description:
    'Bali Lush is a cute little boutique resort set among a gorgeous valley of rice terraces and lush landscaping in the Rice Bowl of Bali.',
  openGraph: { siteName: 'Bali Lush', type: 'website', locale: 'en' },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#0f100e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Motion />
        <FooterHeight />
      </body>
    </html>
  );
}
