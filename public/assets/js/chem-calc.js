/* 
  MUHAMMAD KAMRAN ASHRAF — PHYSICAL CHEMISTRY LAB TOOLKIT
  Interactive Molarity, Solution Preparation, Dilution & Lab Recipe Engines
*/

document.addEventListener('DOMContentLoaded', () => {
  // Comprehensive reagents & molecular weights (g/mol) tailored to physical chemistry research
  const reagents = {
    'custom': null,
    // Research Specific (QAU & PU)
    'cao': { name: 'Calcium Oxide (CaO)', mw: 56.077 },
    'caco3': { name: 'Calcium Carbonate (CaCO₃)', mw: 100.086 },
    'ca_oh2': { name: 'Calcium Hydroxide [Ca(OH)₂]', mw: 74.093 },
    'urea': { name: 'Urea [CO(NH₂)₂]', mw: 60.06 },
    'aniline': { name: 'Aniline (C₆H₅NH₂)', mw: 93.13 },
    'aps': { name: 'Ammonium Persulfate [(NH₄)₂S₂O₈]', mw: 228.20 },
    'eaa': { name: 'Ethyl Acetoacetate (EAA)', mw: 130.14 },
    'chitosan': { name: 'Chitosan Monomer (Glucosamine)', mw: 161.16 },
    'fe3o4': { name: 'Magnetite (Fe₃O₄)', mw: 231.53 },
    'ni_no3': { name: 'Nickel(II) Nitrate Hexahydrate [Ni(NO₃)₂·6H₂O]', mw: 290.79 },
    'co_no3': { name: 'Cobalt(II) Nitrate Hexahydrate [Co(NO₃)₂·6H₂O]', mw: 291.03 },
    'ce_no3': { name: 'Cerium(III) Nitrate Hexahydrate [Ce(NO₃)₃·6H₂O]', mw: 434.22 },
    'h2bdc': { name: '1,4-Benzenedicarboxylic Acid / Terephthalic Acid (H₂BDC)', mw: 166.13 },
    'zn_acetate': { name: 'Zinc Acetate Dihydrate [Zn(CH₃COO)₂·2H₂O]', mw: 219.51 },
    'koh': { name: 'Potassium Hydroxide (KOH)', mw: 56.11 },
    'alginate': { name: 'Sodium Alginate Monomer', mw: 216.12 },
    // Standard Bench Reagents
    'naoh': { name: 'Sodium Hydroxide (NaOH)', mw: 39.997 },
    'hcl': { name: 'Hydrochloric Acid (HCl)', mw: 36.46 },
    'h2so4': { name: 'Sulfuric Acid (H₂SO₄)', mw: 98.079 },
    'kmno4': { name: 'Potassium Permanganate (KMnO₄)', mw: 158.034 },
    'edta': { name: 'EDTA Disodium Salt Dihydrate', mw: 372.24 },
    'nacl': { name: 'Sodium Chloride (NaCl)', mw: 58.44 }
  };

  const reagentSelect = document.getElementById('calc-reagent');
  const mwInput = document.getElementById('calc-mw');
  const molInput = document.getElementById('calc-molarity');
  const volInput = document.getElementById('calc-volume');
  const massResult = document.getElementById('calc-mass-val');

  let currentRecipeText = '';
  let currentDilutionText = '';

  if (reagentSelect && mwInput && molInput && volInput && massResult) {
    reagentSelect.addEventListener('change', () => {
      const selected = reagentSelect.value;
      if (reagents[selected]) {
        mwInput.value = reagents[selected].mw;
      }
      calculateMass();
    });

    [mwInput, molInput, volInput].forEach(inp => {
      inp.addEventListener('input', calculateMass);
    });

    function calculateMass() {
      const mw = parseFloat(mwInput.value) || 0;
      const molarity = parseFloat(molInput.value) || 0; // mol/L
      const volumeMl = parseFloat(volInput.value) || 0; // mL
      const selectedKey = reagentSelect.value;
      const reagentName = reagents[selectedKey] ? reagents[selectedKey].name : 'Custom Reagent';

      if (mw > 0 && molarity > 0 && volumeMl > 0) {
        const volumeL = volumeMl / 1000.0;
        const massGrams = molarity * mw * volumeL;

        let displayMass = '';
        if (massGrams < 0.001) {
          displayMass = (massGrams * 1000).toFixed(3) + ' mg';
        } else if (massGrams < 1) {
          displayMass = (massGrams * 1000).toFixed(1) + ' mg (' + massGrams.toFixed(4) + ' g)';
        } else {
          displayMass = massGrams.toFixed(4) + ' g';
        }

        massResult.innerText = displayMass;
        currentRecipeText = `Laboratory Recipe: Weigh ${displayMass} of ${reagentName} (MW: ${mw} g/mol). Dissolve quantitatively in deionized water and dilute to ${volumeMl} mL in a volumetric flask to prepare a ${molarity} M solution.`;
      } else {
        massResult.innerText = '0.000 g';
        currentRecipeText = '';
      }
    }
    calculateMass();
  }

  // Copy Recipe Button
  window.copySolutionRecipe = function() {
    if (!currentRecipeText) {
      if (typeof showToast === 'function') showToast('Please enter valid molecular weight, molarity, and volume first');
      return;
    }
    navigator.clipboard.writeText(currentRecipeText).then(() => {
      if (typeof showToast === 'function') showToast('📋 Solution recipe copied to clipboard!');
    }).catch(() => {
      if (typeof showToast === 'function') showToast('Clipboard permission required');
    });
  };

  // Dilution Calculator (M1 * V1 = M2 * V2)
  const dM1 = document.getElementById('dil-m1');
  const dM2 = document.getElementById('dil-m2');
  const dV2 = document.getElementById('dil-v2');
  const dV1Result = document.getElementById('dil-v1-val');

  if (dM1 && dM2 && dV2 && dV1Result) {
    [dM1, dM2, dV2].forEach(inp => {
      inp.addEventListener('input', calculateDilution);
    });

    function calculateDilution() {
      const m1 = parseFloat(dM1.value) || 0;
      const m2 = parseFloat(dM2.value) || 0;
      const v2 = parseFloat(dV2.value) || 0;

      if (m1 > 0 && m2 > 0 && v2 > 0) {
        if (m2 > m1) {
          dV1Result.innerText = 'Error: Target (M₂) cannot exceed Stock (M₁)';
          dV1Result.style.color = '#f43f5e';
          currentDilutionText = '';
          return;
        }
        dV1Result.style.color = 'var(--accent-cyan)';
        const v1 = (m2 * v2) / m1;
        const waterNeeded = v2 - v1;

        dV1Result.innerHTML = `Take <b>${v1.toFixed(2)} mL</b> stock + dilute with <b>${waterNeeded.toFixed(2)} mL</b> solvent to <b>${v2} mL</b>`;
        currentDilutionText = `Dilution Protocol: Pipette ${v1.toFixed(2)} mL of ${m1} M stock solution into a ${v2} mL volumetric flask. Add approximately ${waterNeeded.toFixed(2)} mL of solvent and dilute exactly to the ${v2} mL graduation mark to obtain ${m2} M concentration.`;
      } else {
        dV1Result.innerText = '0.00 mL stock required';
        dV1Result.style.color = 'var(--accent-cyan)';
        currentDilutionText = '';
      }
    }
    calculateDilution();
  }

  // Copy Dilution Recipe
  window.copyDilutionRecipe = function() {
    if (!currentDilutionText) {
      if (typeof showToast === 'function') showToast('Please enter valid concentrations and volume first');
      return;
    }
    navigator.clipboard.writeText(currentDilutionText).then(() => {
      if (typeof showToast === 'function') showToast('📋 Dilution protocol copied to clipboard!');
    }).catch(() => {
      if (typeof showToast === 'function') showToast('Clipboard permission required');
    });
  };
});
