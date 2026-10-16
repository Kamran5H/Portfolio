import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Kamran Ashraf — chemist who ships software',
  description: 'Physical chemistry MPhil at QAU Islamabad. I build campus platforms, research tools and automation that people actually use.',
  authors: [{ name: 'Muhammad Kamran Ashraf' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kamran5h.github.io'),
  openGraph: {
    type: 'website',
    title: 'Kamran Ashraf — chemist who ships software',
    description: 'QAU Kalam, Subah, Humanizer, Quidian and 20+ more builds.',
    images: [{ url: '/assets/images/kamran.png', width: 800, height: 800 }],
  },
  icons: { icon: '/assets/images/kamran.png' },
};

export const viewport: Viewport = { themeColor: '#0f0f0d' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
