'use client';

import React, { useState } from 'react';

interface LabCalculatorsProps {
  onShowToast: (msg: string) => void;
}

export default function LabCalculators({ onShowToast }: LabCalculatorsProps) {
  // Calculator 1: Solution Preparation
  const [reagent, setReagent] = useState('cao');
  const [mw, setMw] = useState<number>(56.077);
  const [molarity, setMolarity] = useState<number>(0.05);
  const [volume, setVolume] = useState<number>(250);

  // Calculator 2: Stock Dilution
  const [m1, setM1] = useState<number>(1.0);
  const [m2, setM2] = useState<number>(0.05);
  const [v2, setV2] = useState<number>(100);

  const reagentsData: Record<string, { name: string; mw: number }> = {
    cao: { name: 'Calcium Oxide (CaO)', mw: 56.077 },
    caco3: { name: 'Calcium Carbonate (CaCO₃)', mw: 100.0869 },
    urea: { name: 'Urea [CO(NH₂)₂]', mw: 60.055 },
    aniline: { name: 'Aniline (C₆H₅NH₂)', mw: 93.126 },
    aps: { name: 'Ammonium Persulfate (APS)', mw: 228.20 },
    eaa: { name: 'Ethyl Acetoacetate (EAA)', mw: 130.14 },
    chitosan: { name: 'Chitosan Monomer Unit', mw: 161.16 },
    fe3o4: { name: 'Magnetite (Fe₃O₄)', mw: 231.533 },
    ni_no3: { name: 'Nickel(II) Nitrate Hexahydrate', mw: 290.79 },
    co_no3: { name: 'Cobalt(II) Nitrate Hexahydrate', mw: 291.03 },
    ce_no3: { name: 'Cerium(III) Nitrate Hexahydrate', mw: 434.22 },
    h2bdc: { name: 'Terephthalic Acid (H₂BDC)', mw: 166.13 },
    zn_acetate: { name: 'Zinc Acetate Dihydrate', mw: 219.51 },
    naoh: { name: 'Sodium Hydroxide (NaOH)', mw: 39.997 },
    koh: { name: 'Potassium Hydroxide (KOH)', mw: 56.1056 },
    hcl: { name: 'Hydrochloric Acid (HCl)', mw: 36.46 },
    h2so4: { name: 'Sulfuric Acid (H₂SO₄)', mw: 98.079 },
    kmno4: { name: 'Potassium Permanganate (KMnO₄)', mw: 158.034 },
    nacl: { name: 'Sodium Chloride (NaCl)', mw: 58.44 },
  };

  const handleReagentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setReagent(key);
    if (reagentsData[key]) {
      setMw(reagentsData[key].mw);
    }
  };

  const calcMass = () => {
    // m = M * MW * (V / 1000)
    const mass = molarity * mw * (volume / 1000);
    return isNaN(mass) || mass <= 0 ? '0.0000' : mass.toFixed(4);
  };

  const calcV1 = () => {
    // V1 = (M2 * V2) / M1
    if (m1 <= 0) return 0;
    const v1 = (m2 * v2) / m1;
    return isNaN(v1) || v1 <= 0 ? 0 : v1;
  };

  const copySolutionRecipe = () => {
    const reagentName = reagentsData[reagent]?.name || 'Reagent';
    const text = `Solution Preparation Recipe:\n- Reagent: ${reagentName} (MW: ${mw} g/mol)\n- Target: ${volume} mL of ${molarity} M\n- Procedure: Accurately weigh ${calcMass()} g of solute, dissolve in ~${Math.round(volume * 0.7)} mL solvent in a volumetric flask, then dilute with deionized water to exactly ${volume} mL mark.`;
    navigator.clipboard.writeText(text);
    onShowToast('📋 Lab Recipe copied to clipboard!');
  };

  const copyDilutionRecipe = () => {
    const v1Val = calcV1().toFixed(2);
    const solventVol = (v2 - parseFloat(v1Val)).toFixed(2);
    const text = `Stock Dilution Protocol:\n- Stock Concentration (M1): ${m1} M\n- Target (M2): ${m2} M in ${v2} mL\n- Procedure: Pipette exactly ${v1Val} mL of ${m1} M stock solution into a ${v2} mL volumetric flask, add ${solventVol} mL solvent, and mix thoroughly.`;
    navigator.clipboard.writeText(text);
    onShowToast('📋 Dilution Protocol copied to clipboard!');
  };

  const v1 = calcV1();

  return (
    <section className="py-16" id="chem-tools">
      <div className="flex flex-col gap-2 mb-10">
        <span className="font-mono text-xs text-[var(--accent-blue)] uppercase tracking-wider font-semibold">Bench Utilities</span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-heading)]">Physical Chemistry Lab Calculators</h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl">
          Interactive computational tools for solution preparation, molar mass quantification, and volumetric dilutions used in experimental laboratory synthesis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-8 rounded-md">
        {/* Box 1: Solution Prep */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-heading font-bold text-base text-[var(--text-heading)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2">
              <path d="M10 2v7.31L4.69 18.66A2 2 0 0 0 6.4 22h11.2a2 2 0 0 0 1.71-3.34L14 9.31V2" />
            </svg>
            <span>Solution Preparation Calculator (m = M &times; MW &times; V)</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[var(--text-muted)] font-medium">Select Research Reagent:</label>
            <select
              value={reagent}
              onChange={handleReagentChange}
              className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-heading)] px-3 py-2 rounded text-xs focus:outline-none focus:border-[var(--accent-blue)]"
            >
              <optgroup label="QAU & PU Research Reagents">
                <option value="cao">Calcium Oxide (CaO) — 56.08 g/mol</option>
                <option value="caco3">Calcium Carbonate (CaCO₃) — 100.09 g/mol</option>
                <option value="urea">Urea [CO(NH₂)₂] — 60.06 g/mol</option>
                <option value="aniline">Aniline (C₆H₅NH₂) — 93.13 g/mol</option>
                <option value="aps">Ammonium Persulfate (APS) — 228.20 g/mol</option>
                <option value="eaa">Ethyl Acetoacetate (EAA) — 130.14 g/mol</option>
                <option value="chitosan">Chitosan Monomer — 161.16 g/mol</option>
                <option value="fe3o4">Magnetite (Fe₃O₄) — 231.53 g/mol</option>
                <option value="ni_no3">Nickel(II) Nitrate Hexahydrate — 290.79 g/mol</option>
                <option value="co_no3">Cobalt(II) Nitrate Hexahydrate — 291.03 g/mol</option>
                <option value="ce_no3">Cerium(III) Nitrate Hexahydrate — 434.22 g/mol</option>
                <option value="h2bdc">Terephthalic Acid (H₂BDC) — 166.13 g/mol</option>
                <option value="zn_acetate">Zinc Acetate Dihydrate — 219.51 g/mol</option>
              </optgroup>
              <optgroup label="Common Lab Reagents">
                <option value="naoh">Sodium Hydroxide (NaOH) — 40.00 g/mol</option>
                <option value="koh">Potassium Hydroxide (KOH) — 56.11 g/mol</option>
                <option value="hcl">Hydrochloric Acid (HCl) — 36.46 g/mol</option>
                <option value="h2so4">Sulfuric Acid (H₂SO₄) — 98.08 g/mol</option>
                <option value="kmno4">Potassium Permanganate (KMnO₄) — 158.03 g/mol</option>
                <option value="nacl">Sodium Chloride (NaCl) — 58.44 g/mol</option>
              </optgroup>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[var(--text-muted)] font-medium">Molecular Weight (g/mol):</label>
            <input
              type="number"
              step="any"
              value={mw}
              onChange={(e) => setMw(parseFloat(e.target.value) || 0)}
              className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-heading)] px-3 py-2 rounded text-xs focus:outline-none focus:border-[var(--accent-blue)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[var(--text-muted)] font-medium">Desired Molarity (M):</label>
              <input
                type="number"
                step="any"
                value={molarity}
                onChange={(e) => setMolarity(parseFloat(e.target.value) || 0)}
                className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-heading)] px-3 py-2 rounded text-xs focus:outline-none focus:border-[var(--accent-blue)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[var(--text-muted)] font-medium">Volume (mL):</label>
              <input
                type="number"
                step="any"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
                className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-heading)] px-3 py-2 rounded text-xs focus:outline-none focus:border-[var(--accent-blue)]"
              />
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 rounded mt-auto flex flex-col justify-between gap-3">
            <div>
              <span className="text-[11px] text-[var(--text-muted)] block">Required Solute Mass:</span>
              <span className="font-heading text-2xl font-bold text-[var(--accent-blue)]">
                {calcMass()} <span className="text-xs font-mono text-[var(--text-muted)]">grams</span>
              </span>
            </div>
            <button
              onClick={copySolutionRecipe}
              className="self-start inline-flex items-center gap-1.5 text-xs bg-[rgba(37,99,235,0.1)] hover:bg-[var(--accent-blue)] text-[#38bdf8] hover:text-white border border-[rgba(37,99,235,0.3)] px-3 py-1.5 rounded transition-colors font-mono"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy Lab Recipe</span>
            </button>
          </div>
        </div>

        {/* Box 2: Stock Dilution */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-heading font-bold text-base text-[var(--text-heading)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            <span>Stock Dilution Calculator (M₁V₁ = M₂V₂)</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[var(--text-muted)] font-medium">Stock Solution Concentration (M₁):</label>
            <input
              type="number"
              step="any"
              value={m1}
              onChange={(e) => setM1(parseFloat(e.target.value) || 0)}
              className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-heading)] px-3 py-2 rounded text-xs focus:outline-none focus:border-[var(--accent-blue)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[var(--text-muted)] font-medium">Target Concentration (M₂):</label>
              <input
                type="number"
                step="any"
                value={m2}
                onChange={(e) => setM2(parseFloat(e.target.value) || 0)}
                className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-heading)] px-3 py-2 rounded text-xs focus:outline-none focus:border-[var(--accent-blue)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[var(--text-muted)] font-medium">Target Volume (V₂, mL):</label>
              <input
                type="number"
                step="any"
                value={v2}
                onChange={(e) => setV2(parseFloat(e.target.value) || 0)}
                className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-heading)] px-3 py-2 rounded text-xs focus:outline-none focus:border-[var(--accent-blue)]"
              />
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 rounded mt-auto flex flex-col justify-between gap-3">
            <div>
              <span className="text-[11px] text-[var(--text-muted)] block">Aliquot &amp; Dilution Protocol:</span>
              <div className="text-xs sm:text-sm text-[var(--text-main)] mt-1">
                Take <b className="text-[var(--accent-blue)]">{v1.toFixed(2)} mL</b> stock + dilute with{' '}
                <b className="text-[var(--accent-blue)]">{Math.max(0, v2 - v1).toFixed(2)} mL</b> solvent to exactly{' '}
                <b className="text-[var(--text-heading)]">{v2} mL</b>.
              </div>
            </div>
            <button
              onClick={copyDilutionRecipe}
              className="self-start inline-flex items-center gap-1.5 text-xs bg-[rgba(37,99,235,0.1)] hover:bg-[var(--accent-blue)] text-[#38bdf8] hover:text-white border border-[rgba(37,99,235,0.3)] px-3 py-1.5 rounded transition-colors font-mono"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy Dilution Protocol</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
