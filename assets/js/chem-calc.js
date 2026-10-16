/* 
  MUHAMMAD KAMRAN ASHRAF — PHYSICAL CHEMISTRY LAB TOOLKIT
  Interactive Molarity, Solution Preparation & Dilution Calculators
*/

document.addEventListener('DOMContentLoaded', () => {
  // Common reagents & molecular weights (g/mol)
  const reagents = {
    'custom': null,
    'cao': 56.077,        // Calcium Oxide (BS Research)
    'caco3': 100.086,     // Calcium Carbonate
    'ca_oh2': 74.093,     // Calcium Hydroxide
    'urea': 60.06,        // Urea (Electrochemical Biosensing)
    'aniline': 93.13,     // Aniline Monomer (PANi)
    'edta': 292.24,       // EDTA Disodium Salt
    'aps': 228.20,        // Ammonium Persulfate (Initiator)
    'chitosan': 161.16,   // Glucosamine repeat unit
    'eaa': 130.14,        // Ethyl Acetoacetate (EAA Grafting)
    'fe3o4': 231.53,      // Magnetite Nanoparticles
    'nacl': 58.44,        // Sodium Chloride
    'naoh': 39.997,       // Sodium Hydroxide
    'hcl': 36.46,         // Hydrochloric Acid
    'h2so4': 98.079       // Sulfuric Acid
  };

  const reagentSelect = document.getElementById('calc-reagent');
  const mwInput = document.getElementById('calc-mw');
  const molInput = document.getElementById('calc-molarity');
  const volInput = document.getElementById('calc-volume');
  const massResult = document.getElementById('calc-mass-val');

  if (reagentSelect && mwInput && molInput && volInput && massResult) {
    reagentSelect.addEventListener('change', () => {
      const selected = reagentSelect.value;
      if (reagents[selected]) {
        mwInput.value = reagents[selected];
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

      if (mw > 0 && molarity > 0 && volumeMl > 0) {
        const volumeL = volumeMl / 1000.0;
        const massGrams = molarity * mw * volumeL;

        if (massGrams < 0.001) {
          massResult.innerText = (massGrams * 1000).toFixed(3) + ' mg';
        } else if (massGrams < 1) {
          massResult.innerText = (massGrams * 1000).toFixed(1) + ' mg (' + massGrams.toFixed(4) + ' g)';
        } else {
          massResult.innerText = massGrams.toFixed(4) + ' g';
        }
      } else {
        massResult.innerText = '0.000 g';
      }
    }
  }

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
          dV1Result.innerText = 'Error: Target (M₂) > Stock (M₁)';
          dV1Result.style.color = '#f43f5e';
          return;
        }
        dV1Result.style.color = 'var(--accent-cyan)';
        const v1 = (m2 * v2) / m1;
        const waterNeeded = v2 - v1;

        dV1Result.innerHTML = `Take <b>${v1.toFixed(2)} mL</b> stock + dilute with <b>${waterNeeded.toFixed(2)} mL</b> solvent to <b>${v2} mL</b>`;
      } else {
        dV1Result.innerText = '0.00 mL stock required';
        dV1Result.style.color = 'var(--accent-cyan)';
      }
    }
  }
});
