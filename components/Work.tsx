'use client';

import { useState } from 'react';
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
  const [tab, setTab] = useState<'overview' | 'architecture'>('overview');
  const tiltRef = useTilt<HTMLElement>(4);
  const Visual = VISUALS[project.id];
  const flip = index % 2 === 1;
  const indexStr = (index + 1).toString().padStart(2, '0');

  return (
    <article
      ref={tiltRef}
      className={`card-3d-flip preserve-3d rounded-3xl border border-white/[0.08] bg-ink-1/10 backdrop-blur-sm p-4 sm:p-8 transition-all duration-300 hover:border-emerald-bright/40 grid items-center gap-6 lg:gap-12 shadow-2xl shadow-black/30 ${
        flip ? 'lg:grid-cols-[1fr_1.15fr]' : 'lg:grid-cols-[1.15fr_1fr]'
      }`}
    >
      {/* 3D Motion Graphic Stage Container */}
      <div
        className={`w-full relative rounded-2xl border border-white/[0.06] bg-white/[0.02] [transform-style:preserve-3d] min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center overflow-hidden ${
          flip ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {Visual ? <Visual /> : null}
      </div>

      {/* Text & Metadata Container */}
      <div className={`${flip ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
        {/* Top Badges & Mode Switcher */}
        <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs text-paper-faint tracking-widest">{indexStr}</span>
            <StatusBadge status={project.status} />
          </div>

          {project.deepDive && (
            <div className="inline-flex items-center rounded-full border border-white/[0.1] bg-black/40 p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setTab('overview')}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  tab === 'overview'
                    ? 'bg-emerald/20 text-emerald-bright font-semibold shadow-sm'
                    : 'text-paper-faint hover:text-paper'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setTab('architecture')}
                className={`rounded-full px-2.5 py-1 transition-all flex items-center gap-1 ${
                  tab === 'architecture'
                    ? 'bg-gold/25 text-gold-bright font-semibold shadow-sm'
                    : 'text-paper-faint hover:text-paper'
                }`}
              >
                <span>Architecture</span>
                <span className="text-[10px]">⚡</span>
              </button>
            </div>
          )}
        </div>

        <h3 className="display text-2xl sm:text-4xl lg:text-5xl text-paper tracking-tight">
          {project.name}
        </h3>

        {/* Tab 1: High-Level Overview */}
        {tab === 'overview' && (
          <div className="animate-[fadein_0.25s_cubic-bezier(0.22,1,0.36,1)]">
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-paper-dim">
              {project.hook}
            </p>

            {/* Tech Stack Pills */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-paper-dim"
                >
                  {s}
                </li>
              ))}
            </ul>

            {/* Quick Teaser for Technical Specs */}
            {project.deepDive && (
              <button
                type="button"
                onClick={() => setTab('architecture')}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-gold/90 hover:text-gold transition-colors group"
              >
                <span>Explore Problem &amp; Architecture Specs</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            )}
          </div>
        )}

        {/* Tab 2: Technical Deep Dive & Impact */}
        {tab === 'architecture' && project.deepDive && (
          <div className="mt-4 space-y-3.5 animate-[fadein_0.25s_cubic-bezier(0.22,1,0.36,1)] text-xs sm:text-sm">
            {/* The Problem Scenario */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 sm:p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-red-400 font-semibold mb-1 flex items-center gap-1.5">
                <span>The Problem &amp; Challenge</span>
              </div>
              <p className="text-paper-dim leading-relaxed">
                {project.deepDive.problem}
              </p>
            </div>

            {/* Technical Architecture & Design Choices */}
            <div className="rounded-xl border border-emerald/25 bg-emerald/[0.04] p-3 sm:p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-bright font-semibold mb-1 flex items-center gap-1.5">
                <span>Architecture &amp; Design Choices</span>
              </div>
              <p className="text-paper-dim leading-relaxed">
                {project.deepDive.architecture}
              </p>
            </div>

            {/* Quantified Real-World Impact */}
            <div className="rounded-xl border border-gold/25 bg-gold/[0.04] p-3 sm:p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-gold-bright font-semibold mb-1 flex items-center gap-1.5">
                <span>Quantified Real-World Impact</span>
              </div>
              <p className="text-paper-dim leading-relaxed">
                {project.deepDive.impact}
              </p>
            </div>

            {/* Key Engineering Decisions */}
            <div className="pt-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-paper-faint mb-1.5">
                Engineering Highlights
              </div>
              <ul className="space-y-1.5">
                {project.deepDive.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-paper-dim text-xs">
                    <span className="text-emerald-bright font-bold flex-shrink-0">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5 text-sm font-medium border-t border-line/60 pt-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald/15 border border-emerald/30 px-4 py-2 text-emerald-bright transition-all hover:bg-emerald/25 hover:border-emerald-bright shadow-sm shadow-emerald/20"
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
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-paper transition-all hover:border-line-hover hover:text-white hover:bg-white/[0.08]"
            >
              <span>GitHub</span>
              <span className="text-xs">↗</span>
            </a>
          )}

          {tab === 'architecture' && (
            <button
              type="button"
              onClick={() => setTab('overview')}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-paper-dim hover:text-paper transition-colors ml-auto"
            >
              <span>← Back to Overview</span>
            </button>
          )}

          {!project.live && !project.repo && (
            <span className="font-mono text-xs text-paper-faint">
              Source &amp; Demo confidential
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
      {/* Section Header with Engaging Portfolio Guide */}
      <div className="mb-12 sm:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-line pb-8">
        <div>
          <div className="meta mb-2 text-emerald-bright font-mono text-xs tracking-wider uppercase">
            Flagship Engineering • 01 — 05
          </div>
          <h2 className="display text-3xl sm:text-6xl text-paper">
            Selected Work
          </h2>
        </div>
        
        <div className="max-w-xl space-y-2.5 text-xs sm:text-sm text-paper-dim">
          <p className="leading-relaxed">
            Shipped systems demonstrating end-to-end technical depth—from asynchronous serverless backends to offline-first desktop tools and multi-threaded data pipelines.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[11px] font-mono text-paper-faint">
            <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 border border-white/[0.06]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright" /> FastAPI &amp; Serverless
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 border border-white/[0.06]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" /> Offline-First Desktop
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 border border-white/[0.06]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Multi-Threaded Automation
            </span>
          </div>
        </div>
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
