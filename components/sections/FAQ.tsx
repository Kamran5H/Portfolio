"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useState } from "react";

type FaqItem = { q: string; a: string };

const FAQS: FaqItem[] = [
  {
    q: "How long does a typical project take?",
    a: "Most pipeline projects are delivered in 72 hours to 7 days depending on complexity. A basic ASIN scraper: 24–48hrs. A full 3-phase pipeline (keywords → ASINs → brands → websites): 4–7 days. Complex custom GUI tools: 1–2 weeks. I'll give you an exact timeline during our initial discussion.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — 100% of my clients are international. I work remotely with clients in the USA, UK, Germany, Australia, Canada, UAE, Netherlands, and Japan. Time zone is not a barrier. I accommodate client working hours and async communication works perfectly for development.",
  },
  {
    q: "What makes your scrapers different from off-the-shelf tools?",
    a: "Off-the-shelf tools are generic. My scrapers are custom-engineered for your specific targets, with anti-bot evasion tuned for Amazon's current detection methods, proxy rotation, CAPTCHA handling, WAL-mode database storage, automatic retry logic, and deduplication built into every layer.",
  },
  {
    q: "Can you handle large-scale scraping (500+ keywords, 100K+ ASINs)?",
    a: "Yes. The architecture is designed for large scale: async concurrent requests, chunked processing, browser context recycling, WAL checkpointing, and progress tracking that survives interruption and restarts cleanly.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, always available. I take client data and project confidentiality very seriously. A standard NDA can be signed before any project details are shared.",
  },
  {
    q: "What is your payment structure?",
    a: "50% upfront, 50% on delivery. For larger projects (>$1000), we can discuss milestone-based payment. I accept PayPal, Wise, USDT, and bank transfer.",
  },
  {
    q: "Will I own the source code?",
    a: "Yes — full source code, full IP transfer on final payment. You get everything: Python code, database schemas, configuration files, documentation, and a walkthrough call.",
  },
  {
    q: "What if the scraper breaks after delivery?",
    a: "I provide 30 days of free bug fixes for issues caused by my code. I also build scrapers with multiple fallback strategies to minimize this scenario.",
  },
  {
    q: "Can you build a desktop GUI for the tool?",
    a: "Yes. I build professional desktop GUI applications using Python's customtkinter library: dark-mode interfaces, real-time progress tracking, phase controls, live logging, settings panels, and one-click CSV exports.",
  },
  {
    q: "How do I get started?",
    a: "Fill in the project brief form below. I personally review every inquiry and respond within 24 hours with a project assessment and quote. No auto-responses, no sales pitch.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const items = useMemo(() => FAQS, []);

  return (
    <section className="bg-[var(--bg-secondary)] py-24" aria-label="Frequently Asked Questions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-cyan)]">// faq</div>
          <div className="font-mono font-bold text-[42px] text-[var(--text-primary)] mt-2">Frequently Asked Questions</div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-0">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `${baseId}-faq-panel-${idx}`;

            return (
              <div key={item.q} className="border-b border-[var(--border-subtle)] py-[20px]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
                  className="w-full flex justify-between items-center cursor-pointer"
                >
                  <div
                    className={[
                      "font-jetbrains text-[16px] transition-colors duration-200",
                      isOpen ? "text-[var(--accent-cyan)]" : "text-[var(--text-primary)]",
                    ].join(" ")}
                  >
                    {item.q}
                  </div>
                  <div className="font-ibm text-[20px] text-[var(--accent-cyan)]">
                    {isOpen ? "−" : "+"}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-1 font-body text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

