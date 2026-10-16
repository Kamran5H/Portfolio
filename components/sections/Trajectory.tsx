'use client';

import React from 'react';

interface TrajectoryProps {
  onOpenDoc: (title: string, src: string, caption: string) => void;
}

export default function Trajectory({ onOpenDoc }: TrajectoryProps) {
  const steps = [
    {
      period: '2025 – 2027',
      role: 'MPhil Candidate in Physical Chemistry (4th Semester)',
      org: 'Department of Chemistry, Quaid-i-Azam University (QAU), Islamabad',
      details: [
        'Reg No: 02062511039 | Current Coursework CGPA: 3.30 / 4.00',
        'Specialization: Computational Electrocatalysis, Density Functional Theory (DFT), and Ce-doped NiCo-MOF Materials for ORR/OER.',
        'Supervised by Prof. Dr. Safeer Ahmed (Professor of Physical Chemistry, QAU) & Dr. Zahid Rashid (Co-supervisor).',
      ],
      docs: [
        {
          label: 'View QAU Student Card',
          src: '/assets/images/docs/student_card_qau.jpeg',
          caption: 'Quaid-i-Azam University M.Phil Student Identity Card & Registration No: 02062511039.',
        },
      ],
    },
    {
      period: 'Jan 2024 – Feb 2025',
      role: 'Senior Chemistry Lecturer (Intermediate & Secondary)',
      org: 'Unique Science Academy & High School (Johar View Campus, Lahore)',
      details: [
        'Taught F.Sc Physical and Inorganic Chemistry with advanced stoichiometric and reaction kinetics laboratory demonstrations.',
        'Official experience certificate endorsed by Principal & Director of Academics.',
      ],
      docs: [
        {
          label: 'View Experience Letter',
          src: '/assets/images/docs/experience_unique.jpg',
          caption: 'Official Teaching Experience Certificate, Unique High School & Science Academy Lahore.',
        },
      ],
    },
    {
      period: '2020 – 2024',
      role: 'Bachelor of Science (BS) in Chemistry',
      org: 'School of Chemistry, University of the Punjab (PU), Lahore',
      details: [
        'Graduated with CGPA 2.97 (Total marks 4855/7400) under Roll Number BSAD-Chem-M-66, Reg No 2020-mco-485.',
        'Completed capstone research in Green Nanotechnology (with Dr. Imran Din) and Electrochemical Biosensing (with Dr. Adeel Afzal).',
        'Conferred original BS degree and detailed marks transcript covering all 8 semesters.',
      ],
      docs: [
        {
          label: 'View BS Degree',
          src: '/assets/images/docs/bs_degree_pu.jpg',
          caption: 'Original BS Chemistry Degree conferred by University of the Punjab, Lahore.',
        },
        {
          label: 'View Full Transcript',
          src: '/assets/images/docs/transcript_pu.jpg',
          caption: 'Official Detailed Marks Transcript (Semesters 1–8), School of Chemistry, University of the Punjab.',
        },
      ],
    },
    {
      period: '2020 – 2022',
      role: 'Associate Degree in Science (ADS / B.Sc)',
      org: 'Govt. Post Graduate College, Okara &bull; University of the Punjab',
      details: [
        'Core curriculum in Physical Chemistry, Physics, and Mathematics.',
        'Provided direct credit transfer into 5th semester BS Chemistry at Punjab University.',
      ],
      docs: [
        {
          label: 'View Result Card',
          src: '/assets/images/docs/bsc_ads_pu.jpeg',
          caption: 'University of the Punjab Result Intimation Card for Associate Degree in Science.',
        },
      ],
    },
    {
      period: 'Jan 2019 – Jan 2022',
      role: 'Science Teacher (Chemistry, Physics, Math)',
      org: 'The Educators (Noor Campus, Moza Joyia, Okara)',
      details: [
        'Taught secondary classes in Chemistry and Physics with distinguished student examination pass rates.',
        'Official experience certificate endorsed by Campus Principal.',
      ],
      docs: [
        {
          label: 'View Experience Certificate',
          src: '/assets/images/docs/experience_educators.jpg',
          caption: 'Official Experience Letter from Principal, The Educators Noor Campus Okara.',
        },
      ],
    },
    {
      period: '2017 – 2019',
      role: 'F.Sc Pre-Medical (Grade A+ | 960 / 1100 Marks)',
      org: 'Govt. Post Graduate College, Okara &bull; BISE Sahiwal',
      details: [
        'Roll Number: 118461 | Enrolled under Pre-Medical group (Chemistry, Biology, Physics).',
        'Awarded Grade A+ (87.27%) by Board of Intermediate and Secondary Education (BISE) Sahiwal.',
      ],
      docs: [
        {
          label: 'View F.Sc Certificate',
          src: '/assets/images/docs/fsc_premed.jpg',
          caption: 'BISE Sahiwal Higher Secondary School Certificate, F.Sc Pre-Medical Grade A+ (960/1100).',
        },
      ],
    },
    {
      period: '2015 – 2017',
      role: 'Secondary School Certificate (Matric Science | 917 / 1100 Marks)',
      org: 'Govt High School 32/2L, Okara &bull; BISE Sahiwal',
      details: [
        'Roll Number: 147879 | Science Group (Chemistry, Biology, Physics, Mathematics).',
        'Awarded Grade A+ (83.36%) by BISE Sahiwal Board.',
      ],
      docs: [
        {
          label: 'View Matric Certificate',
          src: '/assets/images/docs/matric_science.jpg',
          caption: 'BISE Sahiwal Secondary School Certificate, Matriculation Science Grade A+ (917/1100).',
        },
      ],
    },
  ];

  return (
    <section className="py-16" id="trajectory">
      <div className="flex flex-col gap-2 mb-10">
        <span className="font-mono text-xs text-[var(--accent-blue)] uppercase tracking-wider font-semibold">Academic Trajectory</span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">Academic &amp; Professional Record</h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl">
          Reverse chronological progression from postgraduate physical chemistry research at Quaid-i-Azam University to foundational science education. Backed by official documentation.
        </p>
      </div>

      <div className="relative border-l-2 border-[var(--border-subtle)] ml-3 sm:ml-4 space-y-8">
        {steps.map((st, i) => (
          <div key={i} className="relative pl-6 sm:pl-8">
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-blue)]" />

            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[rgba(37,99,235,0.4)] p-5 sm:p-6 rounded-md transition-all">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-[var(--text-heading)]">{st.role}</h3>
                  <div className="text-xs sm:text-sm text-[var(--text-muted)]">{st.org}</div>
                </div>
                <span className="font-mono text-xs font-semibold text-[var(--accent-blue)] bg-[rgba(37,99,235,0.08)] px-2.5 py-0.5 rounded-full">
                  {st.period}
                </span>
              </div>

              <ul className="text-xs sm:text-sm text-[var(--text-muted)] space-y-1.5 list-disc list-inside mt-3">
                {st.details.map((d, dIdx) => (
                  <li key={dIdx} className="leading-relaxed">{d}</li>
                ))}
              </ul>

              {st.docs.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border-subtle)]">
                  {st.docs.map((doc, docIdx) => (
                    <button
                      key={docIdx}
                      onClick={() => onOpenDoc(st.role, doc.src, doc.caption)}
                      className="inline-flex items-center gap-1.5 text-xs bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(37,99,235,0.1)] border border-[var(--border-subtle)] hover:border-[var(--accent-blue)] text-[var(--text-main)] hover:text-white px-3 py-1.5 rounded transition-colors"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>{doc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
