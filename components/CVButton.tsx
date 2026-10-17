import { CV } from '@/lib/site';

export default function CVButton({ variant = 'ghost', label = 'Download CV' }: { variant?: 'solid' | 'ghost'; label?: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-ink-2/90 p-0.5 backdrop-blur-md shadow-sm transition-all hover:border-line-hover">
      <a
        href={CV.href}
        download={CV.filename}
        className={`btn py-2 px-3.5 text-xs font-semibold ${
          variant === 'solid' ? 'btn-solid' : 'bg-paper text-ink hover:bg-emerald-bright'
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16" />
        </svg>
        <span>{label}</span>
      </a>
      <a
        href={CV.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Preview CV in browser"
        className="px-3 py-1.5 font-mono text-[11px] text-paper-dim hover:text-emerald-bright transition-colors"
      >
        Preview ↗
      </a>
    </div>
  );
}
