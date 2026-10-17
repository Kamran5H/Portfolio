import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Muhammad Kamran Ashraf | Physical Chemist & Computational Researcher (QAU)',
  description: 'MPhil Physical Chemistry scholar at Quaid-i-Azam University (QAU) Islamabad, supervised by Prof. Dr. Safeer Ahmed. Research in DFT simulations, electrocatalysis, energy storage materials, and scientific software systems.',
  authors: [{ name: 'Muhammad Kamran Ashraf', url: 'https://github.com/Kamran5H' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kamranashraf.is-a.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Muhammad Kamran Ashraf | Physical Chemist & Computational Researcher',
    description: 'MPhil Physical Chemistry at QAU Islamabad. Quantum ESPRESSO DFT, electrocatalysis for energy systems, QAU Kalam, and 15+ shipped tools.',
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
    description: 'MPhil Physical Chemistry at QAU Islamabad · DFT modelling & electrocatalytic simulations.',
    images: ['/og-image.png'],
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = { themeColor: '#070c18' };


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Kamran Ashraf',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kamranashraf.is-a.dev',
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
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: '.reveal{opacity:1!important;transform:none!important}' }} />
        </noscript>
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
