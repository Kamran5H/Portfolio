import { CV } from '@/lib/site';

export default function CVButton({ variant = 'ghost', label = 'Download Official CV' }: { variant?: 'solid' | 'ghost'; label?: string }) {
  return (
    <span className="group relative inline-flex">
      <a href={CV.href} download={CV.filename} className={`btn ${variant === 'solid' ? 'btn-solid' : 'btn-ghost'}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16" />
        </svg>
        {label}
      </a>
      <span className="meta pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-ink-2 px-3 py-1.5 text-paper-dim opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0.5 group-hover:opacity-100 z-10">
        Official CV · PDF ·{' '}
        <a href={CV.href} target="_blank" rel="noopener" className="pointer-events-auto text-paper hover:text-signal">preview ↗</a>
      </span>
    </span>
  );
}
