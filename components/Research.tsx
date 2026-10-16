'use client';

import { useState, useEffect } from 'react';
import { EMAIL } from '@/lib/site';

export type Paper = {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  institution: string;
  supervisor?: string;
  state: 'In progress' | 'Under review' | 'Completed manuscript' | 'Published / Capstone';
  where: string;
  img: string;
  abstract: string;
  methods: string[];
  highlights: string[];
};

export const PAPERS: Paper[] = [
  {
    id: 'ce-nico-mof',
    title: 'Cerium Modulation of Bimetallic NiCo-MOFs for ORR/OER',
    subtitle: 'MPhil Physical Chemistry Thesis Research',
    authors: 'Muhammad Kamran Ashraf, Prof. Dr. Safeer Ahmed*, Dr. Zahid Rashid',
    institution: 'Department of Chemistry, Quaid-i-Azam University, Islamabad',
    supervisor: 'Prof. Dr. Safeer Ahmed (Professor of Physical Chemistry, QAU)',
    state: 'In progress',
    where: 'MPhil thesis · QAU · DFT (Quantum ESPRESSO) + bench experiment',
    img: '/assets/images/research/03_Ce_Doped_NiCo_MOF_3D.png',
    abstract: 'Investigation of trivalent/tetravalent Cerium (Ce³⁺/Ce⁴⁺) electronic modulation on bimetallic NiCo metal–organic frameworks with benzene-1,4-dicarboxylate (BDC) organic linkers. By introducing Ce heteroatoms into NiCo coordination nodes, we alter local d-band electron densities and optimize adsorption energies of *O, *OH, and *OOH reaction intermediates to lower the overpotential of both Oxygen Reduction Reaction (ORR) and Oxygen Evolution Reaction (OER).',
    methods: ['Quantum ESPRESSO DFT', 'GGA-PBE + Hubbard U', 'Hydrothermal Synthesis', 'Cyclic Voltammetry (CV)', 'EIS & Tafel Analysis'],
    highlights: [
      'Engineered bimetallic NiCo nodes with Ce electronic modulation to tailor intermediate binding energies.',
      'Constructed DFT slab supercells evaluating d-band center shifts vs. overpotential scaling.',
      'Demonstrated high electrocatalytic durability in alkaline electrolyte (0.1 M KOH).',
    ],
  },
  {
    id: 'zn-air-review',
    title: 'Why the Corner is Empty: Trade-offs in Rechargeable Zn–Air Batteries',
    subtitle: 'Critical Review & Standardized Reporting Framework',
    authors: 'Muhammad Kamran Ashraf, Hamda Maqbool, Prof. Dr. Safeer Ahmed*',
    institution: 'Department of Chemistry, Quaid-i-Azam University, Islamabad',
    supervisor: 'Prof. Dr. Safeer Ahmed (Corresponding Author)',
    state: 'Under review',
    where: 'Departmental review · with Prof. Safeer Ahmed · QAU',
    img: '/assets/images/research/04_ORR_OER_Reaction_Intermediates.png',
    abstract: 'A comprehensive evaluation of coupled failure modes in secondary zinc–air energy storage. We critically delineate the thermodynamic and kinetic boundaries governing zinc dendrite growth, carbonate precipitation in alkaline electrolytes, and carbon electro-oxidation under high anodic OER potentials. We establish an unambiguous benchmark testing matrix to standardize round-trip efficiency reporting across literature.',
    methods: ['Systematic Literature Meta-Analysis', 'Failure Mode Analysis', 'Electrochemical Metric Standardization', 'Three-Electrode Benchmarking'],
    highlights: [
      'Decoupled four co-occurring failure mechanisms causing round-trip efficiency degradation.',
      'Proposed a 5-point standardized reporting protocol for bifunctional air-cathode catalysts.',
      'Uncovered why high power density and extended cycle life seldom co-occur without protective electrolyte architectures.',
    ],
  },
  {
    id: 'chitosan-grafting',
    title: 'Grafting Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate',
    subtitle: 'Spectroscopic & Quantum Chemical Evidence',
    authors: 'Anam Rehman†, Muhammad Kamran Ashraf†*, Hamda Maqbool',
    institution: 'School of Chemistry, Punjab University & Department of Chemistry, QAU',
    state: 'Completed manuscript',
    where: 'FTIR + B3LYP evidence · Fe₃O₄ hydrogel adsorption · Completed',
    img: '/assets/images/research/01_BDC_Linker_Structure.png',
    abstract: 'Radical-initiated chemical grafting of ethyl acetoacetate onto biopolymeric chitosan chains using ammonium persulfate (APS). The modified macromolecules were integrated into magnetic Fe₃O₄/alginate nanocomposite hydrogel beads. Characterized via FTIR spectroscopy and supported by Gaussian DFT calculations at the B3LYP/6-31G(d) level to confirm covalent β-ketoester functionalization for heavy-metal ion chelation.',
    methods: ['FTIR Spectroscopy', 'Gaussian 09 / 16 DFT', 'B3LYP / 6-31G(d)', 'Hydrogel Sol-Gel Synthesis', 'Heavy Metal Adsorption'],
    highlights: [
      'Spectroscopic confirmation of ester C=O stretch and amine condensation peaks.',
      'DFT electronic structure optimization demonstrating reduced HOMO-LUMO gap upon grafting.',
      'High adsorption capacity for aqueous heavy metal ion removal with magnetic separability.',
    ],
  },
  {
    id: 'cao-biosensor',
    title: 'Green CaO Nanoparticles & Molecularly Imprinted PANi Urea Biosensor',
    subtitle: 'BS Chemistry Capstone Research Project',
    authors: 'Muhammad Kamran Ashraf, Dr. Imran Din*, Dr. Adeel Afzal*, Prof. Dr. Safeer Ahmed',
    institution: 'School of Chemistry, University of the Punjab, Lahore',
    state: 'Published / Capstone',
    where: 'BS thesis · University of the Punjab · 2024',
    img: '/assets/images/research/02_Pristine_NiCo_MOF_2D_3D.png',
    abstract: 'Green synthesis of crystalline calcium oxide (CaO) nanoparticles utilizing Citrus limetta peel biocomponents as non-toxic chelating and reducing agents. The engineered nanocrystals were incorporated into polyaniline (PANi) conducting polymer matrices to fabricate potentiometric molecularly imprinted polymer (MIP) biosensors with selective recognition cavities for diagnostic urea detection.',
    methods: ['Green Biosynthesis', 'In-situ Oxidative Polymerization', 'Potentiometric Biosensing', 'XRD & SEM Morphology', 'UV-Vis Spectrophotometry'],
    highlights: [
      'Facile eco-friendly biosynthesis of rock-salt CaO nanocrystals without toxic surfactants.',
      'Demonstrated high linear sensitivity for clinical urea detection in aqueous samples.',
      'Graduated with distinction at University of the Punjab (BS Roll No: BSAD-Chem-M-66).',
    ],
  },
];

export type Credential = {
  id: string;
  title: string;
  category: 'Degree' | 'Transcript' | 'Identity' | 'Experience' | 'Certification';
  issuer: string;
  date: string;
  img: string;
  desc: string;
};

export const CREDENTIALS: Credential[] = [
  { id: 'qau-card', title: 'QAU Student Identity Card', category: 'Identity', issuer: 'Quaid-i-Azam University, Islamabad', date: 'Session 2025–2027', img: '/assets/images/docs/student_card_qau.jpeg', desc: 'MPhil Physical Chemistry candidate identity card. Reg No: 02062511039.' },
  { id: 'pu-degree', title: 'BS (Hons) Chemistry Degree', category: 'Degree', issuer: 'University of the Punjab, Lahore', date: 'Conferred 2024', img: '/assets/images/docs/bs_degree_pu.jpg', desc: '4-Year Bachelor of Science in Chemistry. Roll No: BSAD-Chem-M-66.' },
  { id: 'pu-transcript', title: 'PU BS Official Transcript', category: 'Transcript', issuer: 'University of the Punjab', date: '2020–2024', img: '/assets/images/docs/transcript_pu.jpg', desc: 'Complete academic transcript with coursework in Physical, Inorganic, Organic, and Analytical Chemistry.' },
  { id: 'unique-exp', title: 'Senior Chemistry Lecturer Letter', category: 'Experience', issuer: 'Unique Science Academy, Johar View, Lahore', date: 'Jan 2024 – Feb 2025', img: '/assets/images/docs/experience_unique.jpg', desc: 'Formal service letter for teaching F.Sc Physical & Inorganic Chemistry and supervising laboratories.' },
  { id: 'educators-exp', title: 'Science Teacher Experience Letter', category: 'Experience', issuer: 'The Educators (Beaconhouse System), Okara', date: 'Jan 2019 – Jan 2022', img: '/assets/images/docs/experience_educators.jpg', desc: 'Formal institutional appointment letter for secondary science teaching and lab safety.' },
  { id: 'fsc-cert', title: 'Higher Secondary School Certificate (F.Sc)', category: 'Certification', issuer: 'BISE Sahiwal', date: '2017–2019', img: '/assets/images/docs/fsc_premed.jpg', desc: 'F.Sc Pre-Medical: 960 / 1100 marks (Grade A+, 87.27%).' },
  { id: 'matric-cert', title: 'Secondary School Certificate (Matric)', category: 'Certification', issuer: 'BISE Sahiwal', date: '2015–2017', img: '/assets/images/docs/matric_science.jpg', desc: 'Matriculation in Science: 917 / 1100 marks (Grade A+, 83.36%).' },
  { id: 'award-green', title: 'Inter-University Co-Curricular Award', category: 'Certification', issuer: 'Green International University', date: '2023', img: '/assets/images/docs/naat_competition_green_uni.jpg', desc: 'First place university award in classical literary recitation.' },
];

export default function Research() {
  const [activePaper, setActivePaper] = useState<Paper | null>(null);
  const [activeDoc, setActiveDoc] = useState<Credential | null>(null);
  const [showDocs, setShowDocs] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePaper(null);
        setActiveDoc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="research" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-8 sm:py-32">
        <div className="reveal mb-14 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <div className="meta mb-3 flex items-center gap-2 text-paper-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Electrocatalysis & Computational Physics
            </div>
            <h2 className="display text-5xl sm:text-7xl">The day job</h2>
          </div>
          <div className="lg:justify-self-end text-sm text-paper-dim max-w-md">
            <p>
              Bifunctional electrocatalysts for rechargeable zinc–air batteries, modelled in Quantum ESPRESSO and synthesized at Quaid-i-Azam University under{' '}
              <strong className="text-paper">Prof. Dr. Safeer Ahmed</strong>.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setShowDocs(!showDocs)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  showDocs ? 'border-signal bg-signal text-ink font-semibold' : 'border-line text-paper-dim hover:text-paper hover:border-paper-dim'
                }`}
              >
                {showDocs ? 'Hide Verified Credentials' : `View Verified Credentials (${CREDENTIALS.length} Scans) ↓`}
              </button>
            </div>
          </div>
        </div>

        {/* Paper Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAPERS.map((p, i) => (
            <article
              key={p.id}
              onClick={() => setActivePaper(p)}
              className="reveal group cursor-pointer flex flex-col rounded-2xl border border-line bg-ink-2 p-4 transition-all duration-300 hover:border-line-2 hover:bg-ink-3"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="aspect-square overflow-hidden rounded-xl border border-line/60 bg-[#f4f1ea] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="rounded-full bg-ink/90 backdrop-blur px-3 py-1 font-mono text-[10px] text-paper border border-line">
                    Inspect Abstract ↗
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <div className="meta text-[10px] text-signal font-semibold">{p.state}</div>
                <h3 className="mt-2 font-medium leading-snug text-paper group-hover:text-signal transition-colors text-base line-clamp-2">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs text-paper-faint line-clamp-2">{p.where}</p>
                <div className="mt-auto pt-4 flex items-center justify-between text-[11px] font-mono text-paper-dim border-t border-line/50">
                  <span>Abstract & DFT details</span>
                  <span className="group-hover:translate-x-0.5 transition-transform text-signal">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Verified Credentials Section (Expandable) */}
        {showDocs && (
          <div className="mt-16 rounded-2xl border border-line bg-ink-2 p-6 sm:p-8 animate-[fadein_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-4">
              <div>
                <h3 className="display text-2xl text-paper">Verified Academic Credentials</h3>
                <p className="text-sm text-paper-dim">Official degrees, university transcripts, QAU candidate identity, and institutional experience certificates.</p>
              </div>
              <span className="font-mono text-xs text-signal">100% Verified Records</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CREDENTIALS.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setActiveDoc(doc)}
                  className="group cursor-pointer rounded-xl border border-line bg-ink p-3 transition-colors hover:border-signal/50 hover:bg-ink-3"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-black/40 border border-line/40 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={doc.img} alt={doc.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute bottom-2 right-2 rounded bg-ink/80 backdrop-blur px-2 py-0.5 font-mono text-[9px] text-paper">
                      Scan
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-signal">{doc.category}</span>
                    <h4 className="mt-1 text-sm font-medium text-paper line-clamp-1 group-hover:text-signal transition-colors">{doc.title}</h4>
                    <p className="text-xs text-paper-faint line-clamp-1">{doc.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Research Paper Modal */}
      {activePaper && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="paper-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-[fadein_0.2s_ease-out]"
          onClick={() => setActivePaper(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-ink p-6 sm:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePaper(null)}
              aria-label="Close modal"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line text-paper hover:bg-ink-2"
            >
              ✕
            </button>

            <div className="meta flex items-center gap-2 text-signal">
              <span>{activePaper.state}</span> · <span>{activePaper.subtitle}</span>
            </div>

            <h3 id="paper-title" className="display mt-3 text-3xl sm:text-4xl text-paper leading-tight">
              {activePaper.title}
            </h3>

            <div className="mt-4 border-y border-line py-3 text-xs text-paper-dim space-y-1">
              <div><strong>Authors:</strong> {activePaper.authors}</div>
              <div><strong>Affiliation:</strong> {activePaper.institution}</div>
              {activePaper.supervisor && <div><strong>Supervision:</strong> {activePaper.supervisor}</div>}
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-56 shrink-0 rounded-2xl border border-line bg-[#f4f1ea] p-3 aspect-square flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activePaper.img} alt={activePaper.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex-1">
                <h4 className="meta text-xs text-paper font-semibold uppercase tracking-wider">Abstract & Scientific Scope</h4>
                <p className="mt-2 text-sm leading-relaxed text-paper-dim">{activePaper.abstract}</p>

                <h4 className="meta mt-5 text-xs text-paper font-semibold uppercase tracking-wider">Methods & Computational Tools</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activePaper.methods.map((m) => (
                    <span key={m} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-paper-dim bg-ink-2">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-line bg-ink-2 p-4">
              <h4 className="meta text-xs text-paper font-semibold uppercase tracking-wider">Key Findings & Contributions</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-paper-dim list-disc list-inside">
                {activePaper.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <span className="font-mono text-xs text-paper-faint">MPhil Research · Department of Physical Chemistry, QAU</span>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Academic Inquiry: ${activePaper.title}`)}`}
                className="btn btn-solid text-xs py-2 px-4"
              >
                Inquire with Authors ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Verified Document Preview Modal */}
      {activeDoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="doc-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-[fadein_0.2s_ease-out]"
          onClick={() => setActiveDoc(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-ink p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveDoc(null)}
              aria-label="Close document modal"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line text-paper hover:bg-ink-2"
            >
              ✕
            </button>
            <span className="meta text-signal text-xs">{activeDoc.category} · {activeDoc.date}</span>
            <h3 id="doc-title" className="display mt-1 text-2xl text-paper">{activeDoc.title}</h3>
            <p className="text-xs text-paper-dim mt-1">{activeDoc.desc} · <span className="text-paper">{activeDoc.issuer}</span></p>

            <div className="mt-5 overflow-hidden rounded-xl border border-line bg-black/60 max-h-[60vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeDoc.img} alt={activeDoc.title} className="w-full h-auto object-contain max-h-[60vh]" />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-paper-faint">
              <span>Verified Institutional Record</span>
              <a href={activeDoc.img} target="_blank" rel="noopener noreferrer" className="link-arrow text-paper hover:text-signal">
                Open Full Resolution Scan ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
