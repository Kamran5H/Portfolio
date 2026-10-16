'use client';

import React from 'react';

interface CredentialsProps {
  onOpenDoc: (title: string, src: string, caption: string) => void;
}

export default function Credentials({ onOpenDoc }: CredentialsProps) {
  const credentials = [
    {
      title: 'QAU M.Phil Student Identity',
      issuer: 'Quaid-i-Azam University &bull; Valid to 2027',
      thumb: '/assets/images/docs/student_card_qau.jpeg',
      caption: 'Registration No: 02062511039 &bull; Department of Chemistry, QAU Islamabad.',
    },
    {
      title: 'Bachelor of Science in Chemistry',
      issuer: 'University of the Punjab, Lahore',
      thumb: '/assets/images/docs/bs_degree_pu.jpg',
      caption: 'Degree Conferred by University of the Punjab, Lahore &bull; Session 2020–2024.',
    },
    {
      title: 'Detailed Marks Sheet / Transcript',
      issuer: 'School of Chemistry, PU Lahore',
      thumb: '/assets/images/docs/transcript_pu.jpg',
      caption: 'Official Detailed Transcript of Marks, School of Chemistry, PU Lahore.',
    },
    {
      title: 'F.Sc Pre-Medical (Grade A+)',
      issuer: 'BISE Sahiwal &bull; Marks 960/1100',
      thumb: '/assets/images/docs/fsc_premed.jpg',
      caption: 'Provisional Result Intimation, Grade A+ (960/1100), BISE Sahiwal.',
    },
    {
      title: 'Chemistry Lecturer Experience',
      issuer: 'Unique High School & Science Academy',
      thumb: '/assets/images/docs/experience_unique.jpg',
      caption: 'Official Teaching Experience Certificate, Unique High School Johar View Lahore.',
    },
    {
      title: 'Science Teacher Experience',
      issuer: 'The Educators (Beaconhouse System)',
      thumb: '/assets/images/docs/experience_educators.jpg',
      caption: 'Dedicated Science Teacher Experience Certificate, The Educators Noor Campus Okara.',
    },
    {
      title: 'National Naat Competition Award',
      issuer: 'Green International University, Lahore',
      thumb: '/assets/images/docs/naat_competition_green_uni.jpg',
      caption: 'Certificate of Appreciation for outstanding participation, Green International University Lahore.',
    },
    {
      title: 'Matriculation in Science (Grade A+)',
      issuer: 'BISE Sahiwal &bull; Marks 917/1100',
      thumb: '/assets/images/docs/matric_science.jpg',
      caption: 'BISE Sahiwal Result Intimation, Grade A+ (917/1100), Govt High School 32/2L Okara.',
    },
  ];

  return (
    <section className="py-16" id="credentials">
      <div className="flex flex-col gap-2 mb-10">
        <span className="font-mono text-xs text-[var(--accent-blue)] uppercase tracking-wider font-semibold">Official Records</span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">Verified Degrees &amp; Certificates</h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl">
          Click any document card to inspect high-resolution scans of official degrees, transcripts, experience certificates, and awards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {credentials.map((c, i) => (
          <div
            key={i}
            onClick={() => onOpenDoc(c.title, c.thumb, c.caption)}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[rgba(37,99,235,0.4)] rounded-md overflow-hidden cursor-pointer group transition-all"
          >
            <div className="relative w-full h-48 bg-[#030611] overflow-hidden">
              <img
                src={c.thumb}
                alt={c.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white font-medium text-xs transition-opacity duration-150">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Inspect Document</span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-1">
              <h4 className="font-heading text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--accent-blue)] transition-colors">
                {c.title}
              </h4>
              <span className="text-[11px] text-[var(--text-muted)]" dangerouslySetInnerHTML={{ __html: c.issuer }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
