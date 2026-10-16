'use client';

import { FLAGSHIPS, type Flagship } from '@/lib/site';
import { ArticlesVisual, HumanizerVisual, KalamVisual, SubahVisual, VideosVisual } from './visuals';
import StatusBadge from './StatusBadge';

const VISUALS: Record<Flagship['id'], () => JSX.Element> = {
  kalam: KalamVisual,
  subah: SubahVisual,
  articles: ArticlesVisual,
  humanizer: HumanizerVisual,
  videos: VideosVisual,
};

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-8 sm:py-36">
      <div className="reveal mb-16 flex items-end justify-between gap-6 sm:mb-24">
        <h2 className="display text-5xl sm:text-7xl">Selected work</h2>
        <span className="meta hidden text-paper-faint sm:block">01 — 05</span>
      </div>

      <div className="space-y-24 sm:space-y-40">
        {FLAGSHIPS.map((p, i) => {
          const Visual = VISUALS[p.id];
          const flip = i % 2 === 1;
          const featured = i === 0;
          return (
            <article key={p.id} className={`reveal grid items-center gap-8 lg:gap-14 ${featured ? 'lg:grid-cols-[1fr_1.6fr]' : flip ? 'lg:grid-cols-[1.5fr_1fr]' : 'lg:grid-cols-[1fr_1.5fr]'}`}>
              <div className={`${flip ? 'lg:order-2' : ''}`}>
                <div className="meta mb-5 flex items-center gap-3 text-paper-faint">
                  <span>0{i + 1}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="display text-4xl sm:text-6xl">{p.name}</h3>
                <p className="mt-5 max-w-sm text-paper-dim">{p.hook}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-paper-dim">{s}</li>
                  ))}
                </ul>
                <div className="mt-8 flex gap-6 text-sm">
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-arrow text-paper">Live Demo <span>↗</span></a>}
                  {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link-arrow text-paper">GitHub <span>↗</span></a>}
                  {!p.repo && <span className="text-paper-faint">Source private</span>}
                </div>
              </div>
              <div className={`relative rounded-[28px] border border-line bg-ink-2 [transform-style:preserve-3d] ${featured ? 'h-[560px] sm:h-[640px]' : 'h-[420px] sm:h-[480px]'} ${flip ? 'lg:order-1' : ''}`}>
                <Visual />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
