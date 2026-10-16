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
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-line' : ''}`}>
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-8">
        <a href="#top" className="display text-xl tracking-tight">
          Kamran<span className="text-signal">.</span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-6 text-sm text-paper-dim">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} className="hidden sm:inline hover:text-paper transition-colors">{l}</a>
          ))}
          <a href={CV.href} download={CV.filename} className="ml-2 rounded-full border border-line px-3.5 py-1.5 text-paper hover:border-paper transition-colors">
            CV ↓
          </a>
        </nav>
      </div>
    </header>
  );
}
