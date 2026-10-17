'use client';

import { SITE } from '@/lib/site';

export default function Masthead() {
  return (
    <header className="relative w-full pt-20 pb-8 sm:pt-28 sm:pb-12 text-center overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center">
        {/* Academic / Scholar pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald/30 bg-ink-2/80 px-4 py-1.5 backdrop-blur-md mb-6 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
          <span className="meta text-[11px] text-paper-dim">
            QAU Islamabad · MPhil Chemistry Researcher
          </span>
        </div>

        {/* Centered Name */}
        <h1 className="display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-paper font-normal">
          <span className="bg-gradient-to-r from-paper via-[#fbf8ee] to-emerald-bright bg-clip-text text-transparent">
            {SITE.name.first} {SITE.name.middle} {SITE.name.last}
          </span>
        </h1>

        {/* Urdu signature line + subtitle */}
        <div className="mt-3 flex items-center justify-center gap-3 text-paper-dim">
          <span className="font-serif text-lg text-gold/90 font-light tracking-wide">
            {SITE.name.urdu}
          </span>
          <span className="text-line-2">·</span>
          <span className="meta text-xs tracking-widest text-emerald-bright">
            {SITE.tagline}
          </span>
        </div>

        {/* One-sentence crisp mission statement */}
        <p className="mt-5 max-w-xl text-base sm:text-lg text-paper-dim font-light leading-relaxed">
          {SITE.intro}
        </p>
      </div>
    </header>
  );
}
