'use client';

import { useState } from 'react';
import { REPOS, GITHUB, VAULT_ITEMS, type Category, type LabItem, type VaultItem } from '@/lib/site';
import { useTilt } from '@/lib/hooks';
import StatusBadge from './StatusBadge';
import VaultModal from './VaultModal';

const CATS: ('All' | Category)[] = ['All', 'Research', 'Browser', 'Automation', 'Desktop', 'AI'];

function Glyph({ cat }: { cat: Category }) {
  const s = 'stroke-paper-dim group-hover:stroke-emerald-bright transition-colors duration-500';
  const spin = 'origin-center transition-transform duration-700 ease-out group-hover:rotate-[20deg]';

  switch (cat) {
    case 'Research':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          <g className={spin} style={{ transformBox: 'fill-box' }}>
            <polygon className={s} points="40,14 62,27 62,53 40,66 18,53 18,27" />
            <polygon className={s} points="40,26 51,32 51,46 40,52 29,46 29,32" opacity={0.5} />
          </g>
          {[[40, 14], [62, 53], [18, 53]].map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="3"
              className="fill-paper group-hover:fill-emerald-bright transition-colors duration-500"
            />
          ))}
        </svg>
      );
    case 'Browser':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          <rect className={s} x="12" y="18" width="56" height="44" rx="5" />
          <line className={s} x1="12" y1="28" x2="68" y2="28" />
          <rect
            x="48"
            y="32"
            width="16"
            height="26"
            rx="2"
            className="fill-paper/10 transition-all duration-500 group-hover:fill-emerald/40 group-hover:translate-x-[-4px]"
          />
          {[17, 22, 27].map((x) => (
            <circle key={x} cx={x} cy="23" r="1.5" className="fill-paper-dim" />
          ))}
        </svg>
      );
    case 'Automation':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect className={s} x="10 + i * 22" y="32" width="16" height="16" rx="3" />
              {i < 2 && <path className={s} d={`M${26 + i * 22} 40 h6`} strokeDasharray="2 2" />}
            </g>
          ))}
          <circle
            cx="18"
            cy="40"
            r="2.5"
            className="fill-emerald-bright transition-transform duration-1000 ease-out group-hover:translate-x-[44px]"
          />
        </svg>
      );
    case 'Desktop':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          <circle className={s} cx="40" cy="40" r="24" />
          <circle className={s} cx="40" cy="40" r="6" />
          <path
            d="M40 16 A24 24 0 0 1 60 50"
            className="stroke-emerald-bright"
            strokeWidth="2.5"
          />
          <g className={spin} style={{ transformBox: 'fill-box', transformOrigin: '40px 40px' }}>
            <line className={s} x1="40" y1="40" x2="58" y2="28" />
          </g>
        </svg>
      );
    case 'AI':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" fill="none" strokeWidth="1.2">
          {[[20, 24], [20, 56], [60, 20], [60, 40], [60, 60]].map(([x, y], i) =>
            i % 2 === 0
              ? <line key={i} className={s} x1={40} y1={40} x2={x} y2={y} />
              : null
          )}
          {[[20, 24], [20, 56], [40, 40], [60, 20], [60, 40], [60, 60]].map(([x, y], i) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={i === 2 ? 5 : 3}
              className={`${i === 2 ? 'fill-gold' : 'fill-paper'} transition-transform duration-500 group-hover:scale-125`}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}
        </svg>
      );
    default:
      return null;
  }
}

function LabCard({
  item,
  onOpenVault,
}: {
  item: LabItem;
  onOpenVault: (item: LabItem) => void;
}) {
  const tiltRef = useTilt<HTMLDivElement>(5);

  return (
    <div
      ref={tiltRef}
      className="card-3d-flip preserve-3d group relative flex flex-col justify-between rounded-2xl border border-line bg-ink-1/85 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:border-emerald-bright/40 hover:bg-ink-card shadow-xl shadow-black/30"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="h-12 w-12 shrink-0">
            <Glyph cat={item.category} />
          </div>
          <div>
            {item.locked ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[10px] text-gold">
                <span>🔒</span>
                <span>Locked</span>
              </span>
            ) : item.repo ? (
              <a
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-paper-faint transition-colors group-hover:text-emerald-bright"
              >
                Code ↗
              </a>
            ) : (
              <span className="font-mono text-[10px] text-paper-faint">Private</span>
            )}
          </div>
        </div>

        <h3 className="font-medium text-paper text-lg group-hover:text-emerald-bright transition-colors">
          {item.name}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-paper-dim leading-relaxed">
          {item.line}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-line/60">
        <StatusBadge status={item.status} />

        {item.locked ? (
          <button
            onClick={() => onOpenVault(item)}
            className="font-mono text-[11px] text-gold hover:underline"
          >
            Request IP Access
          </button>
        ) : (
          <span className="font-mono text-[11px] text-paper-faint">{item.lang}</span>
        )}
      </div>
    </div>
  );
}

export default function Lab() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVaultItem, setSelectedVaultItem] = useState<VaultItem | null>(null);
  const list = REPOS.filter((r) => cat === 'All' || r.category === cat);

  const openVaultForLab = (item: LabItem) => {
    const found = VAULT_ITEMS.find((v) => v.id === item.id);
    setSelectedVaultItem(found || null);
    setModalOpen(true);
  };

  return (
    <section id="lab" className="content-auto border-t border-line py-16 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-8">
          <div>
            <div className="meta mb-2 text-emerald-bright font-mono text-xs tracking-wider uppercase">
              Micro-Tools & Experiments
            </div>
            <h2 className="display text-3xl sm:text-6xl text-paper">The Lab</h2>
          </div>

          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="Repository Categories"
            className="-mx-4 px-4 sm:mx-0 sm:px-0 flex overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap gap-2 touch-pan-x"
          >
            {CATS.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
                  cat === c
                    ? 'bg-emerald text-ink shadow-md shadow-emerald/20 font-semibold'
                    : 'bg-ink-card border border-line text-paper-dim hover:text-paper hover:border-line-hover'
                }`}
              >
                {c}
                <sup className="ml-1 font-mono text-[9px] opacity-80">
                  {c === 'All' ? REPOS.length : REPOS.filter((r) => r.category === c).length}
                </sup>
              </button>
            ))}
          </div>
        </div>

        {/* Repos Grid with 3D Scroll Flips & Mouse Tilt */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r: LabItem) => (
            <LabCard key={r.id} item={r} onOpenVault={openVaultForLab} />
          ))}
        </div>

        {/* GitHub link */}
        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-paper-dim hover:text-emerald-bright transition-colors"
          >
            <span>Explore all open repositories on GitHub</span>
            <span>↗</span>
          </a>
          <span className="font-mono text-xs text-paper-faint">
            {REPOS.length} documented tools
          </span>
        </div>
      </div>

      <VaultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedItem={selectedVaultItem}
      />
    </section>
  );
}
