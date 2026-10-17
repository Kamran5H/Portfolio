'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SITE } from '@/lib/site';
import { useTilt } from '@/lib/hooks';
import Masthead from './Masthead';
import CVButton from './CVButton';
import VaultModal from './VaultModal';

const Framework3D = dynamic(() => import('./Framework3D'), { ssr: false });

const LEGEND: [string, string][] = [
  ['Ni', '#10b981'],
  ['Co', '#ff5b1f'],
  ['Ce', '#f59e0b'],
  ['BDC', '#64748b'],
];

export default function Hero() {
  const [vaultOpen, setVaultOpen] = useState(false);
  const cardTiltRef = useTilt<HTMLDivElement>(6);

  return (
    <section id="top" className="relative min-h-[92svh] flex flex-col justify-between overflow-hidden">
      {/* Centered Masthead at the very top */}
      <Masthead />

      {/* Main Hero Body */}
      <div className="relative mx-auto max-w-[1280px] w-full px-4 sm:px-8 pb-12 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-6 sm:gap-10 lg:gap-14">
          {/* Left Text / Value Prop */}
          <div className="flex flex-col justify-center order-2 lg:order-1 card-3d-flip in">
            {/* Research Focus Pills */}
            <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-2">
              {SITE.focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-[11px] text-emerald-bright shadow-sm shadow-emerald/20"
                >
                  {f}
                </span>
              ))}
            </div>

            <h2 className="display text-3xl sm:text-6xl lg:text-7xl leading-[1.04] text-paper">
              Chemist by training.<br />
              <span className="text-emerald-bright">Builder</span> by habit.
            </h2>

            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-paper-dim max-w-xl leading-relaxed">
              Supervised by <strong className="text-paper font-medium">Prof. Dr. Safeer Ahmed</strong> at Quaid-i-Azam University.
              Bridging quantum mechanical simulation, bifunctional electrocatalysis, and high-throughput production systems.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald hover:bg-emerald-bright px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-ink transition-all shadow-lg shadow-emerald/25 hover:shadow-emerald/40"
              >
                <span>Explore Works</span>
                <span>↓</span>
              </a>

              <CVButton />

              <button
                onClick={() => setVaultOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 px-3.5 py-2 text-xs font-mono text-gold transition-all shadow-sm shadow-gold/20"
              >
                <span>🔒 Vault</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-line/70 grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
              <div className="group transition-transform hover:-translate-y-1">
                <div className="display text-xl sm:text-3xl text-paper">5</div>
                <div className="font-mono text-[10px] sm:text-[11px] text-paper-faint">Flagships</div>
              </div>
              <div className="group transition-transform hover:-translate-y-1">
                <div className="display text-xl sm:text-3xl text-emerald-bright">DFT</div>
                <div className="font-mono text-[10px] sm:text-[11px] text-paper-faint">Quantum ESPRESSO</div>
              </div>
              <div className="group transition-transform hover:-translate-y-1">
                <div className="display text-xl sm:text-3xl text-gold">QAU</div>
                <div className="font-mono text-[10px] sm:text-[11px] text-paper-faint">MPhil Scholar</div>
              </div>
            </div>
          </div>

          {/* Right: Authentic MPhil Thesis 3D MOF Crystal Structure with 3D Tilt */}
          <div
            ref={cardTiltRef}
            className="preserve-3d relative w-full h-[280px] sm:h-[400px] lg:h-[480px] order-1 lg:order-2 rounded-3xl border border-line/80 bg-gradient-to-b from-ink-card/90 to-ink-2/90 overflow-hidden shadow-2xl shadow-black/60 backdrop-blur-md transition-all duration-300 hover:border-emerald-bright/50"
          >
            <div className="absolute inset-0">
              <Framework3D />
            </div>

            {/* Thesis Structure Legend & Tag */}
            <div className="pointer-events-none absolute bottom-3 inset-x-4 flex items-center justify-between text-paper-faint bg-ink/80 px-3 py-1.5 rounded-xl border border-line/50 backdrop-blur-md">
              <span className="font-mono text-[10px] text-paper-dim">Ce-doped NiCo-MOF · Thesis</span>
              <span className="flex items-center gap-2.5 font-mono text-[10px]">
                {LEGEND.map(([k, c]) => (
                  <span key={k} className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                    <span>{k}</span>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      <VaultModal
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
      />
    </section>
  );
}
