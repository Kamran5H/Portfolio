'use client';

import React, { useState } from 'react';

export default function Software() {
  const [filter, setFilter] = useState<'all' | 'science' | 'automation' | 'extension'>('all');

  const projects = [
    {
      title: 'Subah — Daily Tasker & Life Diary',
      badge: 'Desktop Application',
      category: 'automation',
      desc: 'Daily task manager and focus diary featuring automatic rollover, scheduled calendar workflows, and local storage persistence.',
      tags: ['JavaScript', 'Electron', 'LocalStorage', 'Task Management'],
      repo: 'https://github.com/Kamran5H/Subah-TaskBook',
    },
    {
      title: 'Quidian Media Downloader',
      badge: 'Media Extraction',
      category: 'automation',
      desc: 'Multi-threaded media retrieval pipeline powered by yt-dlp and aria2c supporting 4K streams, playlists, and subtitle parsing.',
      tags: ['Python', 'yt-dlp', 'aria2c', 'Web Dashboard'],
      repo: 'https://github.com/Kamran5H/Quidian-MediaDownloader',
    },
    {
      title: 'ReviewForge — Systematic Review Synthesizer',
      badge: 'Literature Synthesis',
      category: 'science',
      desc: 'Configurable literature synthesis framework querying 9 academic databases to produce structured, reproducible review drafts.',
      tags: ['Python', 'Crossref/PubMed', 'Synthesis Pipeline', 'LLM Orchestration'],
      repo: 'https://github.com/Kamran5H/ReviewForge',
    },
    {
      title: 'ArticlesDownloader',
      badge: 'Academic Retrieval',
      category: 'science',
      desc: 'Automated academic paper retrieval engine querying multiple scholarly APIs with SQLite caching and metadata extraction.',
      tags: ['Python', 'arXiv & OpenAlex', 'SQLite Cache', 'Bulk Fetch'],
      repo: 'https://github.com/Kamran5H/ArticlesDownloader',
    },
    {
      title: 'Disk Optimizer Pro V2',
      badge: 'System Utility',
      category: 'automation',
      desc: 'Dual-drive Windows storage management utility featuring duplicate file detection, deep cache purging, and system telemetry.',
      tags: ['Python', 'Win32 API', 'Tkinter GUI', 'Disk Telemetry'],
      repo: 'https://github.com/Kamran5H/DiskOptimizerPro',
    },
    {
      title: 'Urdu Poetry & Quote Studio',
      badge: 'Typography Suite',
      category: 'automation',
      desc: '4K typography designer supporting authentic Nastaliq calligraphy, layered backdrops, and high-resolution graphical export.',
      tags: ['JavaScript', 'Canvas 2D/3D', 'Nastaliq Calligraphy', 'Image Export'],
      repo: 'https://github.com/Kamran5H/Urdu-Poetry-Studio',
    },
    {
      title: 'Source Genius & Sidepanel Extension',
      badge: 'Chrome Extension',
      category: 'extension',
      desc: 'Chrome Manifest V3 sidepanel extension integrating headless automation to streamline product research and brand verification.',
      tags: ['Chrome MV3', 'Playwright', 'DOM Observers', 'Sidepanel API'],
      repo: 'https://github.com/Kamran5H/SourceGenius',
    },
    {
      title: 'VideoStudio AI',
      badge: 'Cloud GPU Pipeline',
      category: 'automation',
      desc: 'Gradio-based generative video pipeline supporting multimodal storyboarding and cloud GPU execution.',
      tags: ['Python', 'Gradio', 'Cloud GPUs', 'Video Pipeline'],
      repo: 'https://github.com/Kamran5H/VideoStudio',
    },
    {
      title: 'AutoClear & Optimize Pro',
      badge: 'Browser Utility',
      category: 'extension',
      desc: 'Lightweight Chrome Manifest V3 extension for automated cache management, cookie triage, and session performance tuning.',
      tags: ['Chrome Extension', 'Manifest V3', 'Privacy', 'Service Workers'],
      repo: 'https://github.com/Kamran5H/AutoClearExtension',
    },
    {
      title: 'Early Coding & Chemistry ML Archive',
      badge: 'Scientific Archive',
      category: 'science',
      desc: 'Code repository preserving foundational scientific Python scripts, desktop GUI utilities, and empirical boiling point estimators.',
      tags: ['Python', 'Tkinter', 'Cheminformatics', 'Empirical ML'],
      repo: 'https://github.com/Kamran5H/Early-Coding-Archive',
    },
  ];

  const filtered = projects.filter((p) => filter === 'all' || p.category === filter);

  return (
    <section className="py-16" id="software">
      <div className="flex flex-col gap-2 mb-8">
        <span className="font-mono text-xs text-[var(--accent-blue)] uppercase tracking-wider font-semibold">Open Source &amp; Systems</span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">Computational Systems &amp; Software</h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl">
          Scientific retrieval pipelines, automation utilities, browser extensions, and desktop applications maintained on GitHub.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        {[
          { id: 'all', label: 'All Systems (10)' },
          { id: 'science', label: 'Scientific Tools' },
          { id: 'automation', label: 'Automation & Desktop' },
          { id: 'extension', label: 'Browser Extensions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === tab.id
                ? 'bg-[var(--accent-blue)] border-[var(--accent-blue)] text-white'
                : 'bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white hover:border-[rgba(37,99,235,0.4)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj, idx) => (
          <div
            key={idx}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[rgba(37,99,235,0.4)] p-6 rounded-md flex flex-col justify-between transition-all"
          >
            <div>
              <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider bg-[rgba(255,255,255,0.05)] border border-[var(--border-subtle)] text-[var(--text-muted)] px-2 py-0.5 rounded mb-3">
                {proj.badge}
              </span>
              <h3 className="font-heading text-base font-bold text-[var(--text-heading)] mb-2">
                {proj.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                {proj.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono bg-[rgba(255,255,255,0.03)] border border-[var(--border-subtle)] text-[var(--text-faint)] px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <a
                href={proj.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-blue)] hover:underline font-semibold"
              >
                <span>GitHub Repo</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
