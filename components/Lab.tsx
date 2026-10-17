"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  COLLECTION_CATEGORIES,
  readCollection,
  writeCollection,
  filterCollection,
} from "@/lib/collection.mjs";
import {
  REPOS,
  GITHUB,
  VAULT_ITEMS,
  type VaultItem,
  ARTIFACTS,
  type LabItem,
} from "@/lib/site";
import VaultModal from "./VaultModal";
import { ArtifactThumbnail, ArtifactDialog } from "./ProjectArtifact";
const projectIds = REPOS.map((item) => item.id);
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener("collection-change", listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener("collection-change", listener);
  };
}
const snapshot = () => window.location.search;
const serverSnapshot = () => "";
export default function Lab() {
  const heading = useRef<HTMLHeadingElement>(null);
  const search = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const state = useMemo(() => readCollection(search, projectIds), [search]);
  const { category, query, compare } = state;
  const update = (patch: Partial<typeof state>) => {
    const params = writeCollection(window.location.search, {
      ...state,
      ...patch,
    });
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${params ? `?${params}` : ""}${window.location.hash}`,
    );
    window.dispatchEvent(new Event("collection-change"));
    setShareUrl("");
    setFeedback("");
  };
  const [feedback, setFeedback] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<VaultItem | null>(null);
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState<LabItem | null>(null);
  const list = useMemo(() => filterCollection(REPOS, state), [state]);
  const compared = compare.map((id) => REPOS.find((item) => item.id === id)!);
  const toggleCompare = (id: string) => {
    update({
      compare: compare.includes(id)
        ? compare.filter((value) => value !== id)
        : [...compare, id].slice(0, 3),
    });
  };
  const share = async () => {
    const url = new URL(window.location.href);
    url.search = writeCollection("", state);
    url.hash = "lab";
    try {
      await navigator.clipboard.writeText(url.href);
      setFeedback(
        "Collection link copied. It includes your filters and comparison.",
      );
    } catch {
      setShareUrl(url.href);
      setFeedback("Select and copy the collection link below.");
    }
  };
  const visible =
    expanded || query || category !== "All" || state.publicOnly
      ? list
      : list.slice(0, 6);
  return (
    <section id="lab" className="section-band" aria-labelledby="lab-title">
      <div className="section-shell section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / Software collection</p>
            <h2 id="lab-title" className="display" tabIndex={-1} ref={heading}>
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
            {COLLECTION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                aria-pressed={cat === category}
                onClick={() => update({ category: cat })}
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
              onChange={(e) => update({ query: e.target.value })}
              maxLength={200}
              placeholder="Search tools…"
            />
          </div>
        </div>
        <div className="collection-options">
          <label>
            <input
              type="checkbox"
              checked={state.publicOnly}
              onChange={(e) => update({ publicOnly: e.target.checked })}
            />{" "}
            Public repositories only
          </label>
          <label>
            Order{" "}
            <select
              value={state.sort}
              onChange={(e) => update({ sort: e.target.value })}
            >
              <option value="curated">Curated</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
          <button className="text-link" onClick={share}>
            Share this collection ↗
          </button>
          {(query ||
            category !== "All" ||
            state.publicOnly ||
            state.sort !== "curated") && (
            <button
              className="text-link"
              onClick={() =>
                update({
                  query: "",
                  category: "All",
                  publicOnly: false,
                  sort: "curated",
                })
              }
            >
              Reset filters
            </button>
          )}
        </div>
        <p className="caption">
          Select up to three projects to compare their purpose, technology, and
          available workflows.
        </p>
        <p role="status" className="caption">
          {feedback}
        </p>
        {shareUrl && (
          <label className="collection-share">
            Collection link
            <input
              readOnly
              value={shareUrl}
              onFocus={(e) => e.currentTarget.select()}
            />
          </label>
        )}
        {compared.length > 0 && (
          <section
            id="project-comparison"
            className="comparison-panel"
            aria-labelledby="compare-title"
          >
            <div className="comparison-heading">
              <div>
                <p className="eyebrow">
                  Your selection · {compared.length} / 3
                </p>
                <h3 id="compare-title">Project comparison</h3>
              </div>
              <button
                className="text-link"
                onClick={() => {
                  update({ compare: [] });
                  heading.current?.focus();
                }}
              >
                Clear selection
              </button>
            </div>
            <div className="comparison-grid">
              {compared.map((item) => (
                <article key={item.id}>
                  <h4>{item.name}</h4>
                  <dl>
                    <dt>Purpose</dt>
                    <dd>{item.line}</dd>
                    <dt>Technology</dt>
                    <dd>{item.lang}</dd>
                    <dt>Discipline</dt>
                    <dd>{item.category}</dd>
                    <dt>Access</dt>
                    <dd>
                      {item.repo
                        ? "Public repository"
                        : "Private · available for discussion"}
                    </dd>
                  </dl>
                  <button
                    className="text-link"
                    onClick={() => setPreview(item)}
                    aria-label={`Explore ${item.name} workflow`}
                  >
                    Explore workflow ↗
                  </button>
                  <button
                    className="comparison-remove"
                    onClick={() => {
                      toggleCompare(item.id);
                      heading.current?.focus();
                    }}
                    aria-label={`Remove ${item.name} from comparison`}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
        <p className="collection-count" role="status">
          {list.length} {list.length === 1 ? "project" : "projects"}
          {query && ` matching “${query}”`}
          {compare.length > 0 && ` · ${compare.length} selected for comparison`}
        </p>
        <div className="collection-grid">
          {visible.map((item) => (
            <article key={item.id} className="collection-card">
              <ArtifactThumbnail
                projectId={item.id}
                name={item.name}
                onOpen={() => setPreview(item)}
              />
              <div className="card-topline">
                <span className="eyebrow">{item.category}</span>
                <span className="collection-language">{item.lang}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.line}</p>
              <button
                className="compare-button"
                aria-pressed={compare.includes(item.id)}
                disabled={compare.length === 3 && !compare.includes(item.id)}
                onClick={() => toggleCompare(item.id)}
                aria-label={`${compare.includes(item.id) ? "Remove" : "Add"} ${item.name} ${compare.includes(item.id) ? "from" : "to"} comparison`}
              >
                {compare.includes(item.id)
                  ? "Selected for comparison ✓"
                  : compare.length === 3
                    ? "Comparison full (3/3)"
                    : "Compare project +"}
              </button>
              {compare.includes(item.id) && (
                <a className="text-link" href="#project-comparison">
                  View comparison ↑
                </a>
              )}
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
                update({ query: "", category: "All", publicOnly: false });
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <div className="collection-footer">
          {category === "All" &&
            !query &&
            !state.publicOnly &&
            list.length > 6 && (
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
        {preview && (
          <ArtifactDialog
            artifact={ARTIFACTS.find((a) => a.id === preview.id)!}
            name={preview.name}
            href={preview.repo}
            onClose={() => setPreview(null)}
          />
        )}
      </div>
    </section>
  );
}
