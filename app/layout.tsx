import type { Metadata } from 'next';
import { Outfit, Space_Grotesk, Fira_Code } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-main',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muhammad Kamran Ashraf | Physical Chemist & Computational Researcher',
  description: 'Official academic and computational portfolio of Muhammad Kamran Ashraf, MPhil Physical Chemistry scholar at Quaid-i-Azam University (QAU) Islamabad, supervised by Prof. Dr. Safeer Ahmed. Research in Ce-doped NiCo-MOFs, electrocatalysis, and scientific software.',
  keywords: [
    'Muhammad Kamran Ashraf',
    'Physical Chemistry',
    'Quaid-i-Azam University',
    'Safeer Ahmed',
    'Ce-doped NiCo-MOF',
    'Electrochemical Biosensors',
    'Zinc-Air Batteries',
    'DFT simulations',
    'Punjab University'
  ],
  authors: [{ name: 'Muhammad Kamran Ashraf' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kamran5h.github.io'),
  openGraph: {
    type: 'website',
    url: 'https://kamran5h.github.io/',
    title: 'Muhammad Kamran Ashraf | Physical Chemist & Computational Researcher',
    description: 'MPhil Physical Chemistry Scholar @ QAU Islamabad. Exploring Cerium electronic modulation on bimetallic MOFs, Zn-air battery mechanics, and scientific software.',
    images: [
      {
        url: '/assets/images/kamran.png',
        width: 800,
        height: 800,
        alt: 'Muhammad Kamran Ashraf Portrait',
      },
    ],
  },
  icons: {
    icon: '/assets/images/kamran.png',
    apple: '/assets/images/kamran.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={`${outfit.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/assets/images/kamran.png" />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-main)] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
