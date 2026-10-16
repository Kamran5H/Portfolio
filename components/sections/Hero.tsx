'use client';

import React from 'react';
import MoleculeViewer from './MoleculeViewer';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 min-h-[calc(100vh-120px)] py-10" id="hero">
      <div className="flex flex-col gap-5">
        <div className="inline-flex items-center gap-2 bg-[rgba(37,99,235,0.08)] border border-[rgba(37,99,235,0.25)] text-[#38bdf8] px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wide w-fit">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] shadow-sm animate-pulse" />
          <span>MPhil Physical Chemistry &bull; Quaid-i-Azam University</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-heading)] leading-[1.1]">
          Muhammad<br />
          <span className="bg-gradient-to-r from-slate-100 to-sky-300 bg-clip-text text-transparent">
            Kamran Ashraf
          </span>
        </h1>

        <div className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
          MPhil Candidate in Physical Chemistry at <b className="text-[var(--text-heading)] font-semibold">Quaid-i-Azam University, Islamabad</b>, supervised by <b className="text-[var(--text-heading)] font-semibold">Prof. Dr. Safeer Ahmed</b>.<br className="hidden sm:inline" />
          Specializing in <b className="text-[var(--text-heading)]">computational electrocatalysis</b>, <b className="text-[var(--text-heading)]">Ce-doped NiCo-MOFs for ORR/OER</b>, <b className="text-[var(--text-heading)]">polymeric biosensors</b>, and <b className="text-[var(--text-heading)]">scientific software systems</b>.
        </div>

        {/* Academic Lab Callout */}
        <div className="flex items-center flex-wrap gap-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-[var(--accent-blue)] p-3.5 rounded-md text-xs sm:text-sm text-[var(--text-muted)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" className="shrink-0">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <span>
            Research Supervisor: <b className="text-[var(--text-heading)]">Prof. Dr. Safeer Ahmed</b> (Professor of Physical Chemistry, Department of Chemistry, QAU Islamabad) &bull;{' '}
            <a href="mailto:safeerad@qau.edu.pk" className="text-[var(--accent-blue)] hover:underline font-semibold">safeerad@qau.edu.pk</a>
          </span>
        </div>

        {/* Hero Actions */}
        <div className="flex items-center gap-3.5 flex-wrap pt-1">
          <a
            href="#research"
            className="inline-flex items-center gap-2 bg-[var(--accent-blue)] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold border border-[rgba(255,255,255,0.1)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            <span>Working Manuscripts</span>
          </a>

          <a
            href="#trajectory"
            className="inline-flex items-center gap-2 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-heading)] px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium border border-[var(--border-subtle)] hover:border-[rgba(37,99,235,0.4)] transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Academic Trajectory</span>
          </a>

          <a
            href="https://github.com/Kamran5H"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-heading)] px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium border border-[var(--border-subtle)] hover:border-[rgba(37,99,235,0.4)] transition-all"
            title="Visit GitHub Profile"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub Code</span>
          </a>
        </div>

        {/* Fact Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 mt-2 border-t border-[var(--border-subtle)]">
          <div>
            <div className="font-heading text-2xl font-bold text-[var(--text-heading)]">4<span className="text-[var(--accent-blue)]">th</span></div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Semester MPhil (QAU)</div>
          </div>
          <div>
            <div className="font-heading text-2xl font-bold text-[var(--text-heading)]">3<span className="text-[var(--accent-blue)]">+</span></div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Working Manuscripts</div>
          </div>
          <div>
            <div className="font-heading text-2xl font-bold text-[var(--text-heading)]">25<span className="text-[var(--accent-blue)]">+</span></div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Open-Source Repos</div>
          </div>
          <div>
            <div className="font-heading text-2xl font-bold text-[var(--text-heading)]">100<span className="text-[var(--accent-blue)]">%</span></div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Verified Credentials</div>
          </div>
        </div>
      </div>

      {/* Right Column: 3D Molecular / Lattice Visualizer */}
      <div className="w-full">
        <MoleculeViewer />
      </div>
    </section>
  );
}
