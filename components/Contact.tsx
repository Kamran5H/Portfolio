'use client';

import { useState } from 'react';
import { EMAIL, GITHUB, LINKEDIN, ORCID } from '@/lib/site';
import CVButton from './CVButton';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${EMAIL}`; }
  };

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 pb-10 pt-24 sm:px-8 sm:pt-36">
        <p className="meta reveal text-paper-faint">Have something worth building?</p>
        <button onClick={copy} className="reveal group mt-6 block text-left">
          <span className="display block break-all text-[clamp(2rem,6.5vw,6rem)] leading-none transition-colors duration-500 group-hover:text-signal">
            {EMAIL}
          </span>
          <span className="meta mt-4 block text-paper-dim">{copied ? '✓ copied to clipboard' : 'click to copy'}</span>
        </button>

        <div className="mt-16 flex flex-wrap items-center gap-3">
          <CVButton variant="solid" />
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">Write an email</a>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-line pt-8 text-sm text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Muhammad Kamran Ashraf · Islamabad</span>
          <div className="flex gap-6">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="link-arrow hover:text-paper">GitHub <span>↗</span></a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="link-arrow hover:text-paper">LinkedIn <span>↗</span></a>
            <a href={ORCID} target="_blank" rel="noopener noreferrer" className="link-arrow hover:text-paper">ORCID <span>↗</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
