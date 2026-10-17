'use client';

import { FLAGSHIPS, type Project } from '@/lib/site';
import { useTilt } from '@/lib/hooks';
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

function FlagshipCard({ project, index }: { project: Project; index: number }) {
  const tiltRef = useTilt<HTMLElement>(4);
  const Visual = VISUALS[project.id];
  const flip = index % 2 === 1;
  const indexStr = (index + 1).toString().padStart(2, '0');

  return (
    <article
      ref={tiltRef}
      className={`card-3d-flip preserve-3d rounded-3xl border border-white/10 bg-ink-1/30 backdrop-blur-md p-4 sm:p-8 transition-all duration-300 hover:border-emerald-bright/40 grid items-center gap-6 lg:gap-12 shadow-2xl shadow-black/40 ${
        flip ? 'lg:grid-cols-[1fr_1.15fr]' : 'lg:grid-cols-[1.15fr_1fr]'
      }`}
    >
      {/* 3D Motion Graphic Stage Container */}
      <div
        className={`w-full relative rounded-2xl border border-white/10 bg-ink-2/25 backdrop-blur-sm [transform-style:preserve-3d] min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center overflow-hidden ${
          flip ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {Visual ? <Visual /> : null}
      </div>

      {/* Text & Metadata Container */}
      <div className={`${flip ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <span className="font-mono text-xs text-paper-faint tracking-widest">{indexStr}</span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="display text-2xl sm:text-4xl lg:text-5xl text-paper tracking-tight">
          {project.name}
        </h3>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-paper-dim">
          {project.hook}
        </p>

        {/* Tech Stack Pills */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-lg border border-white/10 bg-ink-2/40 px-2.5 py-1 font-mono text-xs text-paper-dim"
            >
              {s}
            </li>
          ))}
        </ul>

        {/* Action Links */}
        <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-medium">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald/15 border border-emerald/30 px-4 py-2 text-emerald-bright transition-all hover:bg-emerald/25 hover:border-emerald-bright"
            >
              <span>Live App</span>
              <span className="text-xs">↗</span>
            </a>
          )}

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-ink-card/40 px-4 py-2 text-paper transition-all hover:border-line-hover hover:text-white hover:bg-ink-card/60"
            >
              <span>GitHub</span>
              <span className="text-xs">↗</span>
            </a>
          )}

          {!project.live && !project.repo && (
            <span className="font-mono text-xs text-paper-faint">
              Source & Demo confidential
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-32">
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

      {/* Flagship Projects Grid / List with 3D Flip & Tilt */}
      <div className="space-y-16 sm:space-y-32">
        {FLAGSHIPS.map((p, i) => (
          <FlagshipCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
