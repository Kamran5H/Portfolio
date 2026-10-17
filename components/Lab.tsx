"use client";

import { useMemo, useState } from "react";
import {
  REPOS,
  GITHUB,
  VAULT_ITEMS,
  type Category,
  type VaultItem,
} from "@/lib/site";
import VaultModal from "./VaultModal";
const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Research",
  "Browser",
  "Automation",
  "Desktop",
  "AI",
];
export default function Lab() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<VaultItem | null>(null);
  const [modal, setModal] = useState(false);
  const list = useMemo(
    () =>
      REPOS.filter(
        (item) =>
          (category === "All" || item.category === category) &&
          `${item.name} ${item.line} ${item.lang}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );
  const visible =
    expanded || query || category !== "All" ? list : list.slice(0, 6);
  return (
    <section id="lab" className="section-band" aria-labelledby="lab-title">
      <div className="section-shell section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / Software collection</p>
            <h2 id="lab-title" className="display">
              The wider
              <br />
              <em>workbench.</em>
            </h2>
          </div>
          <p>
            Research utilities, browser extensions, desktop applications, and
            experiments. Public repositories include their own setup
            instructions; private work is available for discussion.
          </p>
        </div>
        <div className="collection-controls">
          <div
            className="filter-group"
            role="group"
            aria-label="Filter software by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                aria-pressed={cat === category}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="collection-search">
            <label htmlFor="software-search" className="sr-only">
              Search software by name, description, or language
            </label>
            <input
              id="software-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
            />
          </div>
        </div>
        <p className="collection-count" role="status">
          {list.length} {list.length === 1 ? "project" : "projects"}
          {query && ` matching “${query}”`}
        </p>
        <div className="collection-grid">
          {visible.map((item) => (
            <article key={item.id} className="collection-card">
              <div className="card-topline">
                <span className="eyebrow">{item.category}</span>
                <span className="collection-language">{item.lang}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.line}</p>
              {item.repo ? (
                <a
                  className="text-link"
                  href={item.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.name} on GitHub`}
                >
                  View repository <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <button
                  className="text-link"
                  onClick={() => {
                    setSelected(
                      VAULT_ITEMS.find((v) => v.id === item.id) || null,
                    );
                    setModal(true);
                  }}
                >
                  Discuss private project <span aria-hidden="true">↗</span>
                </button>
              )}
            </article>
          ))}
        </div>
        {list.length === 0 && (
          <div className="empty-state">
            <h3>No matching projects</h3>
            <p>Try another keyword or category.</p>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <div className="collection-footer">
          {category === "All" && !query && list.length > 6 && (
            <button
              className="btn btn-ghost"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? "Show fewer projects −"
                : `Show all ${list.length} projects +`}
            </button>
          )}
          <a
            className="text-link"
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub profile <span aria-hidden="true">↗</span>
          </a>
        </div>
        {modal && (
          <VaultModal
            isOpen={modal}
            onClose={() => setModal(false)}
            selectedItem={selected}
          />
        )}
      </div>
    </section>
  );
}
