import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
  Gulzar,
} from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const urdu = Gulzar({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Muhammad Kamran Ashraf | Physical Chemist & Computational Researcher (QAU)",
  description:
    "MPhil Physical Chemistry scholar at Quaid-i-Azam University (QAU) Islamabad, supervised by Prof. Dr. Safeer Ahmed. Research in DFT simulations, electrocatalysis, energy storage materials, and scientific software systems.",
  authors: [
    { name: "Muhammad Kamran Ashraf", url: "https://github.com/Kamran5H" },
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://kamranashraf.is-a.dev",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title:
      "Muhammad Kamran Ashraf | Physical Chemist & Computational Researcher",
    description:
      "MPhil Chemistry researcher at QAU Islamabad. Electrocatalysis, Quantum ESPRESSO DFT, energy materials, and open-source scientific software.",
    siteName: "Muhammad Kamran Ashraf Portfolio",
    images: [
      {
        url: "/images/certificate-presentation.jpg",
        width: 2560,
        height: 2197,
        alt: "Muhammad Kamran Ashraf receiving a certificate at an academic event",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Kamran Ashraf | Physical Chemist & Software Builder",
    description:
      "MPhil Physical Chemistry at QAU Islamabad · DFT modelling & electrocatalytic simulations.",
    images: ["/images/certificate-presentation.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ed",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Kamran Ashraf",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kamranashraf.is-a.dev",
  jobTitle: "MPhil Chemistry Researcher and Scientific Software Developer",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Quaid-i-Azam University",
    location: "Islamabad, Pakistan",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of the Punjab",
    },
  ],
  sameAs: SITE.socials.map((social) => social.href),
};

const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'#191f1d':'#f6f4ed');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${urdu.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".reveal,.card-3d-flip{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
