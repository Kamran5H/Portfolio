'use client';

import { useState } from 'react';
import { EMAIL, SOCIALS } from '@/lib/site';
import { useTilt } from '@/lib/hooks';
import CVButton from './CVButton';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const cardTiltRef = useTilt<HTMLDivElement>(3);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${EMAIL}`; }
  };

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 pb-10 pt-16 sm:px-8 sm:pt-36">
        <p className="meta reveal text-paper-faint tracking-wider uppercase">Have something worth building?</p>
        
        <div
          ref={cardTiltRef}
          className="card-3d-flip preserve-3d mt-6 rounded-3xl border border-white/[0.08] bg-ink-1/10 backdrop-blur-sm p-6 sm:p-10 transition-all duration-300 hover:border-emerald-bright/40 shadow-2xl shadow-black/30"
        >
          <button
            onClick={copy}
            aria-label="Copy email address to clipboard"
            className="group block text-left w-full"
          >
            <span className="display block break-all text-[clamp(1.75rem,6.2vw,5.5rem)] leading-none transition-colors duration-500 group-hover:text-emerald-bright">
              {EMAIL}
            </span>
            <span aria-live="polite" className="meta mt-3 sm:mt-5 block text-paper-dim">
              {copied ? '✓ copied to clipboard' : 'click to copy'}
            </span>
          </button>
        </div>

        <div className="mt-10 sm:mt-16 flex flex-wrap items-center gap-3">
          <CVButton variant="solid" />
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">Write an email</a>
        </div>

        <div className="mt-14 sm:mt-24 flex flex-col gap-6 border-t border-line pt-8 text-sm text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Muhammad Kamran Ashraf · Islamabad</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="link-arrow hover:text-paper">{label} <span>↗</span></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
