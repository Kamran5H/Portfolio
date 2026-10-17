'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';
import Masthead from './Masthead';
import CVButton from './CVButton';
import ThreeStage from './three/ThreeStage';
import AtomModel from './three/models/AtomModel';
import VaultModal from './VaultModal';

export default function Hero() {
  const [vaultOpen, setVaultOpen] = useState(false);

  return (
    <section id="top" className="relative min-h-[92svh] flex flex-col justify-between overflow-hidden">
      {/* Centered Masthead at the very top */}
      <Masthead />

      {/* Main Hero Body */}
      <div className="relative mx-auto max-w-[1280px] w-full px-4 sm:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-10 lg:gap-14">
          {/* Left Text / Value Prop */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Research Focus Pills */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {SITE.focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-[11px] text-emerald-bright"
                >
                  {f}
                </span>
              ))}
            </div>

            <h2 className="display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] text-paper">
              Chemist by training.<br />
              <span className="text-emerald-bright">Builder</span> by habit.
            </h2>

            <p className="mt-6 text-base sm:text-lg text-paper-dim max-w-xl leading-relaxed">
              Supervised by <strong className="text-paper font-medium">Prof. Dr. Safeer Ahmed</strong> at Quaid-i-Azam University.
              Bridging quantum mechanical simulation, bifunctional electrocatalysis, and high-throughput production systems.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald hover:bg-emerald-bright px-5 py-3 text-sm font-semibold text-ink transition-all shadow-lg shadow-emerald/20"
              >
                <span>Explore Selected Works</span>
                <span>↓</span>
              </a>

              <CVButton />

              <button
                onClick={() => setVaultOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 px-4 py-2.5 text-xs font-mono text-gold transition-all"
              >
                <span>🔒 Confidential Vault</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-12 pt-8 border-t border-line/70 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <div className="display text-2xl sm:text-3xl text-paper">8+</div>
                <div className="font-mono text-[11px] text-paper-faint">Flagship Systems</div>
              </div>
              <div>
                <div className="display text-2xl sm:text-3xl text-emerald-bright">DFT</div>
                <div className="font-mono text-[11px] text-paper-faint">Quantum ESPRESSO</div>
              </div>
              <div>
                <div className="display text-2xl sm:text-3xl text-gold">QAU</div>
                <div className="font-mono text-[11px] text-paper-faint">MPhil Scholar</div>
              </div>
            </div>
          </div>

          {/* Right: Isolated 3D Quantum Chemistry Orbital Artifact */}
          <div className="w-full h-[320px] sm:h-[400px] lg:h-[480px] order-1 lg:order-2">
            <ThreeStage className="h-full w-full">
              <AtomModel />
            </ThreeStage>
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
