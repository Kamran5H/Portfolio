'use client';

import { useState } from 'react';
import { useTicker, useTilt } from '@/lib/hooks';

/* ---------------- QAU Kalam: tilted phone with a living feed ---------------- */

const FEED = [
  { kind: 'Verse', body: 'خودی کو کر بلند اتنا\nکہ ہر تقدیر سے پہلے', who: 'Areeba · Urdu' },
  { kind: 'Question', body: 'Anyone have last year’s Quantum Chem II past paper?', who: 'Hamza · Chemistry' },
  { kind: 'Line', body: 'Margalla trail at 6. Bring water.', who: 'Saad · Physics' },
  { kind: 'Post', body: 'Library extends hours to 10 PM during finals week.', who: 'Admin · QAU Kalam' },
];

export function KalamVisual() {
  const tilt = useTilt<HTMLDivElement>(10);
  const [ref, tick] = useTicker(2600);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const top = tick % FEED.length;
  const order = [0, 1, 2].map((i) => FEED[(top + i) % FEED.length]);

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center [perspective:1200px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(217,180,90,0.18),transparent_60%)]" />
      <div ref={tilt} className="relative will-change-transform [transform-style:preserve-3d]">
        <div className="relative h-[440px] w-[220px] rounded-[38px] border border-white/15 bg-[#0b1a12] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] sm:h-[500px] sm:w-[250px]">
          <div className="flex h-full flex-col overflow-hidden rounded-[30px] bg-[#f4f1e8] text-[#13241a]">
            <div className="flex items-center justify-between bg-[#0f3d26] px-4 pb-3 pt-5 text-[#f4f1e8]">
              <span className="display text-lg">Kalam <span className="text-gold">کلام</span></span>
              <span className="rounded-full bg-gold/90 px-1.5 text-[9px] font-bold text-[#0f3d26]">PRO</span>
            </div>
            <div className="flex gap-1 overflow-hidden px-3 py-2 text-[9px] font-medium">
              {['All', 'Verses', 'Questions', 'Photos'].map((c, i) => (
                <span key={c} className={`rounded-full px-2 py-0.5 ${i === 0 ? 'bg-[#0f3d26] text-white' : 'bg-black/5'}`}>{c}</span>
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-2 px-3">
              {order.map((p, i) => (
                <div
                  key={p.body}
                  className={`rounded-xl p-3 text-[11px] leading-snug transition-all duration-700 ease-out ${
                    p.kind === 'Verse' ? 'bg-gradient-to-br from-[#f3e2b3] to-[#e6c97a] text-center' : p.kind === 'Question' ? 'bg-[#dfe9f5]' : 'bg-white'
                  } ${i === 0 ? 'animate-[none] opacity-100' : 'opacity-90'}`}
                  style={{ transform: `translateY(${i === 0 ? 0 : 0}px)` }}
                >
                  <div className="mb-1 text-[8px] font-bold uppercase tracking-wider opacity-50">{p.kind}</div>
                  <div dir="auto" className={`whitespace-pre-line ${p.kind === 'Verse' ? 'display text-[14px]' : p.kind === 'Line' ? 'font-semibold text-[13px]' : ''}`}>{p.body}</div>
                  <div className="mt-2 flex items-center justify-between text-[9px] opacity-60">
                    <span>{p.who}</span>
                    <button
                      aria-label="Like"
                      onClick={() => setLiked((l) => ({ ...l, [i + top]: !l[i + top] }))}
                      className={`transition-transform duration-300 active:scale-150 ${liked[i + top] ? 'text-[#d6336c] opacity-100' : ''}`}
                    >
                      ♥ {12 + ((i + top) * 7) % 30 + (liked[i + top] ? 1 : 0)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 border-t border-black/10 py-2 text-center text-[8px] font-semibold opacity-70">
              <span>Feed</span><span>Mentors</span><span>Chats</span><span>Bus</span>
            </div>
          </div>
        </div>
        <Chip className="-left-24 top-16 [transform:translateZ(60px)]">✓ qau.edu.pk verified</Chip>
        <Chip className="-right-20 top-44 [transform:translateZ(90px)]"><span className="text-sky-400">✓✓</span> Seen</Chip>
        <Chip className="-left-16 bottom-20 [transform:translateZ(40px)]">🚌 Bab-ul-Quaid · 5:00</Chip>
      </div>
    </div>
  );
}

function Chip({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute hidden whitespace-nowrap rounded-full border border-line bg-ink-2/90 px-3 py-1.5 font-mono text-[11px] text-paper shadow-xl backdrop-blur sm:block ${className}`}>
      {children}
    </div>
  );
}

/* ---------------- Subah: toggle tasks, unfinished ones roll forward ---------------- */

const TASKS = ['Draft chapter 2 intro', 'Run Ce-doped relax job', 'Reply to Dr. Safeer', 'Walk 30 minutes'];
const REWARDS = ['☕ Chai break earned', '🎁 Surprise unlocked', '🔥 4-day streak'];

export function SubahVisual() {
  const [done, setDone] = useState<boolean[]>([true, false, true, false]);
  const count = done.filter(Boolean).length;
  const left = TASKS.filter((_, i) => !done[i]);

  return (
    <div className="relative flex h-full items-center justify-center px-6 [perspective:1400px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,170,90,0.16),transparent_60%)]" />
      <div className="relative w-full max-w-[340px] [transform-style:preserve-3d] [transform:rotateX(18deg)_rotateZ(-4deg)]">
        <div className="absolute inset-x-6 -top-10 rounded-2xl border border-line bg-ink-3/70 p-4 [transform:translateZ(-80px)]">
          <div className="meta text-paper-faint">Tomorrow · rolled over</div>
          <div className="mt-2 space-y-1 text-sm text-paper-dim">
            {left.length ? left.map((t) => <div key={t} className="animate-[fadein_0.6s_ease]">↻ {t}</div>) : <div>Nothing carried. Clean slate.</div>}
          </div>
        </div>
        <div className="relative rounded-2xl border border-line-2 bg-[#f7efe1] p-5 text-[#2a2117] shadow-[0_50px_80px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex items-baseline justify-between">
            <span className="display text-2xl">Today</span>
            <span className="font-mono text-[11px] opacity-60">{count}/4 done</span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-black/10">
            <div className="h-full bg-[#e0722b] transition-all duration-700 ease-out" style={{ width: `${count * 25}%` }} />
          </div>
          <ul className="mt-4 space-y-1">
            {TASKS.map((t, i) => (
              <li key={t}>
                <button
                  onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-black/5"
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-md border-2 transition-all duration-300 ${done[i] ? 'scale-100 border-[#e0722b] bg-[#e0722b] text-white' : 'border-black/25'}`}>
                    {done[i] && '✓'}
                  </span>
                  <span className={`transition-all duration-300 ${done[i] ? 'line-through opacity-40' : ''}`}>{t}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={`absolute -bottom-6 right-0 rounded-full bg-signal px-3 py-1.5 font-mono text-[11px] text-ink shadow-lg transition-all duration-500 ease-out [transform:translateZ(60px)] ${count >= 3 ? 'opacity-100' : 'translate-y-2 opacity-0'}`}>
          {REWARDS[count % REWARDS.length]}
        </div>
      </div>
      <p className="meta absolute bottom-4 left-1/2 -translate-x-1/2 text-paper-faint">tap a task</p>
    </div>
  );
}

/* ---------------- Articles Downloader: one query fans out to nine APIs ---------------- */

const APIS = ['OpenAlex', 'Crossref', 'PubMed', 'arXiv', 'bioRxiv', 'Semantic Scholar', 'CORE', 'Europe PMC', 'DOAJ'];

export function ArticlesVisual() {
  const [ref, tick] = useTicker(450);
  const phase = tick % 16; // 0..8 APIs light up, then PDFs land
  const query = 'cerium doped NiCo MOF OER';
  const typed = query.slice(0, Math.min(query.length, phase * 4 + 4));

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center p-6">
      <svg viewBox="0 0 520 360" className="h-full w-full max-w-[560px]" aria-hidden>
        <rect x="20" y="155" width="150" height="50" rx="10" fill="#201f1b" stroke="rgba(236,232,223,0.16)" />
        <text x="34" y="185" fill="#ece8df" fontFamily="var(--font-mono)" fontSize="10">{typed}<tspan fill="#ff5b1f">▍</tspan></text>
        <text x="20" y="145" fill="#6f6a60" fontFamily="var(--font-mono)" fontSize="9">QUERY</text>
        {APIS.map((a, i) => {
          const y = 22 + i * 36;
          const on = phase > i;
          return (
            <g key={a}>
              <path d={`M170 180 C 220 180, 220 ${y + 10}, 268 ${y + 10}`} fill="none" stroke={on ? '#ff5b1f' : 'rgba(236,232,223,0.1)'} strokeWidth="1.2" style={{ transition: 'stroke 0.4s' }} />
              <rect x="268" y={y} width="112" height="22" rx="11" fill={on ? 'rgba(255,91,31,0.12)' : '#171714'} stroke={on ? '#ff5b1f' : 'rgba(236,232,223,0.12)'} style={{ transition: 'all 0.4s' }} />
              <text x="280" y={y + 14.5} fill={on ? '#ece8df' : '#6f6a60'} fontFamily="var(--font-mono)" fontSize="9">{a}</text>
              <path d={`M380 ${y + 11} C 420 ${y + 11}, 420 180, 440 180`} fill="none" stroke={phase > 9 && on ? 'rgba(143,191,106,0.6)' : 'rgba(236,232,223,0.06)'} strokeWidth="1" />
            </g>
          );
        })}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} style={{ transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)', opacity: phase > 9 + i ? 1 : 0, transform: `translate(${440 + i * 6}px, ${150 - i * 8 + (phase > 9 + i ? 0 : 20)}px)` }}>
            <rect width="54" height="70" rx="4" fill="#ece8df" />
            <rect x="8" y="10" width="30" height="4" fill="#0f0f0d" opacity="0.7" />
            {[22, 30, 38, 46, 54].map((ly) => <rect key={ly} x="8" y={ly} width="38" height="2" fill="#0f0f0d" opacity="0.25" />)}
            <text x="8" y="66" fontSize="7" fontFamily="var(--font-mono)" fill="#ff5b1f">PDF</text>
          </g>
        ))}
        <text x="440" y="250" fill="#6f6a60" fontFamily="var(--font-mono)" fontSize="9">{phase > 12 ? '4 papers · cached' : 'fetching…'}</text>
      </svg>
    </div>
  );
}

/* ---------------- Humanizer: drag to compare machine vs. human ---------------- */

export function HumanizerVisual() {
  const [x, setX] = useState(52);
  const before = 'In today’s rapidly evolving landscape, it is crucial to leverage cutting-edge solutions that seamlessly delve into the multifaceted tapestry of innovation.';
  const after = 'Things change fast. Pick tools that solve the problem in front of you, and drop the ones that don’t.';

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 p-6">
      <div className="relative w-full max-w-[460px] select-none overflow-hidden rounded-2xl border border-line-2 bg-ink-2 text-[15px] leading-relaxed">
        <div className="p-6 text-paper-faint">
          <div className="meta mb-3 text-signal">Machine · 94% AI</div>
          <p className="line-through decoration-signal/40">{before}</p>
        </div>
        <div className="absolute inset-0 bg-[#f4efe4] p-6 text-ink" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
          <div className="meta mb-3 text-[#3c7a2a]">Human · 8% AI</div>
          <p className="display text-[22px] leading-snug">{after}</p>
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-signal" style={{ left: `${x}%` }}>
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal px-2 py-1 font-mono text-[10px] text-ink">⇆</div>
        </div>
        <input
          type="range" min={0} max={100} value={x} onChange={(e) => setX(+e.target.value)}
          aria-label="Compare before and after"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="flex w-full max-w-[460px] items-center gap-3 font-mono text-[11px] text-paper-dim">
        <span>detector</span>
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink-3">
          <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ease-out" style={{ width: `${94 - x * 0.86}%`, background: x > 50 ? '#8fbf6a' : '#ff5b1f' }} />
        </div>
        <span className="w-10 text-right tabular-nums">{Math.round(94 - x * 0.86)}%</span>
      </div>
    </div>
  );
}

/* ---------------- Quidian: parallel segment download ---------------- */

const FORMATS = ['2160p', '1080p', 'MP3', 'SRT'];

export function VideosVisual() {
  const [ref, tick] = useTicker(120);
  const [fmt, setFmt] = useState(0);
  const segs = Array.from({ length: 8 }, (_, i) => Math.min(100, Math.max(0, ((tick * (3 + ((i * 7) % 5))) % 180) - i * 6)));
  const total = Math.round(segs.reduce((a, b) => a + b, 0) / segs.length);

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[460px] rounded-2xl border border-line-2 bg-ink-2 p-5 shadow-2xl">
        <div className="flex items-center gap-2 rounded-lg bg-ink-3 px-3 py-2 font-mono text-[11px] text-paper-dim">
          <span className="text-signal">▶</span> youtube.com/playlist?list=PL·lectures
        </div>
        <div className="mt-4 flex gap-2">
          {FORMATS.map((f, i) => (
            <button key={f} onClick={() => setFmt(i)} className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-all duration-300 ${fmt === i ? 'border-signal bg-signal text-ink' : 'border-line text-paper-dim hover:border-paper-dim'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="mt-5 flex h-12 items-end gap-[3px]">
          {Array.from({ length: 48 }, (_, i) => (
            <div key={i} className="flex-1 rounded-sm bg-paper/20 transition-all duration-150" style={{ height: `${18 + Math.abs(Math.sin((i + tick) * 0.35) * Math.cos(i * 0.7)) * 82}%`, background: i / 48 < total / 100 ? '#ff5b1f' : undefined }} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-8 gap-1">
          {segs.map((s, i) => (
            <div key={i} className="h-1.5 overflow-hidden rounded-full bg-ink-3">
              <div className="h-full bg-moss" style={{ width: `${s}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] text-paper-faint">
          <span>aria2c · 8 connections · {FORMATS[fmt]}</span>
          <span className="tabular-nums text-paper">{total}%</span>
        </div>
      </div>
    </div>
  );
}
