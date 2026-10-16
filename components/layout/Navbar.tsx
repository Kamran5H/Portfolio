'use client';

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenCV: () => void;
}

export default function Navbar({ onOpenCV }: NavbarProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kamran_theme') as 'dark' | 'light' | null;
    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('kamran_theme', next);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[70px] bg-[var(--bg-glass)] border-b border-[var(--border-subtle)] z-50 flex items-center transition-all duration-150">
        <div className="w-full max-w-[1320px] mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3.5 no-underline text-[var(--text-heading)] group">
            <img
              src="/assets/images/kamran.png"
              alt="Muhammad Kamran Ashraf Portrait"
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] object-cover group-hover:border-[var(--accent-blue)] transition-colors duration-150"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight text-[var(--text-heading)]">M. Kamran Ashraf</span>
              <span className="text-xs text-[var(--text-muted)] font-mono">Physical Chemist &bull; QAU</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="hidden md:block">
            <ul className="flex items-center gap-7 list-none m-0 p-0">
              <li><a href="#hero" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] text-sm font-medium transition-colors">Overview</a></li>
              <li><a href="#research" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] text-sm font-medium transition-colors">Research</a></li>
              <li><a href="#trajectory" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] text-sm font-medium transition-colors">Timeline</a></li>
              <li><a href="#credentials" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] text-sm font-medium transition-colors">Credentials</a></li>
              <li><a href="#software" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] text-sm font-medium transition-colors">Software</a></li>
              <li><a href="#chem-tools" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] text-sm font-medium transition-colors">Lab Tools</a></li>
              <li><a href="#contact" className="text-[var(--text-muted)] hover:text-[var(--text-heading)] text-sm font-medium transition-colors">Contact</a></li>
            </ul>
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-md bg-[rgba(255,255,255,0.04)] border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] flex items-center justify-center transition-colors"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              onClick={onOpenCV}
              className="hidden sm:inline-flex items-center gap-2 bg-[var(--accent-blue)] hover:bg-[#1d4ed8] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide border border-[rgba(255,255,255,0.1)] shadow-sm transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>Curriculum Vitae</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-[var(--text-main)] border border-[var(--border-subtle)] rounded-md"
              aria-label="Open Mobile Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-[70px] left-0 right-0 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] p-6 z-40 flex flex-col gap-4 md:hidden">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-main)] text-sm font-medium">Overview</a>
          <a href="#research" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-main)] text-sm font-medium">Working Research</a>
          <a href="#trajectory" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-main)] text-sm font-medium">Academic Timeline</a>
          <a href="#credentials" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-main)] text-sm font-medium">Verified Credentials</a>
          <a href="#software" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-main)] text-sm font-medium">Computational Software</a>
          <a href="#chem-tools" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-main)] text-sm font-medium">Laboratory Calculators</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-main)] text-sm font-medium">Contact & Supervision</a>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCV(); }}
            className="w-full text-center bg-[var(--accent-blue)] text-white py-2 rounded-md text-xs font-semibold mt-2"
          >
            View Curriculum Vitae
          </button>
        </div>
      )}
    </>
  );
}
