'use client';

import { SITE } from '@/lib/site';

export default function Masthead() {
  return (
    <header className="relative w-full pt-16 pb-6 sm:pt-28 sm:pb-12 text-center overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center">
        {/* Academic / Scholar pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-ink-2/40 backdrop-blur-sm px-3.5 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-6 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
          <span className="meta text-[10px] sm:text-[11px] text-paper-dim">
            QAU Islamabad · MPhil Chemistry Researcher
          </span>
        </div>

        {/* Centered Name */}
        <h1 className="display text-[clamp(2.1rem,6.5vw,5.5rem)] leading-[1.05] tracking-tight text-paper font-normal">
          <span className="bg-gradient-to-r from-paper via-[#fbf8ee] to-emerald-bright bg-clip-text text-transparent">
            {SITE.name.first} {SITE.name.middle} {SITE.name.last}
          </span>
        </h1>

        {/* Urdu signature line + subtitle */}
        <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2.5 sm:gap-3 text-paper-dim">
          <span className="font-serif text-base sm:text-lg text-gold/90 font-light tracking-wide">
            {SITE.name.urdu}
          </span>
          <span className="text-line-2">·</span>
          <span className="meta text-[11px] sm:text-xs tracking-widest text-emerald-bright">
            {SITE.tagline}
          </span>
        </div>

        {/* One-sentence crisp mission statement */}
        <p className="mt-3 sm:mt-5 max-w-xl text-sm sm:text-lg text-paper-dim font-light leading-relaxed">
          {SITE.intro}
        </p>
      </div>
    </header>
  );
}
