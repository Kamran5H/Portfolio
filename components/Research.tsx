'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SITE, VAULT_ITEMS, type VaultItem } from '@/lib/site';
import { useTilt } from '@/lib/hooks';
import VaultModal from './VaultModal';

interface ResearchField {
  id: string;
  category: string;
  title: string;
  affiliation: string;
  status: string;
  summary: string;
  methods: string[];
  vaultTargetId: string;
}

const RESEARCH_FIELDS: ResearchField[] = [
  {
    id: 'electrocatalysis',
    category: 'Electrocatalysis',
    title: 'Bifunctional ORR/OER Catalysts in Alkaline Electrolyte',
    affiliation: 'Quaid-i-Azam University · Physical Chemistry',
    status: 'In Progress · Confidential',
    summary:
      'Heteroatom modulation of coordination matrices to tune intermediate binding energies (*O, *OH, *OOH), lowering overpotentials for bifunctional alkaline water splitting and air electrodes.',
    methods: ['Electronic Modulation', 'Cyclic Voltammetry', 'EIS & Tafel Analysis', 'Durability Testing'],
    vaultTargetId: 'research-dossier',
  },
  {
    id: 'dft-modelling',
    category: 'Computational Science',
    title: 'First-Principles Electronic Structure & Surface Kinetics',
    affiliation: 'Computational Chemistry Lab · QAU',
    status: 'In Progress · Confidential',
    summary:
      'Density Functional Theory (DFT) supercell calculations using Quantum ESPRESSO. Evaluating d-band center displacement, density of states (DOS), and reaction intermediate free energy profiles.',
    methods: ['Quantum ESPRESSO DFT', 'GGA-PBE + Hubbard U', 'Supercell Slab Models', 'Adsorption Energetics'],
    vaultTargetId: 'research-dossier',
  },
  {
    id: 'energy-storage',
    category: 'Energy Systems',
    title: 'Coupled Failure Mechanisms in Secondary Zinc–Air Batteries',
    affiliation: 'Department of Chemistry · QAU',
    status: 'Under Review',
    summary:
      'Critical assessment of coupled degradation pathways in alkaline air-breathing electrodes, separating zinc dendrite formation from carbonate precipitation and carbon corrosion.',
    methods: ['Electrochemical Analysis', 'Phase Degradation', 'Standardized Benchmarking', 'Metric Decoupling'],
    vaultTargetId: 'manuscripts',
  },
  {
    id: 'sorbents',
    category: 'Materials Chemistry',
    title: 'Functionalized Biopolymeric Chelators & Metal Oxide Nanocrystals',
    affiliation: 'University of the Punjab & QAU',
    status: 'Completed / Capstone',
    summary:
      'Grafting conjugated moieties onto biopolymer chains confirmed via FTIR spectroscopy and B3LYP calculations, alongside green synthesis of transition and alkaline-earth metal oxide nanoparticles.',
    methods: ['FTIR Spectroscopy', 'Gaussian 09/16 DFT', 'Magnetic Separation', 'Green Synthesis'],
    vaultTargetId: 'capstone',
  },
];

function ResearchCard({
  rf,
  onOpenVault,
}: {
  rf: ResearchField;
  onOpenVault: (id: string) => void;
}) {
  const tiltRef = useTilt<HTMLElement>(4);

  return (
    <article
      ref={tiltRef}
      className="card-3d-flip preserve-3d rounded-2xl border border-white/[0.08] bg-ink-1/10 backdrop-blur-sm p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-bright/40 transition-all duration-300 shadow-xl shadow-black/20"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[11px] text-paper-faint tracking-wider uppercase">
            {rf.category}
          </span>
          <span className="font-mono text-[10px] rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-gold">
            {rf.status}
          </span>
        </div>

        <h3 className="display text-xl text-paper leading-snug">
          {rf.title}
        </h3>

        <p className="mt-1 font-mono text-xs text-paper-faint">
          {rf.affiliation}
        </p>

        <p className="mt-4 text-xs sm:text-sm text-paper-dim leading-relaxed">
          {rf.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {rf.methods.map((m) => (
            <span
              key={m}
              className="rounded border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-paper-dim"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-line/60">
        <button
          onClick={() => onOpenVault(rf.vaultTargetId)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald/30 bg-emerald/10 px-3.5 py-2 text-xs font-medium text-emerald-bright hover:bg-emerald/20 transition-all"
        >
          <span>Request Full Dossier</span>
          <span className="font-mono text-xs">🔒</span>
        </button>
      </div>
    </article>
  );
}

export default function Research() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVaultItem, setActiveVaultItem] = useState<VaultItem | null>(null);
  const scholarTiltRef = useTilt<HTMLDivElement>(3);
  const vaultTiltRef = useTilt<HTMLDivElement>(2);

  const openVault = (item?: VaultItem) => {
    setActiveVaultItem(item || null);
    setModalOpen(true);
  };

  const openVaultById = (id: string) => {
    const found = VAULT_ITEMS.find((v) => v.id === id);
    openVault(found);
  };

  // Group vault items for organized presentation
  const credentials = VAULT_ITEMS.filter((v) => ['Degree', 'School', 'Experience', 'Identity', 'Award'].includes(v.group));
  const researchDossiers = VAULT_ITEMS.filter((v) => ['Research', 'Profile'].includes(v.group));

  return (
    <section id="research" className="border-t border-line py-16 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-line pb-8">
          <div>
            <div className="meta mb-2 text-emerald-bright font-mono text-xs tracking-wider uppercase">
              Computational Physics & Physical Chemistry
            </div>
            <h2 className="display text-3xl sm:text-6xl text-paper">
              Scientific Research
            </h2>
          </div>
          <div className="max-w-md text-xs sm:text-sm text-paper-dim">
            <p>
              Electrocatalytic systems and quantum chemical calculations at Quaid-i-Azam University under{' '}
              <strong className="text-paper">Prof. Dr. Safeer Ahmed</strong>.
            </p>
            <p className="mt-2 text-xs text-gold flex items-center gap-1.5 font-mono">
              <span>🔒</span>
              <span>All active manuscripts & structural coordinates are locked to protect novel IP.</span>
            </p>
          </div>
        </div>

        {/* Research Overview Cards with 3D Flip & Tilt */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-14 sm:mb-20">
          {RESEARCH_FIELDS.map((rf) => (
            <ResearchCard key={rf.id} rf={rf} onOpenVault={openVaultById} />
          ))}
        </div>

        {/* Verified Academic Trajectory & Scholar Profile with 3D Flip */}
        <div
          ref={scholarTiltRef}
          className="card-3d-flip preserve-3d mb-14 sm:mb-20 rounded-3xl border border-white/[0.08] bg-ink-1/10 backdrop-blur-sm p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-12 items-center shadow-2xl shadow-black/30"
        >
          {/* Author Scholar Badge / Portrait */}
          <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-emerald/40 bg-ink-card p-1 shadow-lg mb-3 sm:mb-4">
              <Image
                src="/assets/images/kamran_nobg.png"
                alt="Muhammad Kamran Ashraf"
                width={144}
                height={144}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="display text-base sm:text-xl text-paper font-normal break-words text-center">
              {SITE.name.first} {SITE.name.middle} {SITE.name.last}
            </div>
            <div
              dir="rtl"
              lang="ur"
              className="font-urdu text-sm sm:text-base text-gold/90 mt-1 select-none drop-shadow-[0_1px_8px_rgba(245,158,11,0.2)]"
            >
              {SITE.name.urdu}
            </div>
            <div className="meta text-[9px] sm:text-[10px] text-emerald-bright mt-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald/30 bg-emerald/10">
              MPhil Scholar · QAU
            </div>
          </div>

          {/* Chronological Timeline */}
          <div>
            <div className="meta mb-2 text-paper-faint uppercase tracking-wider text-xs">
              Verified Chronology · 2019 — Present
            </div>
            <h3 className="display text-2xl sm:text-3xl text-paper mb-6">
              Academic &amp; Teaching Trajectory
            </h3>
            <div className="space-y-4">
              {SITE.path.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-3.5 border-b border-line/60 last:border-b-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-emerald-bright shrink-0 w-24">
                      {item.years}
                    </span>
                    <span className="font-medium text-sm sm:text-base text-paper">
                      {item.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-paper-dim">
                    {item.where}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confidential Document & Credential Vault with 3D Flip */}
        <div
          ref={vaultTiltRef}
          className="card-3d-flip preserve-3d rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-sm p-6 sm:p-10 shadow-2xl shadow-black/40"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span className="font-mono text-xs uppercase tracking-wider text-gold">
                  Restricted Repository
                </span>
              </div>
              <h3 className="display text-2xl sm:text-3xl text-paper">
                Academic Credential & Manuscript Vault
              </h3>
            </div>
            <button
              onClick={() => openVault()}
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl bg-gold/15 border border-gold/40 px-4 py-2.5 text-xs font-semibold text-gold hover:bg-gold/25 transition-all"
            >
              <span>Request Verified Access</span>
              <span className="text-xs">→</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-paper-dim mb-8 max-w-3xl leading-relaxed">
            In compliance with academic privacy and data-loss prevention, official diplomas, transcripts,
            supervisory letters, and pre-publication manuscripts are watermarked and distributed exclusively via
            verified institutional email request. Public downloads and unverified incognito accesses are restricted.
          </p>

          <div className="space-y-8">
            {/* Academic Credentials */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-paper-faint mb-4">
                Verified Credentials & Service Records ({credentials.length})
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {credentials.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 flex flex-col justify-between hover:border-white/[0.15] hover:bg-white/[0.06] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-[10px] uppercase text-emerald-bright">
                          {item.group}
                        </span>
                        <span className="text-xs text-gold">🔒</span>
                      </div>
                      <div className="font-medium text-sm text-paper">{item.label}</div>
                      <p className="mt-1 text-xs text-paper-dim leading-snug">{item.blurb}</p>
                    </div>
                    <button
                      onClick={() => openVault(item)}
                      className="mt-4 text-left font-mono text-[11px] text-emerald-bright hover:underline"
                    >
                      Request document access →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Research & Profiles */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-paper-faint mb-4">
                Protected Research Files & Dossiers ({researchDossiers.length})
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {researchDossiers.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 flex flex-col justify-between hover:border-white/[0.15] hover:bg-white/[0.06] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-[10px] uppercase text-gold">
                          {item.group}
                        </span>
                        <span className="text-xs text-gold">🔒</span>
                      </div>
                      <div className="font-medium text-sm text-paper">{item.label}</div>
                      <p className="mt-1 text-xs text-paper-dim leading-snug">{item.blurb}</p>
                    </div>
                    <button
                      onClick={() => openVault(item)}
                      className="mt-4 text-left font-mono text-[11px] text-emerald-bright hover:underline"
                    >
                      Request access via email →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Vault Modal */}
      <VaultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedItem={activeVaultItem}
      />
    </section>
  );
}
