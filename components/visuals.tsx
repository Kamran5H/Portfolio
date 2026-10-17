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
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const top = tick % FEED.length;
  const order = [0, 1, 2].map((i) => FEED[(top + i) % FEED.length]);

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center [perspective:1200px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(217,180,90,0.18),transparent_60%)]" />
      <div ref={tilt} className="relative will-change-transform [transform-style:preserve-3d]">
        <div className="relative h-[440px] w-[220px] rounded-[38px] border border-white/15 bg-[#0b1a12] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] sm:h-[500px] sm:w-[250px]">
          <div className="flex h-full flex-col overflow-hidden rounded-[30px] bg-[#f4f1e8] text-[#13241a]">
            <div className="flex items-center justify-between bg-[#0f3d26] px-4 pb-3 pt-5 text-[#f4f1e8]">
              <span className="display text-lg">Kalam <span className="font-urdu text-gold font-normal">کلام</span></span>
              <span className="rounded-full bg-gold/90 px-1.5 text-[9px] font-bold text-[#0f3d26]">PRO</span>
            </div>
            <div className="flex gap-1 overflow-hidden px-3 py-2 text-[9px] font-medium">
              {['All', 'Verses', 'Questions', 'Photos'].map((c, i) => (
                <span key={c} className={`rounded-full px-2 py-0.5 ${i === 0 ? 'bg-[#0f3d26] text-white' : 'bg-black/5'}`}>{c}</span>
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-2 px-3">
              {order.map((p, i) => {
                const isLiked = !!liked[p.body];
                const baseLikes = 14 + ((p.body.length * 3) % 19);
                return (
                  <div
                    key={p.body}
                    className={`rounded-xl p-3 text-[11px] leading-snug transition-all duration-700 ease-out ${
                      p.kind === 'Verse' ? 'bg-gradient-to-br from-[#f3e2b3] to-[#e6c97a] text-center' : p.kind === 'Question' ? 'bg-[#dfe9f5]' : 'bg-white'
                    } ${i === 0 ? 'animate-[none] opacity-100' : 'opacity-90'}`}
                  >
                    <div className="mb-1 text-[8px] font-bold uppercase tracking-wider opacity-50">{p.kind}</div>
                    <div dir="auto" className={`whitespace-pre-line ${p.kind === 'Verse' ? 'font-urdu text-[15px] leading-relaxed py-0.5' : p.kind === 'Line' ? 'font-semibold text-[13px]' : ''}`}>{p.body}</div>
                    <div className="mt-2 flex items-center justify-between text-[9px] opacity-60">
                      <span>{p.who}</span>
                      <button
                        aria-label={isLiked ? 'Unlike' : 'Like'}
                        onClick={() => setLiked((l) => ({ ...l, [p.body]: !l[p.body] }))}
                        className={`transition-transform duration-300 active:scale-150 ${isLiked ? 'text-[#d6336c] opacity-100' : 'hover:text-[#d6336c]'}`}
                      >
                        ♥ {baseLikes + (isLiked ? 1 : 0)}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 grid grid-cols-4 border-t border-black/10 py-2 text-center text-[8px] font-semibold opacity-70">
              <span>Feed</span><span>Mentors</span><span>Chats</span><span>Bus</span>
            </div>
          </div>
        </div>
        <Chip className="-left-6 sm:-left-12 lg:-left-20 top-16 [transform:translateZ(60px)]">✓ qau.edu.pk verified</Chip>
        <Chip className="-right-6 sm:-right-10 lg:-right-16 top-44 [transform:translateZ(90px)]"><span className="text-sky-400">✓✓</span> Seen</Chip>
        <Chip className="-left-4 sm:-left-8 lg:-left-14 bottom-20 [transform:translateZ(40px)]">🚌 Bab-ul-Quaid · 5:00</Chip>
      </div>
    </div>
  );
}

function Chip({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute hidden whitespace-nowrap rounded-full border border-white/[0.08] bg-ink-2/60 px-3 py-1.5 font-mono text-[11px] text-paper shadow-xl backdrop-blur-sm sm:block ${className}`}>
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
        <div className="absolute inset-x-6 -top-10 rounded-2xl border border-white/[0.08] bg-ink-3/40 backdrop-blur-sm p-4 [transform:translateZ(-80px)]">
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
  const [x, setX] = useState(65);
  const before = 'In today’s rapidly evolving landscape, it is crucial to leverage cutting-edge solutions that seamlessly delve into the multifaceted tapestry of innovation.';
  const after = 'Things change fast. Pick tools that solve the problem in front of you, and drop the ones that don’t.';

  // x% represents percentage of human text revealed from the left
  // x = 0%: 100% Machine text visible, Score = 94% (Red)
  // x = 100%: 100% Human text visible, Score = 8% (Green)
  const score = Math.round(94 - (x / 100) * (94 - 8));
  const scoreColor = score <= 25 ? '#8fbf6a' : score <= 55 ? '#d9b45a' : '#ff5b1f';

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 p-6">
      <div className="group relative w-full max-w-[460px] select-none overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2/40 backdrop-blur-sm text-[15px] leading-relaxed transition-all focus-within:ring-2 focus-within:ring-signal/80">
        {/* Base layer: Raw Machine Text */}
        <div className="p-6 text-paper-dim">
          <div className="meta mb-3 flex items-center justify-between text-signal">
            <span>Machine Output</span>
            <span className="font-mono text-[10px] text-paper-faint">Raw AI Draft</span>
          </div>
          <p className="line-through decoration-signal/40 opacity-70">{before}</p>
        </div>

        {/* Top layer: Humanized Text (revealed from left to right) */}
        <div
          className="absolute inset-0 bg-[#f4efe4] p-6 text-ink transition-[clip-path] duration-75 ease-out"
          style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}
        >
          <div className="meta mb-3 flex items-center justify-between text-[#3c7a2a]">
            <span>Humanized Prose</span>
            <span className="font-mono text-[10px] opacity-70">Natural Tone</span>
          </div>
          <p className="display text-[22px] leading-snug">{after}</p>
        </div>

        {/* Vertical divider handle */}
        <div className="pointer-events-none absolute inset-y-0 w-px bg-signal shadow-[0_0_12px_rgba(255,91,31,0.8)]" style={{ left: `${x}%` }}>
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal px-2 py-1 font-mono text-[10px] font-bold text-ink shadow-lg">
            ⇆
          </div>
        </div>

        {/* Accessible range slider */}
        <input
          type="range"
          min={0}
          max={100}
          value={x}
          onChange={(e) => setX(+e.target.value)}
          aria-label="Humanizer comparison: slide to naturalize machine text"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={x}
          aria-valuetext={`${score}% AI likelihood score (${x}% humanized)`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-10"
        />
      </div>

      {/* Synchronized AI detector bar */}
      <div className="flex w-full max-w-[460px] items-center gap-3 font-mono text-[11px] text-paper-dim">
        <span className="text-[10px] uppercase tracking-wider text-paper-faint">AI Detection</span>
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink-3">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${score}%`, backgroundColor: scoreColor }}
          />
        </div>
        <span className="w-12 text-right font-mono text-[12px] font-semibold tabular-nums" style={{ color: scoreColor }}>
          {score}%
        </span>
      </div>
      <p className="meta text-[10px] text-paper-faint">slide to compare · 0% raw AI → 100% human prose</p>
    </div>
  );
}

/* ---------------- Quidian: dynamic multi-stream media engine ---------------- */

const FORMAT_CONFIG = [
  { label: '2160p', badge: '4K UHD', desc: 'aria2c · 16 parallel threads · 48.2 MB/s · AV1/Opus', type: 'video4k' },
  { label: '1080p', badge: 'FHD', desc: 'aria2c · 8 parallel threads · 24.4 MB/s · H.264/AAC', type: 'video1080' },
  { label: 'MP3', badge: 'Audio', desc: 'FFmpeg live pipeline · 320 kbps CBR · Stereo Master', type: 'audio' },
  { label: 'SRT', badge: 'Subtitles', desc: 'Automated Whisper VTT extraction · English + Urdu', type: 'subs' },
];

export function VideosVisual() {
  const [ref, tick] = useTicker(100);
  const [fmtIndex, setFmtIndex] = useState(0);
  const currentFmt = FORMAT_CONFIG[fmtIndex];

  // Dynamic waveform/packets driven by active format
  const barCount = 44;
  const isAudio = currentFmt.type === 'audio';
  const isSubs = currentFmt.type === 'subs';
  const is4K = currentFmt.type === 'video4k';

  const segs = Array.from({ length: 8 }, (_, i) => {
    const rate = is4K ? 6 : isAudio ? 4 : 5;
    return Math.min(100, Math.max(0, ((tick * (rate + ((i * 5) % 4))) % 200) - i * 8));
  });
  const total = Math.round(segs.reduce((a, b) => a + b, 0) / segs.length);

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[460px] rounded-2xl border border-white/[0.08] bg-ink-2/40 backdrop-blur-sm p-5 shadow-2xl">
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-paper-dim">
          <div className="flex items-center gap-2 truncate">
            <span className="text-signal">▶</span>
            <span className="truncate">youtube.com/watch?v=electrocatalysis_lecture</span>
          </div>
          <span className="ml-2 rounded bg-signal/20 px-1.5 py-0.5 text-[9px] font-bold text-signal">{currentFmt.badge}</span>
        </div>

        <div className="mt-4 flex gap-2" role="group" aria-label="Media format selection">
          {FORMAT_CONFIG.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setFmtIndex(i)}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-all duration-300 ${
                fmtIndex === i ? 'border-signal bg-signal text-ink font-semibold' : 'border-line text-paper-dim hover:border-paper-dim hover:text-paper'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Dynamic visual stream visualizer */}
        <div className="mt-5 flex h-14 items-end gap-[3px] rounded-lg bg-ink-3/50 px-2 py-1">
          {Array.from({ length: barCount }, (_, i) => {
            let height = 20;
            if (isAudio) {
              // Audio spectrum equalizer style
              const freq = Math.sin((i / barCount) * Math.PI) * 70;
              const jitter = Math.abs(Math.sin((i + tick * 2) * 0.45) * Math.cos(i * 0.6)) * 30;
              height = Math.min(100, Math.max(12, freq + jitter));
            } else if (isSubs) {
              // Subtitle packet pulse bursts
              height = (i % 6 === (tick % 6)) ? 80 : 15;
            } else {
              // Video segment transfer waveforms
              const wave = Math.abs(Math.sin((i + tick) * (is4K ? 0.5 : 0.3)) * Math.cos(i * 0.7)) * 80;
              height = Math.min(100, Math.max(16, 18 + wave));
            }
            const active = (i / barCount) * 100 < total;
            return (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all duration-100"
                style={{
                  height: `${height}%`,
                  backgroundColor: active ? (isAudio ? '#d9b45a' : isSubs ? '#38bdf8' : '#ff5b1f') : 'rgba(236,232,223,0.12)',
                }}
              />
            );
          })}
        </div>

        {/* Parallel segmented workers */}
        <div className="mt-4 grid grid-cols-8 gap-1.5">
          {segs.map((s, i) => (
            <div key={i} className="h-1.5 overflow-hidden rounded-full bg-ink-3">
              <div
                className="h-full transition-all duration-150"
                style={{
                  width: `${s}%`,
                  backgroundColor: isAudio ? '#d9b45a' : isSubs ? '#38bdf8' : '#8fbf6a',
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-paper-faint">
          <span className="truncate pr-2">{currentFmt.desc}</span>
          <span className="font-semibold tabular-nums text-paper">{total}%</span>
        </div>
      </div>
    </div>
  );
}
