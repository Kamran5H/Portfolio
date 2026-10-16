'use client';

import { useState } from 'react';
import { REPOS, GITHUB, type Category } from '@/lib/site';
import StatusBadge from './StatusBadge';

const CATS: ('All' | Category)[] = ['All', 'Research', 'Browser', 'Automation', 'Desktop', 'AI'];

/** A small drawn mark per category; animates on card hover. */
function Glyph({ cat, seed }: { cat: Category; seed: number }) {
  const s = 'stroke-paper-dim group-hover:stroke-signal transition-colors duration-500';
  const spin = 'origin-center transition-transform duration-700 ease-out group-hover:rotate-[30deg]';
  switch (cat) {
    case 'Research':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          <g className={spin} style={{ transformBox: 'fill-box' }}>
            <polygon className={s} points="40,14 62,27 62,53 40,66 18,53 18,27" />
            <polygon className={s} points="40,26 51,32 51,46 40,52 29,46 29,32" opacity={0.5} />
          </g>
          {[[40, 14], [62, 53], [18, 53]].map(([x, y]) => <circle key={x + '' + y} cx={x} cy={y} r="3" className="fill-paper group-hover:fill-signal transition-colors duration-500" />)}
        </svg>
      );
    case 'Browser':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          <rect className={s} x="12" y="18" width="56" height="44" rx="5" />
          <line className={s} x1="12" y1="28" x2="68" y2="28" />
          <rect x="48" y="32" width="16" height="26" rx="2" className="fill-paper/10 transition-all duration-500 group-hover:fill-signal/40 group-hover:translate-x-[-4px]" />
          {[17, 22, 27].map((x) => <circle key={x} cx={x} cy="23" r="1.5" className="fill-paper-dim" />)}
        </svg>
      );
    case 'Automation':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect className={s} x={10 + i * 22} y="32" width="16" height="16" rx="3" />
              {i < 2 && <path className={s} d={`M${26 + i * 22} 40 h6`} strokeDasharray="2 2" />}
            </g>
          ))}
          <circle cx="18" cy="40" r="2.5" className="fill-signal transition-transform duration-1000 ease-out group-hover:translate-x-[44px]" />
        </svg>
      );
    case 'Desktop':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          <circle className={s} cx="40" cy="40" r="24" />
          <circle className={s} cx="40" cy="40" r="6" />
          <path d={`M40 16 A24 24 0 0 1 ${40 + 24 * Math.sin(1 + seed)} ${40 - 24 * Math.cos(1 + seed)}`} className="stroke-signal" strokeWidth="3" />
          <g className={spin} style={{ transformBox: 'view-box', transformOrigin: '40px 40px' }}>
            <line className={s} x1="40" y1="40" x2="58" y2="28" />
          </g>
        </svg>
      );
    case 'AI':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1">
          {[[20, 24], [20, 56], [40, 40], [60, 20], [60, 40], [60, 60]].map(([x, y], i, a) =>
            i < 2 ? a.slice(2, 3).map(([x2, y2]) => <line key={i} className={s} x1={x} y1={y} x2={x2} y2={y2} />) : i > 2 ? <line key={i} className={s} x1={40} y1={40} x2={x} y2={y} /> : null
          )}
          {[[20, 24], [20, 56], [40, 40], [60, 20], [60, 40], [60, 60]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 2 ? 5 : 3} className={`${i === 2 ? 'fill-signal' : 'fill-paper'} transition-transform duration-500 group-hover:scale-125`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
          ))}
        </svg>
      );
  }
}

export default function Lab() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const list = REPOS.filter((r) => cat === 'All' || r.category === cat);

  return (
    <section id="lab" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-8 sm:py-32">
        <div className="reveal mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="display text-5xl sm:text-7xl">The lab</h2>
          <div role="tablist" className="flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-all duration-500 ease-out ${cat === c ? 'bg-paper text-ink' : 'text-paper-dim hover:text-paper'}`}
              >
                {c}
                <sup className="ml-0.5 font-mono text-[9px] opacity-60">{c === 'All' ? REPOS.length : REPOS.filter((r) => r.category === c).length}</sup>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => {
            const Tag = r.repo ? 'a' : 'div';
            return (
              <Tag
                key={r.name}
                {...(r.repo ? { href: r.repo, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group relative flex min-h-[200px] gap-5 bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 animate-[fadein_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="h-16 w-16 shrink-0"><Glyph cat={r.category} seed={i} /></div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-paper">{r.name}</h3>
                    {r.repo && <span className="text-paper-faint transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal">↗</span>}
                  </div>
                  <p className="mt-2 text-sm text-paper-dim">{r.line}</p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <StatusBadge status={r.status} />
                    <span className="font-mono text-[11px] text-paper-faint">{r.lang}</span>
                  </div>
                </div>
              </Tag>
            );
          })}
        </div>

        <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="link-arrow mt-8 text-sm text-paper-dim">
          Everything on github.com/Kamran5H <span>↗</span>
        </a>
      </div>
    </section>
  );
}
