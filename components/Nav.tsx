'use client';

import { useEffect, useState } from 'react';
import { CV } from '@/lib/site';

const LINKS = [
  ['Work', '#work'],
  ['Lab', '#lab'],
  ['Research', '#research'],
  ['Contact', '#contact'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const on = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (open) document.body.classList.add('overflow-locked');
    else document.body.classList.remove('overflow-locked');
    return () => document.body.classList.remove('overflow-locked');
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${scrolled || open ? 'bg-ink/20 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20' : ''}`}>
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-8">
          <a href="#top" onClick={() => setOpen(false)} className="display text-xl tracking-tight">
            Kamran<span className="text-signal">.</span>
          </a>
          <nav className="flex items-center gap-1 sm:gap-6 text-sm text-paper-dim">
            {LINKS.map(([l, h]) => (
              <a key={h} href={h} className="hidden sm:inline hover:text-paper transition-colors">{l}</a>
            ))}
            <a href={CV.href} download={CV.filename} className="hidden sm:inline-flex rounded-full border border-line px-3.5 py-1.5 text-paper hover:border-paper transition-colors">
              CV ↓
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-paper hover:bg-ink-2 sm:hidden transition-colors"
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-30 bg-ink/50 backdrop-blur-md sm:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-x-0 top-16 z-40 flex flex-col border-b border-white/10 bg-ink/60 px-6 py-8 shadow-2xl backdrop-blur-xl sm:hidden animate-[fadein_0.3s_cubic-bezier(0.22,1,0.36,1)_both]"
          >
          <div className="flex flex-col space-y-5 text-lg font-medium text-paper">
            {LINKS.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line/50 pb-3 hover:text-signal transition-colors"
              >
                <span>{l}</span>
                <span className="text-paper-faint font-mono text-xs">↗</span>
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={CV.href}
              download={CV.filename}
              onClick={() => setOpen(false)}
              className="btn btn-solid justify-center text-sm"
            >
              Download Official CV (PDF)
            </a>
            <p className="meta mt-2 text-center text-[10px] text-paper-faint">
              QAU Islamabad · MPhil Physical Chemistry
            </p>
          </div>
        </div>
        </>
      )}
    </>
  );
}
