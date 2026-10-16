'use client';

import React, { useEffect, useState } from 'react';

export interface DocItem {
  title: string;
  src: string;
  caption: string;
}

interface DocModalProps {
  doc: DocItem | null;
  onClose: () => void;
}

export default function DocModal({ doc, onClose }: DocModalProps) {
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (doc) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setZoom(false);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-green)]" />
            <h3 id="doc-modal-title" className="font-heading text-sm sm:text-base font-bold text-[var(--text-heading)]">
              {doc.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(!zoom)}
              className="text-xs bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--border-subtle)] px-2.5 py-1 rounded text-[var(--text-main)] transition-colors"
              title={zoom ? 'Reset Zoom' : 'Zoom In'}
            >
              {zoom ? 'Fit' : 'Zoom'}
            </button>
            <a
              href={doc.src}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="text-xs bg-[var(--accent-blue)] hover:bg-[#1d4ed8] text-white px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1 font-medium"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download</span>
            </a>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center text-[var(--text-muted)] hover:text-white rounded hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image Preview Body */}
        <div className="flex-1 overflow-auto bg-[#030611] p-4 flex items-center justify-center min-h-[350px]">
          <img
            src={doc.src}
            alt={doc.title}
            className={`max-w-full transition-all duration-200 select-none ${
              zoom ? 'max-h-none cursor-zoom-out scale-125 my-8' : 'max-h-[62vh] object-contain cursor-zoom-in'
            }`}
            onClick={() => setZoom(!zoom)}
          />
        </div>

        {/* Footer / Caption */}
        <div className="px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <p className="text-[var(--text-muted)] font-mono text-[11px] m-0">
            {doc.caption}
          </p>
          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
            Verified Document Scan
          </span>
        </div>
      </div>
    </div>
  );
}
