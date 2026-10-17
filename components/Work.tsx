'use client';

import { FLAGSHIPS } from '@/lib/site';
import StatusBadge from './StatusBadge';
import { ArticlesVisual, HumanizerVisual, KalamVisual, SubahVisual, VideosVisual } from './visuals';

const VISUALS: Record<string, () => JSX.Element> = {
  'qau-kalam': KalamVisual,
  'kalam': KalamVisual,
  'subah-taskbook': SubahVisual,
  'subah': SubahVisual,
  'articles-downloader': ArticlesVisual,
  'articles': ArticlesVisual,
  'humanizer-pro': HumanizerVisual,
  'humanizer': HumanizerVisual,
  'quidian-media-downloader': VideosVisual,
  'videos': VideosVisual,
};

export default function Work() {
  return (
    <section id="work" className="content-auto mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-32">
      {/* Section Header */}
      <div className="mb-12 sm:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-line pb-8">
        <div>
          <div className="meta mb-2 text-emerald-bright font-mono text-xs tracking-wider uppercase">
            3D Motion Graphics • 01 — 05
          </div>
          <h2 className="display text-3xl sm:text-6xl text-paper">
            Selected Work
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-base text-paper-dim">
          Interactive real-time 3D motion graphics showcasing live system mechanics, campus networks, and scholarly data pipelines.
        </p>
      </div>

      {/* Flagship Projects Grid / List */}
      <div className="space-y-16 sm:space-y-32">
        {FLAGSHIPS.map((p, i) => {
          const Visual = VISUALS[p.id];
          const flip = i % 2 === 1;
          const indexStr = (i + 1).toString().padStart(2, '0');

          return (
            <article
              key={p.id}
              className={`content-auto rounded-3xl border border-line bg-ink-1/90 p-4 sm:p-8 transition-colors duration-200 hover:border-line-hover grid items-center gap-6 lg:gap-12 ${
                flip ? 'lg:grid-cols-[1fr_1.15fr]' : 'lg:grid-cols-[1.15fr_1fr]'
              }`}
            >
              {/* 3D Motion Graphic Stage Container */}
              <div
                className={`w-full relative rounded-2xl border border-line/60 bg-ink-2/70 [transform-style:preserve-3d] min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center overflow-hidden ${
                  flip ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                {Visual ? <Visual /> : null}
              </div>

              {/* Text & Metadata Container (Guaranteed No Overlap) */}
              <div className={`${flip ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <span className="font-mono text-xs text-paper-faint tracking-widest">{indexStr}</span>
                  <StatusBadge status={p.status} />
                </div>

                <h3 className="display text-2xl sm:text-4xl lg:text-5xl text-paper tracking-tight">
                  {p.name}
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-paper-dim">
                  {p.hook}
                </p>

                {/* Tech Stack Pills */}
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-lg border border-line bg-ink-2/80 px-2.5 py-1 font-mono text-xs text-paper-dim"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                {/* Action Links */}
                <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-medium">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald/15 border border-emerald/30 px-4 py-2 text-emerald-bright transition-all hover:bg-emerald/25 hover:border-emerald-bright"
                    >
                      <span>Live App</span>
                      <span className="text-xs">↗</span>
                    </a>
                  )}

                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-card px-4 py-2 text-paper transition-all hover:border-line-hover hover:text-white"
                    >
                      <span>GitHub</span>
                      <span className="text-xs">↗</span>
                    </a>
                  )}

                  {!p.live && !p.repo && (
                    <span className="font-mono text-xs text-paper-faint">
                      Source & Demo confidential
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
