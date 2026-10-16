'use client';

import React from 'react';

interface ResearchProps {
  onOpenResearchModal: (key: string) => void;
}

export default function Research({ onOpenResearchModal }: ResearchProps) {
  const articles = [
    {
      id: 'zn-air',
      status: 'Under Departmental Review',
      statusClass: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
      scope: 'Energy Storage &bull; Electrocatalysis',
      title: 'Why the Corner Is Empty: Antagonistic Requirements in Re-chargeable Zinc–Air Batteries',
      authors: 'Muhammad Kamran Ashraf, Hamda Maqbool, Safeer Ahmed*',
      affiliation: 'Department of Chemistry, Quaid-i-Azam University, Islamabad',
      summary: 'Critical investigation uncovering coupled failure modes (carbon corrosion, zinc dendrites, carbonate clogging) and round-trip efficiency trade-offs in alkaline Zn-air systems, presenting a rigorous standardized metric framework.',
      tags: ['Zinc–Air Batteries', 'Bifunctional ORR/OER', 'Failure Modes', 'Electrochemical Metrics'],
      corr: 'Corr: Prof. Dr. Safeer Ahmed',
    },
    {
      id: 'chitosan',
      status: 'Completed Manuscript',
      statusClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
      scope: 'Spectroscopy &bull; Hydrogels',
      title: 'Grafting of Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate',
      authors: 'Anam Rehman†, Muhammad Kamran Ashraf†,*, Hamda Maqbool',
      affiliation: 'PU School of Chemistry & QAU Department of Chemistry',
      summary: 'FTIR and DFT B3LYP/6-31G(d) evidence for β-ketoester covalent linkage on chitosan polysaccharides initiated by ammonium persulfate, engineered into magnetic Fe₃O₄/Alginate composite hydrogels for toxic heavy-metal chelation.',
      tags: ['Chitosan Grafting', 'FTIR & DFT Evidence', 'Fe₃O₄ Hydrogels', 'Heavy Metal Chelation'],
      corr: 'Corresponding Author',
    },
    {
      id: 'mof-cerium',
      status: 'MPhil Thesis Research (2025–2027)',
      statusClass: 'text-sky-400 bg-sky-950/40 border-sky-500/30',
      scope: 'Computational Chemistry &bull; DFT',
      title: 'Theoretical Investigation of Cerium Electronic Modulation (Ce³⁺/Ce⁴⁺) on Bimetallic NiCo-MOFs',
      authors: 'Muhammad Kamran Ashraf',
      affiliation: 'Supervisor: Prof. Dr. Safeer Ahmed | Co-supervisor: Dr. Zahid Rashid (QAU)',
      summary: 'First-principles density functional theory (DFT) simulation of Ce electronic modulation in bimetallic NiCo metal–organic framework catalytic sites, calculating reaction free energies for *OOH, *O, and *OH intermediates for bifunctional ORR/OER.',
      tags: ['Quantum ESPRESSO', 'Bimetallic NiCo-MOF', 'Ce³⁺/Ce⁴⁺ Redox Nodes', 'ORR/OER Free Energies'],
      corr: 'MPhil Thesis Proposal',
    },
    {
      id: 'bs-thesis',
      status: 'BS Thesis Defense (PU 2024)',
      statusClass: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30',
      scope: 'Nanotechnology &bull; Biosensors',
      title: 'Green Synthesis of CaO Nanoparticles & Urea-Imprinted PANi@CaO Biosensor',
      authors: 'Muhammad Kamran Ashraf',
      affiliation: 'Supervised by Dr. Imran Din & Dr. Adeel Afzal (Punjab University)',
      summary: 'Phytochemical green synthesis of CaO nanoparticles mediated by Syzygium cumini (Jamun) leaf extract, followed by conducting polyaniline (PANi) molecular imprinting for highly sensitive electrochemical urea sensing.',
      tags: ['Green Synthesis', 'CaO Nanoparticles', 'Molecular Imprinting (MIP)', 'Electrochemical Sensing'],
      corr: 'Supervisors: Dr. Din & Dr. Afzal',
    },
  ];

  return (
    <section className="py-16" id="research">
      <div className="flex flex-col gap-2 mb-10">
        <span className="font-mono text-xs text-[var(--accent-blue)] uppercase tracking-wider font-semibold">Research &amp; Publications</span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">Working Manuscripts &amp; Research Projects</h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl">
          Investigations spanning electrocatalytic energy conversion, molecularly imprinted polymeric biosensors, biopolymer grafting, and density functional theory (DFT).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[rgba(37,99,235,0.4)] p-6 rounded-md flex flex-col justify-between transition-colors duration-150 relative"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${art.statusClass}`}>
                  {art.status}
                </span>
                <span className="text-[11px] text-[var(--text-faint)] font-mono">{art.scope}</span>
              </div>

              <h3 className="font-heading text-lg font-bold text-[var(--text-heading)] leading-snug">
                {art.title}
              </h3>

              <div className="text-xs text-[var(--text-muted)]">
                <div className="font-medium text-[var(--text-main)]">{art.authors}</div>
                <div className="text-[11px] text-[var(--text-faint)]">{art.affiliation}</div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {art.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {art.tags.map((tag) => (
                  <span key={tag} className="text-[11px] bg-[rgba(255,255,255,0.04)] border border-[var(--border-subtle)] px-2 py-0.5 rounded text-[var(--text-muted)] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 mt-4 border-t border-[var(--border-subtle)] text-xs">
              <span className="text-[11px] text-[var(--text-faint)] font-mono">{art.corr}</span>
              <button
                onClick={() => onOpenResearchModal(art.id)}
                className="inline-flex items-center gap-1.5 text-[var(--accent-blue)] hover:underline font-semibold"
              >
                <span>View Details</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
