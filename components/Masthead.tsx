'use client';

import { SITE } from '@/lib/site';

export default function Masthead() {
  return (
    <header className="relative w-full pt-20 pb-4 sm:pt-28 sm:pb-8 text-center overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 flex flex-col items-center">
        {/* 1. Grand Starting Title: "A Programmer Chemist's Portfolio" in best attractive manner */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/[0.08] backdrop-blur-md px-3.5 py-1 mb-3.5 sm:mb-4 shadow-sm shadow-emerald/20 transition-all hover:border-emerald-bright/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright animate-ping" />
            <span className="meta text-[10px] sm:text-[11px] text-emerald-bright font-mono tracking-widest uppercase">
              Computational Bench × Production Software
            </span>
          </div>

          <div className="w-full max-w-full overflow-hidden flex justify-center items-center">
            <h1 className="display whitespace-nowrap text-[clamp(1.35rem,5.2vw,4.2rem)] leading-[1.1] tracking-tight text-paper font-normal select-none">
              <span className="bg-gradient-to-r from-paper via-[#fbf8ee] to-emerald-bright bg-clip-text text-transparent drop-shadow-sm">
                A Programmer Chemist&apos;s Portfolio
              </span>
            </h1>
          </div>
        </div>

        {/* 2. Urdu Name: Very very beautiful fonts, radiant colour & style, complete on ONE single line */}
        <div className="mt-3.5 sm:mt-5 w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-full overflow-hidden flex items-center justify-center py-1">
            <div
              dir="rtl"
              lang="ur"
              className="font-urdu urdu-glow whitespace-nowrap text-[clamp(1.85rem,5.8vw,3.75rem)] leading-[1.65] select-none text-center px-2"
            >
              <span className="bg-gradient-to-r from-amber-200 via-gold-bright to-emerald-bright bg-clip-text text-transparent font-medium tracking-normal">
                {SITE.name.urdu}
              </span>
            </div>
          </div>
          {/* Refined English transliteration anchor */}
          <span className="mt-0.5 font-sans text-xs sm:text-sm tracking-wider text-paper-dim/80 font-light select-none">
            {SITE.name.first} {SITE.name.middle} {SITE.name.last}
          </span>
        </div>

        {/* 3. Chemist, builder, islamabad - complete on ONE single line */}
        <div className="mt-3 sm:mt-4 w-full overflow-hidden flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3.5 font-mono text-[11px] sm:text-[13px] tracking-[0.18em] sm:tracking-[0.24em] text-paper-dim uppercase whitespace-nowrap select-none">
            <span className="text-paper hover:text-emerald-bright transition-colors font-medium">Chemist</span>
            <span className="text-emerald-bright/70 font-mono text-xs">✦</span>
            <span className="text-emerald-bright font-semibold hover:text-emerald transition-colors">Builder</span>
            <span className="text-emerald-bright/70 font-mono text-xs">✦</span>
            <span className="text-gold-bright hover:text-gold transition-colors font-medium">Islamabad</span>
          </div>
        </div>

        {/* 4. QAU Islamabad · MPhil Chemistry Researcher - one line on desktop, equally balanced in two on mobile */}
        <div className="mt-3.5 sm:mt-4.5 inline-flex items-center justify-center">
          <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2.5 rounded-full border border-white/[0.12] bg-ink-2/70 backdrop-blur-md px-3.5 py-1.5 sm:px-5 sm:py-2 shadow-lg shadow-black/30 hover:border-emerald/40 transition-all">
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-bright" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-paper font-medium whitespace-nowrap">
              QAU Islamabad
            </span>
            <span className="hidden sm:inline text-paper-faint">·</span>
            <span className="font-mono text-[10px] sm:text-xs text-emerald-bright font-medium whitespace-nowrap">
              MPhil Chemistry Researcher
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
