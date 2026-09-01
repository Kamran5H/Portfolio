"use client";

import { motion } from "framer-motion";
import MatrixRain from "../ui/MatrixRain";
import TerminalWindow from "../ui/TerminalWindow";
import GlitchText from "../ui/GlitchText";

const tickerCopy = "AMAZON FBA AUTOMATION · BRAND DISCOVERY · ASIN INTELLIGENCE · WEB SCRAPING · PLAYWRIGHT · PYTHON · DATA PIPELINES · COMPETITOR RESEARCH · ASYNC SCRAPING · AIOHTTP · SQLITE · CUSTOM TOOLS · BULK PROCESSING · EXPORT READY";

const TickerLine = () => (
  <span className="font-ibm text-[12px] uppercase text-[var(--text-muted)] whitespace-nowrap">
    {tickerCopy.split(" · ").map((chunk, idx, arr) => (
      <span key={`${chunk}-${idx}`} className="inline-flex items-center">
        {idx > 0 && (
          <span className="mx-[10px] text-[var(--accent-cyan)]" aria-hidden="true">
            ·
          </span>
        )}
        <span>{chunk}</span>
      </span>
    ))}
  </span>
);

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <MatrixRain />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0) 65%), radial-gradient(ellipse 70% 40% at 10% 10%, rgba(10,255,155,0.06) 0%, rgba(10,255,155,0) 70%)",
        }}
      />

      <div className="relative z-[2] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-[55%]">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="inline-flex items-center border-l-[3px] border-[var(--accent-green)] pl-[12px]"
              >
                <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-green)]">
                  ▶ AMAZON AUTOMATION ARCHITECT
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 font-mono font-bold text-[clamp(48px,8vw,80px)] leading-[1] text-[var(--text-primary)] whitespace-pre-line"
              >
                <GlitchText
                  as="span"
                  text={"Kamran\nAshraf"}
                  className="whitespace-pre-line inline-block"
                />
                <span className="text-[var(--accent-cyan)]">.</span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 font-body text-[18px] leading-[1.7] text-[var(--text-secondary)] max-w-[480px]"
              >
                I build custom Amazon automation tools, brand discovery engines, and data pipelines that do in minutes
                what takes your team days to do manually.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 items-start"
              >
                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center bg-[var(--accent-cyan)] text-[var(--bg-primary)] font-ibm uppercase font-bold tracking-[0.1em] text-[13px] px-[32px] py-[14px] rounded-[4px] shadow-[var(--glow-cyan)] transition-transform duration-200 hover:scale-[1.02]"
                >
                  → Start Your Project
                </motion.a>
                <motion.a
                  href="#results"
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center bg-transparent border border-[var(--border-glow)] text-[var(--text-primary)] font-ibm uppercase font-bold tracking-[0.1em] text-[13px] px-[32px] py-[14px] rounded-[4px] transition-all duration-200 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]"
                >
                  ↓ See My Work
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 font-ibm text-[11px] text-[var(--text-muted)] flex flex-wrap items-center gap-x-3 gap-y-2"
              >
                <span>⚡ 72hr Delivery</span>
                <span className="text-[var(--accent-cyan)]" aria-hidden="true">
                  ·
                </span>
                <span>🔒 NDA Available</span>
                <span className="text-[var(--accent-cyan)]" aria-hidden="true">
                  ·
                </span>
                <span>🌍 Remote Worldwide</span>
              </motion.div>
            </div>

            <div className="w-full md:w-[45%] mt-4 md:mt-0">
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              >
                <div className="transform-gpu" style={{ transform: "perspective(1000px) rotateY(-5deg)" }}>
                  <TerminalWindow
                    title="kamran@architect: ~/pipeline"
                    height="420px"
                    lines={[
                      "$ python brand_architect.py --mode=full --keywords=47",
                      "[00:01:23] 🚀 Phase 1: Scraping keywords...",
                      "[00:01:24] ✅ Found 2,847 ASINs from 47 pages",
                      "[00:01:45] 🚀 Phase 2: Extracting brands...",
                      "[00:02:11] ✅ 2,614 brands extracted (94.2% accuracy)",
                      "[00:02:12] 🚀 Phase 3: Discovering official websites...",
                      "[00:04:30] ✅ 2,391 official websites found",
                      "[00:04:31] 📊 Avg confidence: 0.78 | Parked rejected: 247",
                      "[00:04:31] 🏁 Pipeline complete. 3 phases. 4m 31s total.",
                      "$ _",
                    ]}
                  />
                  <div className="mt-4 font-ibm italic text-[11px] text-[var(--text-muted)]">
                    // live pipeline output — runs in real-time
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 z-[2]">
        <div className="border-y border-[var(--border-subtle)] py-[16px] overflow-hidden">
          <div className="group relative flex" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
            <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]">
              <div className="pr-[80px]">
                <TickerLine />
              </div>
              <div className="pr-[80px]">
                <TickerLine />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[18px] font-ibm text-[12px] text-[var(--text-muted)] opacity-50 animate-[bounce_1.6s_ease-in-out_infinite]">
          ⌄
        </div>
      </div>
    </section>
  );
}

