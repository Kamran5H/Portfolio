'use client';

import React from 'react';

interface FooterProps {
  onOpenCV: () => void;
}

export default function Footer({ onOpenCV }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] mt-20 pt-16 pb-12 text-xs text-[var(--text-muted)]">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Identity & Scholar Overview */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/kamran.png"
                alt="Muhammad Kamran Ashraf"
                className="w-10 h-10 rounded-full border border-[var(--border-subtle)] object-cover"
              />
              <div>
                <h4 className="font-heading text-sm font-bold text-[var(--text-heading)]">Muhammad Kamran Ashraf (Kami)</h4>
                <p className="text-xs text-[var(--text-muted)] font-mono">MPhil Physical Chemistry Candidate &bull; QAU Islamabad</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-md text-[var(--text-muted)] mt-1">
              Investigating electrocatalytic mechanisms, ORR/OER transition metal doping, and DFT modeling under the supervision of <strong>Prof. Dr. Safeer Ahmed</strong> &amp; <strong>Dr. Zahid Rashid</strong> at Quaid-i-Azam University.
            </p>
            <div className="flex items-center gap-3 mt-1 font-mono text-[11px]">
              <span className="text-[var(--text-heading)]">Reg No: 02062511039</span>
              <span>&bull;</span>
              <span className="text-[var(--text-heading)]">PU Roll: BSAD-Chem-M-66</span>
            </div>
          </div>

          {/* Quick Academic Navigation */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <h5 className="font-heading text-xs font-bold text-[var(--text-heading)] uppercase tracking-wider">Navigation</h5>
            <ul className="space-y-1.5 list-none m-0 p-0">
              <li><a href="#hero" className="hover:text-[var(--text-heading)] transition-colors">Overview &amp; Metrics</a></li>
              <li><a href="#research" className="hover:text-[var(--text-heading)] transition-colors">Working Manuscripts (4)</a></li>
              <li><a href="#trajectory" className="hover:text-[var(--text-heading)] transition-colors">Academic Trajectory (2025–2015)</a></li>
              <li><a href="#credentials" className="hover:text-[var(--text-heading)] transition-colors">Verified Scans &amp; Degrees</a></li>
              <li><a href="#software" className="hover:text-[var(--text-heading)] transition-colors">Computational Software (10)</a></li>
              <li><a href="#chem-tools" className="hover:text-[var(--text-heading)] transition-colors">Laboratory Dilution Calculators</a></li>
              <li><a href="#contact" className="hover:text-[var(--text-heading)] transition-colors">Academic Inquiries &amp; Lab</a></li>
              <li>
                <button
                  onClick={onOpenCV}
                  className="text-[var(--accent-blue)] hover:underline text-left inline-flex items-center gap-1 font-semibold"
                >
                  <span>Curriculum Vitae</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          {/* Connected Infrastructure & Telemetry */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <h5 className="font-heading text-xs font-bold text-[var(--text-heading)] uppercase tracking-wider">Connected Infrastructure</h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                <span>Code Repository:</span>
                <a
                  href="https://github.com/Kamran5H/Portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[var(--accent-blue)] hover:underline"
                >
                  Kamran5H/Portfolio
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                <span>Database:</span>
                <span className="font-mono text-emerald-400">Neon Serverless PostgreSQL</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                <span>Hosting:</span>
                <span className="font-mono text-blue-400">Azure Static Web Apps (East Asia)</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                <span>System Health:</span>
                <a
                  href="/api/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[var(--accent-blue)] hover:underline inline-flex items-center gap-1"
                >
                  <span>/api/health</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </a>
              </div>
              <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                <span>Domain Status:</span>
                <span className="text-[var(--text-muted)]">Ready for Custom CNAME / ALIAS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border-subtle)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div>
            &copy; {currentYear} Muhammad Kamran Ashraf. Department of Chemistry, Quaid-i-Azam University, Islamabad.
          </div>
          <div className="flex items-center gap-4 text-[var(--text-muted)] font-mono">
            <span>Next.js 14 App Router</span>
            <span>&bull;</span>
            <span>Three.js WebGL</span>
            <span>&bull;</span>
            <span>PostgreSQL Pool</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
