'use client';

import { useState } from 'react';
import { STACK } from '@/lib/site';

/** Which builds each tool actually ships in — shown on hover instead of fake skill percentages. */
const USED_IN: Record<string, string> = {
  'Next.js': 'this site', React: 'this site', TypeScript: 'this site', Tailwind: 'this site · Kalam admin', 'Three.js': 'research viewers', Canvas: 'Urdu Poetry Studio',
  FastAPI: 'QAU Kalam · Facebook Cleaner', Python: '15 repos', 'Postgres / Neon': 'QAU Kalam', SQLite: 'Articles Downloader', Azure: 'QAU Kalam · this site', Docker: 'QAU Kalam',
  Playwright: 'Source Genius · TikTok Hunter', 'yt-dlp': 'Quidian', aria2c: 'Quidian', FFmpeg: 'Quidian · VideoStudio', 'Chrome MV3': '4 extensions', 'Gmail API': 'Gmail Zenith',
  'Quantum ESPRESSO': 'MPhil thesis', Gaussian: 'melatonin DFT', ORCA: 'thesis benchmarks', 'NumPy / SciPy': 'Tafel & EIS fits', 'Cyclic voltammetry': 'Ce-NiCo-MOF', EIS: 'Ce-NiCo-MOF',
};

export default function Stack() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-8 sm:py-32">
        <div className="reveal mb-14 flex items-baseline justify-between gap-6">
          <h2 className="display text-5xl sm:text-7xl">How it ships</h2>
          <span className="meta hidden h-4 text-signal sm:block">{hover ? `${hover} → ${USED_IN[hover]}` : 'hover a tool'}</span>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((g, gi) => (
            <div key={g.group} className="reveal" style={{ transitionDelay: `${gi * 80}ms` }}>
              <div className="border-t border-line-2 pt-4">
                <div className="font-medium">{g.group}</div>
                <div className="meta mt-1 text-paper-faint">{g.note}</div>
              </div>
              <ul className="mt-6 space-y-1">
                {g.tools.map((t) => (
                  <li key={t}>
                    <button
                      onMouseEnter={() => setHover(t)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(t)}
                      onBlur={() => setHover(null)}
                      onClick={() => setHover(hover === t ? null : t)}
                      className="group flex w-full items-baseline justify-between gap-3 py-1.5 text-left"
                    >
                      <span className={`display text-2xl transition-all duration-500 ease-out ${hover && hover !== t ? 'text-paper-faint' : 'text-paper'} group-hover:translate-x-1.5`}>{t}</span>
                      <span className={`truncate font-mono text-[10px] text-signal transition-opacity duration-300 ${hover === t ? 'opacity-100' : 'opacity-0'}`}>{USED_IN[t]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
