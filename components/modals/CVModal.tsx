'use client';

import React, { useEffect } from 'react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-blue)]" />
            <h3 id="cv-modal-title" className="font-heading text-sm sm:text-base font-bold text-[var(--text-heading)]">
              Curriculum Vitae &bull; Academic Record
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="text-xs bg-[var(--accent-blue)] hover:bg-[#1d4ed8] text-white px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5 font-semibold"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-white rounded hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              aria-label="Close CV modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* CV Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[var(--bg-primary)] text-xs sm:text-sm leading-relaxed text-[var(--text-main)] print:p-0 print:bg-white print:text-black">
          {/* Header Block */}
          <div className="border-b border-[var(--border-subtle)] pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)] print:text-black tracking-tight">
                Muhammad Kamran Ashraf (Kami)
              </h1>
              <p className="font-mono text-xs text-[var(--accent-blue)] mt-1 font-semibold">
                Postgraduate Physical Chemist &bull; Computational Electrocatalysis &bull; DFT
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Department of Chemistry, Quaid-i-Azam University (QAU), Islamabad 45320, Pakistan
              </p>
            </div>

            <div className="text-xs font-mono sm:text-right space-y-1 text-[var(--text-muted)]">
              <div>Email: <a href="mailto:kamranashraf51214@gmail.com" className="text-[var(--accent-blue)] hover:underline">kamranashraf51214@gmail.com</a></div>
              <div>GitHub: <a href="https://github.com/Kamran5H" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-blue)] hover:underline">github.com/Kamran5H</a></div>
              <div>QAU Reg: <span className="text-[var(--text-heading)]">02062511039</span></div>
              <div>Supervisor: <span className="text-[var(--text-heading)]">Prof. Dr. Safeer Ahmed</span></div>
            </div>
          </div>

          {/* Research Specialization */}
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--accent-blue)] border-b border-[var(--border-subtle)] pb-1 mb-3">
              Research Focus &amp; Specialization
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Computational and experimental electrocatalysis targeting renewable energy conversion (Oxygen Reduction Reaction [ORR] &amp; Oxygen Evolution Reaction [OER]). Specializing in bimetallic Metal-Organic Frameworks (Ce-doped NiCo-MOFs), conducting polymer nano-composites (Urea-PANi), green metal-oxide nanoparticle synthesis, and first-principles Density Functional Theory (DFT) modeling of adsorption energy barriers and electronic d-band shifts.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--accent-blue)] border-b border-[var(--border-subtle)] pb-1 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-[var(--accent-blue)] pl-3">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[var(--text-heading)]">
                    Master of Philosophy (M.Phil) in Physical Chemistry
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent-blue)] font-semibold">2025 – 2027</span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">Quaid-i-Azam University (QAU), Islamabad, Pakistan</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  Registration No: <strong>02062511039</strong> &bull; Coursework CGPA: <strong>3.30 / 4.00</strong> (4th Semester candidate)
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  Dissertation: <em>Ce-doped NiCo-MOF Architecture for Enhanced Bifunctional ORR/OER Electrocatalytic Activity: Experimental Synthesis &amp; DFT Insights</em>
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  Supervised by: <strong>Prof. Dr. Safeer Ahmed</strong> &bull; Co-supervisor: <strong>Dr. Zahid Rashid</strong>
                </div>
              </div>

              <div className="border-l-2 border-[var(--border-subtle)] pl-3">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[var(--text-heading)]">
                    Bachelor of Science (BS) in Chemistry (4-Year)
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">2020 – 2024</span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">School of Chemistry, University of the Punjab (PU), Lahore</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  Roll No: <strong>BSAD-Chem-M-66</strong> &bull; Registration No: <strong>2020-mco-485</strong> &bull; CGPA: <strong>2.97 / 4.00</strong> (Total Marks: 4855 / 7400)
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  Capstone Research: <em>Green Nanotechnology Synthesis of CaO Nanoparticles &amp; Electrochemical Urea Biosensing</em>
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  Mentors: <strong>Dr. Imran Din</strong> &amp; <strong>Dr. Adeel Afzal</strong>
                </div>
              </div>

              <div className="border-l-2 border-[var(--border-subtle)] pl-3">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[var(--text-heading)]">
                    Associate Degree in Science (ADS / B.Sc)
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">2020 – 2022</span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">Govt. Post Graduate College Okara &bull; University of the Punjab</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">Physical Chemistry, Physics, and Advanced Mathematics</div>
              </div>

              <div className="border-l-2 border-[var(--border-subtle)] pl-3">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[var(--text-heading)]">
                    Higher Secondary School Certificate (F.Sc Pre-Medical)
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">2017 – 2019</span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">Govt. Post Graduate College Okara &bull; BISE Sahiwal</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5 font-mono">
                  Grade: <strong>A+</strong> &bull; Marks: <strong>960 / 1100</strong> (87.27%) &bull; Roll No: 118461
                </div>
              </div>

              <div className="border-l-2 border-[var(--border-subtle)] pl-3">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[var(--text-heading)]">
                    Secondary School Certificate (Matriculation in Science)
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">2015 – 2017</span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">Govt High School 32/2L, Okara &bull; BISE Sahiwal</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5 font-mono">
                  Grade: <strong>A+</strong> &bull; Marks: <strong>917 / 1100</strong> (83.36%) &bull; Roll No: 147879
                </div>
              </div>
            </div>
          </div>

          {/* Academic Teaching Experience */}
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--accent-blue)] border-b border-[var(--border-subtle)] pb-1 mb-4">
              Academic Teaching Appointments
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[var(--text-heading)]">
                    Chemistry Lecturer (Intermediate &amp; Secondary)
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">Jan 2024 – Feb 2025</span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">Unique Science Academy &amp; High School, Johar View Campus, Lahore</div>
                <ul className="text-xs text-[var(--text-muted)] list-disc list-inside mt-1 space-y-0.5">
                  <li>Delivered rigorous lecture modules on Chemical Thermodynamics, Reaction Kinetics, and Electrochemistry to F.Sc students.</li>
                  <li>Supervised wet-chemical quantitative laboratory experiments, acid-base titrations, and spectrophotometry exercises.</li>
                  <li>Official teaching experience certificate endorsed by Principal &amp; Director of Academics.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[var(--text-heading)]">
                    Science Teacher (Chemistry, Physics, Mathematics)
                  </h3>
                  <span className="font-mono text-xs text-[var(--text-muted)]">Jan 2019 – Jan 2022</span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">The Educators (A Project of Beaconhouse), Noor Campus, Moza Joyia, Okara</div>
                <ul className="text-xs text-[var(--text-muted)] list-disc list-inside mt-1 space-y-0.5">
                  <li>Taught secondary classes in Chemistry and Physics with distinguished student examination pass rates.</li>
                  <li>Mentored students in science fairs, lab safety protocols, and model exhibitions.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical & Computational Skills */}
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--accent-blue)] border-b border-[var(--border-subtle)] pb-1 mb-3">
              Laboratory &amp; Computational Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded">
                <strong className="block text-[var(--text-heading)] font-semibold mb-1">Electrochemical &amp; Material Analytics:</strong>
                <span>Cyclic Voltammetry (CV), Linear Sweep Voltammetry (LSV), Electrochemical Impedance Spectroscopy (EIS), Tafel plot kinetic extraction, Chronoamperometry, XRD, FTIR, UV-Vis, SEM.</span>
              </div>
              <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded">
                <strong className="block text-[var(--text-heading)] font-semibold mb-1">Computational &amp; Quantum Chemistry:</strong>
                <span>Density Functional Theory (DFT), Quantum ESPRESSO, ORCA, VASP input generation, Avogadro, ChemDraw, Multiwfn, ASE (Atomic Simulation Environment).</span>
              </div>
              <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded">
                <strong className="block text-[var(--text-heading)] font-semibold mb-1">Scientific Programming:</strong>
                <span>Python (NumPy, SciPy, Matplotlib, Pandas, Streamlit), Bash scripting for HPC clusters, Next.js, Git/GitHub, LaTeX.</span>
              </div>
              <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded">
                <strong className="block text-[var(--text-heading)] font-semibold mb-1">Chemical Synthesis Protocols:</strong>
                <span>Hydrothermal MOF synthesis, sol-gel nanoparticle precipitation, chemical in-situ oxidative polymerization (PANI), green phytochelation.</span>
              </div>
            </div>
          </div>

          {/* Academic References */}
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--accent-blue)] border-b border-[var(--border-subtle)] pb-1 mb-3">
              Academic References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="border border-[var(--border-subtle)] p-3 rounded">
                <h4 className="font-heading font-bold text-[var(--text-heading)]">Prof. Dr. Safeer Ahmed</h4>
                <div className="text-[var(--text-muted)]">Professor of Physical Chemistry (Research Supervisor)</div>
                <div className="text-[var(--text-muted)]">Department of Chemistry, Quaid-i-Azam University, Islamabad</div>
                <div className="font-mono text-[11px] text-[var(--accent-blue)] mt-1">Email: safeer@qau.edu.pk</div>
              </div>

              <div className="border border-[var(--border-subtle)] p-3 rounded">
                <h4 className="font-heading font-bold text-[var(--text-heading)]">Dr. Zahid Rashid</h4>
                <div className="text-[var(--text-muted)]">Assistant Professor / Co-Supervisor</div>
                <div className="text-[var(--text-muted)]">Department of Chemistry, Quaid-i-Azam University, Islamabad</div>
                <div className="font-mono text-[11px] text-[var(--text-muted)] mt-1">Specialization: Computational &amp; Quantum Chemistry</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--text-muted)]">Department of Chemistry, QAU Islamabad &bull; Reg No: 02062511039</span>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-white underline font-sans"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
