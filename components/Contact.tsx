'use client';

import { useState } from 'react';
import { EMAIL, SOCIALS } from '@/lib/site';
import CVButton from './CVButton';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${EMAIL}`; }
  };

  return (
    <footer id="contact" className="content-auto border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 pb-10 pt-16 sm:px-8 sm:pt-36">
        <p className="meta reveal text-paper-faint">Have something worth building?</p>
        <button
          onClick={copy}
          aria-label="Copy email address to clipboard"
          className="reveal group mt-4 sm:mt-6 block text-left"
        >
          <span className="display block break-all text-[clamp(1.75rem,6.5vw,6rem)] leading-none transition-colors duration-500 group-hover:text-signal">
            {EMAIL}
          </span>
          <span aria-live="polite" className="meta mt-3 sm:mt-4 block text-paper-dim">
            {copied ? '✓ copied to clipboard' : 'click to copy'}
          </span>
        </button>

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
