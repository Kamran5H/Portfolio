"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Skill = {
  label: string;
  value: number;
};

const SKILLS: Skill[] = [
  { label: "Python / Async Engineering", value: 98 },
  { label: "Amazon Scraping & Anti-bot", value: 95 },
  { label: "Data Pipeline Architecture", value: 93 },
];

function CodeLine({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-4">
      <div className="font-ibm text-[12px] text-[var(--text-muted)] select-none text-right pr-2">{n}</div>
      <div className="font-jetbrains text-[13px] leading-[2] whitespace-pre-wrap">{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-[55%]">
            <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-green)]">
              // about
            </div>
            <div className="font-mono font-bold text-[42px] text-[var(--text-primary)] mt-2">Hi. I'm Kamran.</div>

            <p className="font-body text-[16px] leading-[1.8] text-[var(--text-secondary)] mt-6">
              I'm an Amazon automation architect and data intelligence specialist who builds the custom
              tools that serious sellers actually need — not the watered-down, subscription-based SaaS
              that breaks when your niche gets competitive.
            </p>
            <p className="font-body text-[16px] leading-[1.8] text-[var(--text-secondary)] mt-4">
              My background is in production-grade Python engineering: async pipelines, Playwright
              automation, multi-source data aggregation, and desktop application development. Every
              tool I build is engineered to handle real-world scale — thousands of ASINs, hundreds
              of brands, overnight batch runs.
            </p>
            <p className="font-body text-[16px] leading-[1.8] text-[var(--text-secondary)] mt-4">
              I work with Amazon FBA sellers, aggregators, sourcing teams, and brand research analysts
              who need custom solutions that fit their exact workflow — not generic software that almost
              does what they need.
            </p>

            <div className="mt-8">
              <div className="flex items-center gap-3 font-ibm uppercase text-[12px] text-[var(--accent-green)]">
                <span className="text-[var(--accent-green)] animate-pulse_dot" aria-hidden="true">
                  ◉
                </span>
                <span>CURRENTLY AVAILABLE FOR NEW PROJECTS</span>
              </div>
              <div className="font-ibm text-[11px] text-[var(--text-muted)] mt-2">Estimated start: Within 48 hours</div>
            </div>

            <div className="mt-8">
              {SKILLS.map((s, idx) => (
                <div key={s.label} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center font-ibm text-[13px] text-[var(--text-secondary)] mb-2">
                    <span>{s.label}</span>
                    <span className="text-[var(--accent-cyan)]">{s.value}%</span>
                  </div>
                  <div className="bg-[var(--border-subtle)] h-[3px] rounded-[2px] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.value}%` }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.2 }}
                      className="h-full bg-[var(--accent-cyan)] rounded-[2px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[45%]">
            <div className="border border-[var(--border-glow)] rounded-[12px] overflow-hidden shadow-[var(--glow-cyan)] bg-[var(--terminal-bg)]">
              <div className="h-[36px] bg-[var(--terminal-title-bg)] flex items-center px-4 gap-2">
                <span className="w-[12px] h-[12px] rounded-full bg-[var(--terminal-dot-red)] shadow-[0_0_10px_rgba(255,95,87,0.15)]" />
                <span className="w-[12px] h-[12px] rounded-full bg-[var(--terminal-dot-yellow)] shadow-[0_0_10px_rgba(254,188,46,0.15)]" />
                <span className="w-[12px] h-[12px] rounded-full bg-[var(--terminal-dot-green)] shadow-[0_0_10px_rgba(40,216,64,0.15)]" />
                <span className="ml-1 font-ibm text-[12px] text-[var(--text-muted)] truncate">kamran_ashraf.py</span>
              </div>

              <div className="p-[24px]">
                <div className="space-y-0">
                  <CodeLine n={1}>
                    <span className="italic text-[var(--text-muted)]"># kamran_ashraf.py</span>
                  </CodeLine>
                  <CodeLine n={2}>
                    <span className="italic text-[var(--text-muted)]"># Amazon Brand Architecture Pipeline</span>
                  </CodeLine>
                  <CodeLine n={3}>
                    {" "}
                  </CodeLine>
                  <CodeLine n={4}>
                    <span className="text-[var(--accent-purple)] font-bold">class</span>{" "}
                    <span className="text-[var(--text-primary)] font-semibold">KamranAshraf</span>:
                  </CodeLine>
                  <CodeLine n={5}>{'      """'}</CodeLine>
                  <CodeLine n={6}>
                    <span className="text-[var(--accent-green)]">      Senior Python Engineer</span>
                  </CodeLine>
                  <CodeLine n={7}>
                    <span className="text-[var(--accent-green)]">      Amazon Automation Specialist</span>
                  </CodeLine>
                  <CodeLine n={8}>
                    <span className="text-[var(--accent-green)]">      Available for custom projects</span>
                  </CodeLine>
                  <CodeLine n={9}>{'      """'}</CodeLine>
                  <CodeLine n={10}>{""}</CodeLine>
                  <CodeLine n={11}>
                    <span className="text-[var(--text-primary)] font-semibold">skills</span> = [
                  </CodeLine>
                  <CodeLine n={12}>{''}</CodeLine>
                  <CodeLine n={13}>
                    <span className="text-[var(--accent-green)]">          "Python 3.10+",</span>
                  </CodeLine>
                  <CodeLine n={14}>
                    <span className="text-[var(--accent-green)]">          "Playwright async_api",</span>
                  </CodeLine>
                  <CodeLine n={15}>
                    <span className="text-[var(--accent-green)]">          "aiohttp + asyncio",</span>
                  </CodeLine>
                  <CodeLine n={16}>
                    <span className="text-[var(--accent-green)]">          "BeautifulSoup4 + lxml",</span>
                  </CodeLine>
                  <CodeLine n={17}>
                    <span className="text-[var(--accent-green)]">          "SQLite WAL mode",</span>
                  </CodeLine>
                  <CodeLine n={18}>
                    <span className="text-[var(--accent-green)]">          "customtkinter GUI",</span>
                  </CodeLine>
                  <CodeLine n={19}>{'      ]'}</CodeLine>
                  <CodeLine n={20}>{""}</CodeLine>
                  <CodeLine n={21}>
                    <span className="text-[var(--text-primary)] font-semibold">location</span> ={" "}
                    <span className="text-[var(--accent-green)]">"Remote — Worldwide"</span>
                  </CodeLine>
                  <CodeLine n={22}>
                    <span className="text-[var(--text-primary)] font-semibold">timezone</span> ={" "}
                    <span className="text-[var(--accent-green)]">"PKT (UTC+5) — Flexible"</span>
                  </CodeLine>
                  <CodeLine n={23}>
                    <span className="text-[var(--text-primary)] font-semibold">response</span> ={" "}
                    <span className="text-[var(--accent-green)]">"&lt; 24 hours"</span>
                  </CodeLine>
                  <CodeLine n={24}>
                    <span className="text-[var(--text-primary)] font-semibold">delivery</span> ={" "}
                    <span className="text-[var(--accent-green)]">"72hrs — 2 weeks"</span>
                  </CodeLine>
                  <CodeLine n={25}>{""}</CodeLine>
                  <CodeLine n={26}>
                    <span className="text-[var(--accent-purple)] font-bold">def</span>{" "}
                    <span className="text-[var(--text-primary)] font-semibold">hire</span>(self):
                  </CodeLine>
                  <CodeLine n={27}>{'          '}</CodeLine>
                  <CodeLine n={28}>
                    <span className="text-[var(--accent-purple)] font-bold">return</span>{" "}
                    <span className="text-[var(--accent-green)]">"kamranashraf.com/#contact"</span>
                  </CodeLine>
                  <CodeLine n={29}>{""}</CodeLine>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

