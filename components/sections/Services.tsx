"use client";

import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import type { ReactNode } from "react";

type Service = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  icon: ReactNode;
};

const IconMagnifyNetwork = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <path
      d="M15 27a12 12 0 1 1 0-24 12 12 0 0 1 0 24Z"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.95"
    />
    <path d="M23.8 23.8 33 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10.5" cy="15" r="2.1" fill="currentColor" opacity="0.9" />
    <circle cx="19.5" cy="11.2" r="1.6" fill="currentColor" opacity="0.75" />
    <circle cx="22.5" cy="18.2" r="1.9" fill="currentColor" opacity="0.8" />
    <path d="M12.1 15.4 19 12 21.8 18.1" stroke="currentColor" strokeWidth="1.8" opacity="0.8" />
  </svg>
);

const IconBarcodeFingerprint = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <rect x="6" y="8" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.95" />
    <path d="M10 12v12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M14 12v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
    <path d="M17 12v12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
    <path d="M20.6 12v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
    <path d="M24 12v12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M24.6 7.3c-2.2 1.2-4.5 2-7.1 2.2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M12.8 6.2c1.5.7 2.8 1.5 4 2.6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.65"
    />
  </svg>
);

const IconSpiderNetwork = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <path
      d="M18 18c4.6 0 8.4 2.7 10.6 6.7-2.7 1.6-6.2 2.6-10.6 2.6s-7.9-1-10.6-2.6C9.6 20.7 13.4 18 18 18Z"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.9"
    />
    <circle cx="18" cy="15" r="3.2" fill="currentColor" opacity="0.9" />
    <path d="M10.5 10.7 14.2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <path d="M25.5 10.7 21.8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <path d="M7.4 17.4 12 18.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    <path d="M28.6 17.4 24 18.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    <path
      d="M10.2 24.6 14.7 22.8M25.8 24.6 21.3 22.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

const IconRadarSignal = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="2" opacity="0.9" />
    <circle cx="18" cy="18" r="8.2" stroke="currentColor" strokeWidth="2" opacity="0.75" />
    <path
      d="M18 18 28 10"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      opacity="0.95"
    />
    <path
      d="M18 3v5M33 18h-5M18 33v-5M3 18h5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.65"
    />
  </svg>
);

const IconCircuitGear = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <path
      d="M16 3h4l1 4 4 1v4l-4 1-1 4h-4l-1-4-4-1V8l4-1 1-4Z"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.9"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="14" r="3" fill="currentColor" opacity="0.85" />
    <path d="M7 18h4M25 18h4M18 7v4M18 25v4" stroke="currentColor" strokeWidth="2" opacity="0.65" />
  </svg>
);

const IconDownloadGrid = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <rect x="8" y="10" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.9" />
    <path d="M18 13v8" stroke="currentColor" strokeWidth="2" opacity="0.8" />
    <path d="M13 17h10" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    <path d="M18 27V33" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M14 29.5 18 33l4-3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const SERVICES: Service[] = [
  {
    index: "01.",
    title: "Amazon Brand Research Automation",
    description:
      "Stop spending hours manually searching for brand names across Amazon pages. My custom pipelines scrape your keywords, discover every ASIN, extract brand names with 94%+ accuracy, and find official brand websites — all automatically, overnight.",
    tags: ["Python", "Playwright", "BeautifulSoup", "SQLite"],
    icon: <IconMagnifyNetwork />,
  },
  {
    index: "02.",
    title: "ASIN Intelligence & Competitor Mapping",
    description:
      "Map an entire niche in hours. My tools extract every ASIN from Amazon search results across hundreds of pages and keywords, deduplicate intelligently, and give you a clean dataset ready for analysis, sourcing, or outreach.",
    tags: ["aiohttp", "asyncio", "dedup", "CSV export"],
    icon: <IconBarcodeFingerprint />,
  },
  {
    index: "03.",
    title: "Custom Scraping Pipelines",
    description:
      "Production-grade scrapers engineered for reliability. Anti-bot evasion, randomized user agents, proxy rotation, CAPTCHA handling, automatic retries, WAL-mode SQLite storage. Built to run unattended for hours without breaking.",
    tags: ["Playwright", "Stealth", "Proxy Rotation", "WAL SQLite"],
    icon: <IconSpiderNetwork />,
  },
  {
    index: "04.",
    title: "Brand Discovery Engine",
    description:
      "Nine-strategy website discovery: direct domain guessing, DuckDuckGo API, Wikidata P856, Bing, Yahoo, Startpage, Brave, Google, and browser fallback. Confidence-scored results. Parked domain detection. Only real official websites make it through.",
    tags: ["Multi-source", "Confidence Score", "Parked Detection"],
    icon: <IconRadarSignal />,
  },
  {
    index: "05.",
    title: "Amazon Automation Tools",
    description:
      "Custom desktop applications with professional GUIs. Dark-mode interfaces, live progress tracking, pause/resume controls, per-phase status badges, real-time logging, and one-click CSV exports. Looks as good as it runs.",
    tags: ["customtkinter", "asyncio", "threading", "SQLite"],
    icon: <IconCircuitGear />,
  },
  {
    index: "06.",
    title: "Data Export & Reporting",
    description:
      "Every pipeline stage exports clean, deduplicated CSV files: ASINs only, ASINs + brands, brands + websites, or full pipeline reports. UTF-8-SIG encoded, confidence-scored, sorted, ready to drop into your CRM or outreach tool.",
    tags: ["pandas", "UTF-8", "Deduplication", "Confidence Sort"],
    icon: <IconDownloadGrid />,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-cyan)]">// services</div>
          <div className="font-mono font-bold text-[42px] text-[var(--text-primary)] mt-2">WHAT I BUILD FOR YOU</div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="h-[2px] bg-[var(--accent-cyan)] mx-auto mt-4"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={s.index + s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <GlowCard className="p-[28px] min-h-[280px]">
                <div className="flex justify-between items-start gap-6">
                  <div className="text-[var(--accent-cyan)]" aria-hidden="true">
                    {s.icon}
                  </div>
                  <div className="font-ibm text-[11px] text-[var(--accent-cyan)] opacity-60">{s.index}</div>
                </div>

                <h3 className="font-jetbrains text-[20px] text-[var(--text-primary)] mt-4 mb-3 font-bold">
                  {s.title}
                </h3>
                <p className="font-body text-[15px] leading-[1.7] text-[var(--text-secondary)] mb-4">
                  {s.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="font-ibm uppercase text-[10px] bg-[rgba(0,212,255,0.08)] border border-[var(--border-subtle)] text-[var(--text-muted)] px-[10px] py-[3px] rounded-[20px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

