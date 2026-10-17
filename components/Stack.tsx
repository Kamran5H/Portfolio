'use client';

import { useState } from 'react';
import { STACK } from '@/lib/site';
import { useTilt } from '@/lib/hooks';

/** Which builds each tool actually ships in — shown on hover instead of fake skill percentages. */
const USED_IN: Record<string, string> = {
  'Next.js': 'this site', React: 'this site', TypeScript: 'this site', Tailwind: 'this site · Kalam admin', 'Three.js': 'research viewers', Canvas: 'Urdu Poetry Studio',
  FastAPI: 'QAU Kalam · Facebook Cleaner', Python: '15 repos', 'Postgres / Neon': 'QAU Kalam', SQLite: 'Articles Downloader', Azure: 'QAU Kalam · this site', Docker: 'QAU Kalam',
  Playwright: 'Source Genius · TikTok Hunter', 'yt-dlp': 'Quidian', aria2c: 'Quidian', FFmpeg: 'Quidian · VideoStudio', 'Chrome MV3': '4 extensions', 'Gmail API': 'Gmail Zenith',
  'Quantum ESPRESSO': 'DFT simulations', Gaussian: 'quantum calculations', ORCA: 'spectroscopic models', 'NumPy / SciPy': 'Tafel & EIS fits', 'Cyclic voltammetry': 'electrochemical kinetics', EIS: 'interfacial impedance',
  'DFT modelling': 'surface adsorption', Spectroscopy: 'FTIR & UV-Vis', Electrochemistry: 'bifunctional ORR/OER',
};

function StackColumn({
  group,
  hover,
  setHover,
}: {
  group: (typeof STACK)[number];
  hover: string | null;
  setHover: (t: string | null) => void;
}) {
  const tiltRef = useTilt<HTMLDivElement>(4);

  return (
    <div
      ref={tiltRef}
      className="card-3d-flip preserve-3d rounded-2xl border border-line/60 bg-ink-1/80 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-emerald-bright/40 shadow-xl shadow-black/30"
    >
      <div className="border-t border-line-2 pt-2">
        <h3 className="font-medium text-paper text-base">{group.group}</h3>
        <div className="meta mt-1 text-paper-faint">{group.note}</div>
      </div>
      <ul className="mt-6 space-y-1">
        {group.tools.map((t) => (
          <li key={t}>
            <button
              onMouseEnter={() => setHover(t)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(t)}
              onBlur={() => setHover(null)}
              onClick={() => setHover(hover === t ? null : t)}
              className="group flex w-full items-baseline justify-between gap-3 py-1.5 text-left"
            >
              <span
                className={`display text-2xl transition-all duration-500 ease-out ${
                  hover && hover !== t ? 'text-paper-faint' : 'text-paper'
                } group-hover:translate-x-1.5 group-hover:text-emerald-bright`}
              >
                {t}
              </span>
              <span
                className={`truncate font-mono text-[10px] text-emerald-bright transition-opacity duration-300 ${
                  hover === t ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {USED_IN[t]}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Stack() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="stack" className="content-auto border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-32">
        <div className="card-3d-flip in mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-4">
          <h2 className="display text-3xl sm:text-6xl lg:text-7xl">How it ships</h2>
          <span className="meta min-h-[1.25rem] text-emerald-bright transition-opacity duration-300">
            {hover ? `${hover} → ${USED_IN[hover] || 'production tool'}` : 'tap or hover a tool'}
          </span>
        </div>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((g) => (
            <StackColumn key={g.group} group={g} hover={hover} setHover={setHover} />
          ))}
        </div>
      </div>
    </section>
  );
}
