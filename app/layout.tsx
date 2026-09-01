import type { Metadata } from "next";
import {
  Space_Mono,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Inter,
} from "next/font/google";
import type { ReactNode } from "react";
import "../app/globals.css";
import ScanlineOverlay from "../components/ui/ScanlineOverlay";
import CursorGlow from "../components/ui/CursorGlow";
import ScrollProgress from "../components/ui/ScrollProgress";

// Assign every font loader to a const at module scope
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kamran Ashraf — Amazon Automation Architect & Data Intelligence Specialist",
  description:
    "Custom Amazon scraping pipelines, brand discovery engines, ASIN intelligence tools, and automation desktop apps. Built for serious Amazon FBA sellers who need real results.",
  keywords: [
    "Amazon automation",
    "Amazon scraping",
    "ASIN scraper",
    "brand discovery",
    "Amazon FBA tools",
    "web scraping Python",
    "Playwright scraper",
    "Kamran Ashraf",
  ],
  authors: [{ name: "Kamran Ashraf", url: "https://kamranashraf.com" }],
  creator: "Kamran Ashraf",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kamranashraf.com",
    title: "Kamran Ashraf — Amazon Automation Architect",
    description: "Custom scraping pipelines, brand discovery engines, and Amazon automation tools.",
    siteName: "KamranAshraf.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kamran Ashraf" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamran Ashraf — Amazon Automation Architect",
    description: "Custom Amazon tools that replace days of manual work.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kamran Ashraf",
  jobTitle: "Amazon Automation Architect & Data Intelligence Specialist",
  url: "https://kamranashraf.com",
  email: "hello@kamranashraf.com",
  knowsAbout: ["Amazon FBA", "Web Scraping", "Python Automation", "Data Pipelines"],
  offers: {
    "@type": "Offer",
    description: "Custom Amazon automation tools and scraping pipelines",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <ScanlineOverlay />
        <CursorGlow />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}