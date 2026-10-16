import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Muhammad Kamran Ashraf | Physical Chemist & Computational Researcher (QAU)',
  description: 'MPhil Physical Chemistry scholar at Quaid-i-Azam University (QAU) Islamabad, supervised by Prof. Dr. Safeer Ahmed. Research in DFT simulations, Ce-doped NiCo MOFs, electrocatalysis, and 20+ software engines.',
  authors: [{ name: 'Muhammad Kamran Ashraf', url: 'https://github.com/Kamran5H' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kamran5h.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kamran5h.github.io',
    title: 'Muhammad Kamran Ashraf | Physical Chemist & Computational Researcher',
    description: 'MPhil Physical Chemistry at QAU Islamabad. Quantum ESPRESSO DFT, Ce-NiCo MOFs for Zn-air batteries, QAU Kalam, and 20+ shipped tools.',
    siteName: 'Muhammad Kamran Ashraf Portfolio',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Muhammad Kamran Ashraf — Physical Chemist & Computational Researcher',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Kamran Ashraf | Physical Chemist & Software Builder',
    description: 'MPhil Physical Chemistry at QAU Islamabad · Ce-NiCo MOFs & electrocatalytic simulations.',
    images: ['/og-image.png'],
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = { themeColor: '#0f0f0d' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Kamran Ashraf',
  url: 'https://kamran5h.github.io',
  jobTitle: 'Computational Physical Chemist & Software Engineer',
  worksFor: {
    '@type': 'CollegeOrUniversity',
    name: 'Quaid-i-Azam University',
    location: 'Islamabad, Pakistan',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of the Punjab',
    },
  ],
  sameAs: [
    'https://github.com/Kamran5H',
    'https://orcid.org/0009-0003-2997-2954',
    'https://www.linkedin.com/in/kamran-ashraf-762a21363/',
    'https://www.instagram.com/muhammad.kamran.ashraf',
    'https://www.facebook.com/chkamran32b',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
