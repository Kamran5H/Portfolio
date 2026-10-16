"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Step = {
  number: string;
  title: string;
  timeline: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "You Tell Me What You Need",
    timeline: "Day 1",
    desc: "We discuss your niche, keywords, target ASIN counts, brand extraction requirements, and what format you need the data in.",
  },
  {
    number: "02",
    title: "I Architect The Pipeline",
    timeline: "Day 1–2",
    desc: "I design the full automation pipeline tailored to your specific use case — no generic templates, custom-engineered for your exact workflow.",
  },
  {
    number: "03",
    title: "I Build & Test",
    timeline: "Day 2–5",
    desc: "Full implementation with logging, error handling, retry logic, deduplication, and real data validation on your actual targets.",
  },
  {
    number: "04",
    title: "You Receive Everything",
    timeline: "Day 3–7",
    desc: "Complete deliverable: the tool, documentation, sample output CSVs, and a 30-minute walkthrough call if needed.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-cyan)]">// process</div>
          <div className="font-mono font-bold text-[42px] text-[var(--text-primary)] mt-2">How It Works</div>
        </div>

        <div className="relative mt-16">
          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start"
          >
            {/* Desktop dashed path draw */}
            <svg
              className="hidden md:block absolute left-0 right-0 top-[42px] pointer-events-none"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M0 50 H 1000"
                stroke="rgba(0,212,255,0.2)"
                strokeWidth="2"
                strokeDasharray="6 10"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>

            {STEPS.map((s, idx) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-[48px] h-[48px] border border-[var(--accent-cyan)] rounded-[12px] flex items-center justify-center shadow-[var(--glow-cyan)] bg-[rgba(0,212,255,0.06)] font-mono text-[18px] text-[var(--accent-cyan)]"
                  aria-hidden="true"
                >
                  [{s.number}]
                </div>

                <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[8px] p-[24px] w-full">
                  <div className="font-jetbrains text-[18px] font-bold text-[var(--text-primary)]">{s.title}</div>
                  <div className="mt-2 font-body text-[14px] text-[var(--text-secondary)] leading-[1.7]">
                    {s.desc}
                  </div>
                  <div className="mt-3 font-ibm text-[11px] text-[var(--text-muted)]">{s.timeline}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden mt-8 flex flex-col gap-8">
          {/* Mobile vertical dashed line is handled by spacing; cards remain stacked. */}
        </div>
      </div>
    </section>
  );
}

