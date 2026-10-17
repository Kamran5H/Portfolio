'use client';

import { SITE } from '@/lib/site';

export default function Masthead() {
  return (
    <header className="relative w-full pt-20 pb-2 sm:pt-24 sm:pb-4 text-center overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center">
        
        {/* 1. Academic / Scholar Credential Capsule */}
        <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-emerald/30 bg-emerald/[0.08] backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 mb-3 sm:mb-4 shadow-sm shadow-emerald/20 transition-all hover:border-emerald-bright/50">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-bright" />
          </span>
          <span className="font-mono text-[9px] xs:text-[10px] sm:text-xs text-paper font-medium whitespace-nowrap">
            QAU Islamabad
          </span>
          <span className="text-paper-faint">·</span>
          <span className="font-mono text-[9px] xs:text-[10px] sm:text-xs text-emerald-bright font-medium whitespace-nowrap">
            MPhil Chemistry Researcher
          </span>
        </div>

        {/* 2. Big English Name: Prominent, authoritative, scholarship-caliber */}
        <div className="w-full max-w-full overflow-hidden flex justify-center items-center">
          <h1 className="display whitespace-nowrap text-[clamp(1.35rem,5.4vw,5.2rem)] leading-[1.05] tracking-tight text-paper font-normal select-none">
            <span className="bg-gradient-to-r from-paper via-[#fbf8ee] to-emerald-bright bg-clip-text text-transparent drop-shadow-sm">
              {SITE.name.first} {SITE.name.middle} {SITE.name.last}
            </span>
          </h1>
        </div>

        {/* 3. Smaller, refined Urdu signature: Elegant calligraphic accent */}
        <div className="mt-1 sm:mt-1.5 flex items-center justify-center gap-2 select-none py-0.5">
          <span
            dir="rtl"
            lang="ur"
            className="font-urdu whitespace-nowrap text-sm sm:text-xl text-gold/90 font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)] select-none"
          >
            {SITE.name.urdu}
          </span>
        </div>

        {/* 4. Single-line descriptor: Chemist · Builder · Islamabad */}
        <div className="mt-2 sm:mt-2.5 w-full overflow-hidden flex items-center justify-center">
          <div className="flex items-center justify-center gap-1.5 sm:gap-3.5 font-mono text-[9px] xs:text-[10px] sm:text-xs tracking-[0.08em] xs:tracking-[0.14em] sm:tracking-[0.22em] text-paper-dim uppercase whitespace-nowrap select-none">
            <span className="text-paper hover:text-emerald-bright transition-colors font-medium">Chemist</span>
            <span className="text-emerald-bright/70 font-mono text-[9px] sm:text-xs">✦</span>
            <span className="text-emerald-bright font-semibold hover:text-emerald transition-colors">Builder</span>
            <span className="text-emerald-bright/70 font-mono text-[9px] sm:text-xs">✦</span>
            <span className="text-gold-bright hover:text-gold transition-colors font-medium">Islamabad</span>
          </div>
        </div>

        {/* 5. Humanized, engaging academic statement */}
        <p className="mt-2.5 sm:mt-3 max-w-xl text-xs sm:text-sm text-paper-dim font-light leading-relaxed select-none">
          Bridging quantum-scale DFT simulation with high-throughput production software.
          Supervised by <strong className="text-paper font-medium">Prof. Dr. Safeer Ahmed</strong> at Quaid-i-Azam University.
        </p>

      </div>
    </header>
  );
}
