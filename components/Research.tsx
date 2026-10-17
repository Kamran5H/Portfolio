"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import research from "@/content/research.json";
import { SITE, VAULT_ITEMS, type VaultItem } from "@/lib/site";
import VaultModal from "./VaultModal";
import CVButton from "./CVButton";

const Framework3D = dynamic(() => import("./Framework3D"), {
  ssr: false,
  loading: () => <p className="model-loading">Loading schematic…</p>,
});

export default function Research() {
  const [selected, setSelected] = useState<VaultItem | null>(null);
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState(false);
  const request = (id: string) => {
    setSelected(VAULT_ITEMS.find((v) => v.id === id) || null);
    setOpen(true);
  };
  return (
    <section
      id="research"
      className="section-shell section-space"
      aria-labelledby="research-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Scientific work</p>
          <h2 id="research-title" className="display">
            Understanding materials.
            <br />
            <em>Connecting structure to function.</em>
          </h2>
        </div>
        <p>
          Physical and computational chemistry at Quaid-i-Azam University, with
          a focus on electrocatalysis, electronic structure, and energy
          materials.
        </p>
      </div>
      <div className="research-grid">
        {research.map((item, i) => (
          <article
            key={item.id}
            className={`research-card ${i === 0 ? "research-lead" : ""}`}
          >
            <div className="card-topline">
              <span className="eyebrow">{item.category}</span>
              <span className="text-tag">{item.status}</span>
            </div>
            <h3 className="display">{item.title}</h3>
            <p>{item.summary}</p>
            <ul className="tag-list" aria-label="Research methods">
              {item.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
            <button
              className="text-link"
              onClick={() => request(item.vaultTargetId)}
            >
              Discuss this work <span aria-hidden="true">↗</span>
            </button>
          </article>
        ))}
      </div>
      <details
        className="model-disclosure"
        onToggle={(e) => setModel(e.currentTarget.open)}
      >
        <summary>
          <span>Explore the metal–organic framework schematic</span>
          <span className="eyebrow">3D illustration +</span>
        </summary>
        <div className="model-stage">{model && <Framework3D />}</div>
        <p className="caption">
          Conceptual Ce-doped NiCo-MOF illustration: Ni (green), Co (orange), Ce
          (gold), with organic linkers. The geometry is illustrative; it is not
          a refined crystal structure or a simulation result.
        </p>
      </details>
      <div id="background" className="background-block">
        <div>
          <p className="eyebrow">Academic &amp; teaching background</p>
          <h3 className="display">
            A foundation in chemistry.
            <br />
            <em>A practice of sharing it.</em>
          </h3>
          <p>
            Research builds on undergraduate materials projects and classroom
            experience teaching chemistry and science.
          </p>
          <CVButton />
        </div>
        <ol className="timeline">
          {SITE.path.map((item) => (
            <li key={item.title}>
              <span className="timeline-years">{item.years}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.where}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="document-callout">
        <div>
          <p className="eyebrow">Supporting documents</p>
          <h3>Academic records &amp; research enquiries</h3>
          <p>
            Transcripts, degree records, teaching letters, and further research
            details can be requested for admissions, employment, or
            collaboration. Requests are reviewed individually.
          </p>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => request("cv-extended")}
        >
          Request documents <span aria-hidden="true">↗</span>
        </button>
      </div>
      {open && (
        <VaultModal
          isOpen={open}
          onClose={() => setOpen(false)}
          selectedItem={selected}
        />
      )}
    </section>
  );
}
