'use client';

import { SITE } from '@/lib/site';

export default function Masthead() {
  return (
    <header className="relative w-full pt-16 pb-6 sm:pt-28 sm:pb-12 text-center overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center">
        {/* Academic / Scholar pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-white/[0.03] backdrop-blur-sm px-3.5 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-6 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
          <span className="meta text-[10px] sm:text-[11px] text-paper-dim">
            QAU Islamabad · MPhil Chemistry Researcher
          </span>
        </div>

        {/* Centered Name: guaranteed ONE single line on all screen sizes with responsive clamp */}
        <div className="w-full max-w-full overflow-hidden flex justify-center items-center">
          <h1 className="display whitespace-nowrap text-[clamp(1.15rem,5.2vw,4.5rem)] leading-[1.1] tracking-tight sm:tracking-normal text-paper font-normal max-w-full select-none">
            <span className="bg-gradient-to-r from-paper via-[#fbf8ee] to-emerald-bright bg-clip-text text-transparent">
              {SITE.name.first} {SITE.name.middle} {SITE.name.last}
            </span>
          </h1>
        </div>

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
