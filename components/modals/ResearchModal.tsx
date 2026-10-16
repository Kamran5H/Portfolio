'use client';

import React, { useEffect } from 'react';

interface ResearchModalProps {
  paperId: string | null;
  onClose: () => void;
  onToast?: (msg: string, type: 'info' | 'success' | 'error') => void;
}

export default function ResearchModal({ paperId, onClose, onToast }: ResearchModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (paperId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [paperId, onClose]);

  if (!paperId) return null;

  const papers: Record<
    string,
    {
      title: string;
      status: string;
      scope: string;
      authors: string;
      affiliation: string;
      correspondence: string;
      abstract: string;
      keywords: string[];
      highlights: string[];
      bibtex: string;
    }
  > = {
    'zn-air': {
      title: 'Why the Corner Is Empty: Antagonistic Requirements in Re-chargeable Zinc–Air Batteries',
      status: 'Under Departmental Review',
      scope: 'Electrocatalysis & Renewable Energy Storage',
      authors: 'Muhammad Kamran Ashraf, Hamda Maqbool, Safeer Ahmed*',
      affiliation: 'Department of Chemistry, Quaid-i-Azam University (QAU), Islamabad 45320, Pakistan',
      correspondence: 'Prof. Dr. Safeer Ahmed (safeer@qau.edu.pk)',
      abstract:
        'Rechargeable alkaline zinc-air batteries (ZABs) theoretically offer ultra-high specific energy density (>1086 Wh/kg) and exceptional environmental safety. However, commercial viability remains impeded by severe coupled degradation pathways across the oxygen-electrocatalyst and the zinc anode. In this study, we provide a rigorous analytical dissection of antagonistic kinetic requirements between the Oxygen Reduction Reaction (ORR) and Oxygen Evolution Reaction (OER). We evaluate the synergistic role of transition metal doped spinel/perovskite frameworks and Ce-doped NiCo-MOF structures, identifying critical overpotential trade-offs and electrolyte carbonation bottlenecks. A standardized metric framework is introduced to benchmark round-trip energy efficiency and active site preservation.',
      keywords: ['Zinc-Air Batteries', 'Bifunctional Electrocatalysis', 'ORR/OER Kinetics', 'Ce-NiCo MOF', 'Degradation Mechanisms'],
      highlights: [
        'Systematic map of coupled failure modes: carbon corrosion, zinc passivation, and electrolyte carbonation.',
        'Overpotential balancing at the bifunctional air electrode with low overall gap (ΔE < 0.75 V).',
        'Detailed metric benchmarking protocol for reproducible round-trip stability evaluation.',
      ],
      bibtex: `@article{ashraf2025znair,
  author = {Ashraf, Muhammad Kamran and Maqbool, Hamda and Ahmed, Safeer},
  title = {Why the Corner Is Empty: Antagonistic Requirements in Re-chargeable Zinc–Air Batteries},
  journal = {Departmental Working Paper, Quaid-i-Azam University},
  year = {2025},
  note = {Under Review}
}`,
    },
    'chitosan': {
      title: 'Grafting of Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate',
      status: 'Completed Manuscript',
      scope: 'Polymer Chemistry & Biomaterial Synthesis',
      authors: 'Anam Rehman†, Muhammad Kamran Ashraf†,*, Hamda Maqbool',
      affiliation: 'School of Chemistry, University of the Punjab & Department of Chemistry, QAU Islamabad',
      correspondence: 'Muhammad Kamran Ashraf (kamranashraf51214@gmail.com)',
      abstract:
        'Chemical functionalization of biopolymeric chitosan via free-radical grafting provides tailored matrices for heavy metal chelation and biomedical hydrogels. Herein, ethyl acetoacetate (EAA) was covalently grafted onto chitosan backbones using ammonium persulfate (APS) as a water-soluble radical initiator. Optimal reaction parameters—including monomer-to-backbone ratios, initiator concentration, and activation temperature—were systematically investigated. The graft copolymer (Chitosan-g-EAA) was characterized via FTIR spectroscopy (confirming ester carbonyl C=O at 1718 cm⁻¹ and secondary amide linkages), XRD crystallography (revealing reduced crystalline packing), and TGA thermogravimetry indicating heightened thermal stability.',
      keywords: ['Chitosan', 'Ethyl Acetoacetate', 'Ammonium Persulfate', 'Free-Radical Grafting', 'Spectroscopic Characterization'],
      highlights: [
        'Successful graft copolymerization yielding grafting percentages up to 68.4%.',
        'Distinct FTIR vibrational verification of keto-ester functional moieties onto glucosamine units.',
        'Enhanced thermal degradation onset compared to pristine biopolymer substrate.',
      ],
      bibtex: `@article{rehman2024chitosan,
  author = {Rehman, Anam and Ashraf, Muhammad Kamran and Maqbool, Hamda},
  title = {Grafting of Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate: Synthesis, Optimization, and Physicochemical Characterization},
  year = {2024},
  note = {Completed Manuscript}
}`,
    },
    'cao': {
      title: 'Facile Biosynthesis of Calcium Oxide Nanoparticles from Citrus limetta Peels for Enhanced Photocatalytic Degradation of Methylene Blue',
      status: 'In Preparation',
      scope: 'Green Nanotechnology & Environmental Photochemistry',
      authors: 'Muhammad Kamran Ashraf, Imran Din*, Safeer Ahmed',
      affiliation: 'School of Chemistry, University of the Punjab & Department of Chemistry, QAU Islamabad',
      correspondence: 'Dr. Imran Din (School of Chemistry, PU Lahore)',
      abstract:
        'Green synthesis routes utilizing agro-waste biomass circumvent hazardous synthetic reagents and yield biocompatible metal-oxide nanoparticles. We report a green sol-gel route synthesizing crystalline Calcium Oxide nanoparticles (CaO NPs) utilizing aqueous peel extracts of sweet lime (Citrus limetta) as stabilizing and chelating agents. Following calcination at 600 °C, XRD confirmed cubic phase purity (JCPDS 82-1690) with an average crystallite diameter of 24.3 nm calculated via the Scherrer formula. Under UV-visible irradiation, CaO NPs demonstrated superior catalytic efficiency, degrading >94% of hazardous methylene blue dye within 75 minutes adhering to pseudo-first-order kinetics.',
      keywords: ['Calcium Oxide Nanoparticles', 'Citrus limetta', 'Green Synthesis', 'Photocatalysis', 'Methylene Blue'],
      highlights: [
        'Eco-friendly calcination protocol converting citrus agro-waste into active heterogeneous nano-catalysts.',
        'Scherrer crystallite sizing yielding homogenous 24 nm crystallites.',
        'Over 94% degradation efficiency within 75 min of light irradiation.',
      ],
      bibtex: `@article{ashraf2024cao,
  author = {Ashraf, Muhammad Kamran and Din, Imran and Ahmed, Safeer},
  title = {Facile Biosynthesis of Calcium Oxide Nanoparticles from Citrus limetta Peels for Enhanced Photocatalytic Degradation of Methylene Blue},
  year = {2024},
  note = {Manuscript in Preparation}
}`,
    },
    'urea-pani': {
      title: 'Conductive Polyaniline/Urea Nanocomposite Films for Potentiometric Diagnostic Biosensing',
      status: 'Research Project',
      scope: 'Conducting Polymers & Electrochemical Diagnostics',
      authors: 'Muhammad Kamran Ashraf, Adeel Afzal*, Safeer Ahmed',
      affiliation: 'School of Chemistry, University of the Punjab & Department of Chemistry, QAU Islamabad',
      correspondence: 'Dr. Adeel Afzal (School of Chemistry, PU Lahore)',
      abstract:
        'Potentiometric and amperometric biosensors require active polymer transducing matrices exhibiting rapid electron transfer kinetics and stable mechanical properties. This investigation focuses on the in-situ oxidative chemical polymerization of aniline in the presence of functional urea dopants. The resulting Polyaniline/Urea (PANi/Urea) hybrid films were drop-cast onto screen-printed carbon electrodes (SPCE). Cyclic voltammetry and electrochemical impedance spectroscopy (EIS) revealed improved electroactive surface area and markedly lower charge-transfer resistance (Rct), demonstrating linear potentiometric responses across clinical analyte concentrations.',
      keywords: ['Polyaniline', 'Urea Sensor', 'Conducting Polymers', 'Cyclic Voltammetry', 'Charge-Transfer Resistance'],
      highlights: [
        'Enhanced electroactive surface area compared to unmodified emeraldine salt.',
        'Substantial reduction in charge-transfer resistance confirmed by Nyquist impedance modeling.',
        'Linear potentiometric response across physiologically relevant concentrations.',
      ],
      bibtex: `@article{ashraf2024ureapani,
  author = {Ashraf, Muhammad Kamran and Afzal, Adeel and Ahmed, Safeer},
  title = {Conductive Polyaniline/Urea Nanocomposite Films for Potentiometric Diagnostic Biosensing},
  year = {2024},
  note = {Research Project}
}`,
    },
  };

  const current = papers[paperId] || papers['zn-air'];

  const copyBibtex = () => {
    navigator.clipboard.writeText(current.bibtex);
    if (onToast) onToast('BibTeX citation copied to clipboard.', 'info');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="research-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[var(--accent-blue)] font-semibold uppercase tracking-wider">
              {current.scope}
            </span>
            <span>&bull;</span>
            <span className="font-mono text-xs text-amber-400">{current.status}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-white rounded hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            aria-label="Close research modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          <div>
            <h2 id="research-modal-title" className="font-heading text-lg sm:text-xl font-bold text-[var(--text-heading)] leading-snug">
              {current.title}
            </h2>
            <div className="text-xs text-[var(--text-muted)] mt-2">
              <div className="font-medium text-[var(--text-main)]">{current.authors}</div>
              <div className="text-[11px] text-[var(--text-faint)] mt-0.5">{current.affiliation}</div>
              <div className="text-[11px] font-mono text-[var(--accent-blue)] mt-1">{current.correspondence}</div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)] mb-2">
              Scientific Abstract
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {current.abstract}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)] mb-2">
              Key Methodology Highlights
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-[var(--text-muted)]">
              {current.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)] mb-2">
              Indexed Keywords
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {current.keywords.map((k) => (
                <span key={k} className="text-[11px] font-mono bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)] px-2.5 py-1 rounded text-[var(--text-muted)]">
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* BibTeX Citation Box */}
          <div className="bg-[#030611] border border-[var(--border-subtle)] p-4 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                BibTeX Citation
              </span>
              <button
                onClick={copyBibtex}
                className="inline-flex items-center gap-1.5 text-xs bg-[var(--accent-blue)] hover:bg-[#1d4ed8] text-white px-2.5 py-1 rounded transition-colors font-medium"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy BibTeX</span>
              </button>
            </div>
            <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre p-2 bg-black/40 rounded">
              {current.bibtex}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--text-muted)]">Department of Chemistry, QAU Islamabad</span>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-white underline font-sans"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
