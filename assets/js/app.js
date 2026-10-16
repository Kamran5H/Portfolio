/* 
  MUHAMMAD KAMRAN ASHRAF — ACADEMIC & COMPUTATIONAL PORTFOLIO
  Core Application Logic: Modals, Filters, Lightbox, CV Viewer & Toasts
*/

document.addEventListener('DOMContentLoaded', () => {
  // Theme Switching
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('kamran_theme') || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('kamran_theme', nextTheme);
      updateThemeIcon(nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Obsidian' : 'Clean Light'} Mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  // Mobile Menu Navigation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
    // Close drawer when link clicked
    mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileDrawer.classList.remove('open'));
    });
  }

  // Typing Effect for Sub-headline
  const typedTarget = document.getElementById('hero-typed-text');
  if (typedTarget) {
    const phrases = [
      "Physical Chemist & Computational Researcher",
      "DFT Molecular Modeling with Quantum ESPRESSO",
      "Bimetallic Ce-NiCo MOFs for ORR / OER Catalysis",
      "Green Urea-Imprinted Biosensors & Conductive Polymers",
      "Autonomous AI Architect with 25+ Shipped Engines"
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function typeLoop() {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        typedTarget.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 35;
      } else {
        typedTarget.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 70;
      }

      if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at full phrase
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400; // Pause before next phrase
      }

      setTimeout(typeLoop, typeSpeed);
    }
    typeLoop();
  }

  // Modal Dialog System (Generic & Extensible)
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  window.openModal = function(titleHtml, bodyHtml) {
    if (!modalBackdrop) return;
    modalTitle.innerHTML = titleHtml;
    modalBody.innerHTML = bodyHtml;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCats = card.getAttribute('data-category') || '';
        if (cat === 'all' || cardCats.includes(cat)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Toast System
  window.showToast = function(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // Copy to Clipboard buttons
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-copy');
      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied: ${val}`);
      }).catch(() => {
        showToast('Clipboard access denied');
      });
    });
  });

  // Certificate / Document Lightbox Opener
  window.viewDocumentModal = function(docTitle, docImagePath, docMeta) {
    const content = `
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <div style="background:#02050e;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);text-align:center;padding:0.75rem;">
          <img src="${docImagePath}" alt="${docTitle}" style="max-width:100%;max-height:580px;object-fit:contain;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,0.7);cursor:zoom-in;" onclick="window.open('${docImagePath}', '_blank')" />
        </div>
        <div style="background:rgba(255,255,255,0.03);padding:1.25rem;border-radius:10px;border:1px solid rgba(255,255,255,0.06);">
          <div style="font-family:var(--font-mono);color:var(--accent-cyan);font-size:0.8rem;margin-bottom:0.4rem;">VERIFIED ACADEMIC RECORD</div>
          <div style="color:var(--text-muted);font-size:0.92rem;line-height:1.6;">${docMeta}</div>
          <div style="margin-top:1rem;display:flex;gap:0.75rem;">
            <a href="${docImagePath}" target="_blank" class="btn-primary" style="font-size:0.82rem;padding:0.45rem 1rem;">Open Full Resolution</a>
            <button onclick="window.print()" class="btn-secondary" style="font-size:0.82rem;padding:0.45rem 1rem;">Print / Save PDF</button>
          </div>
        </div>
      </div>
    `;
    openModal(docTitle, content);
  };

  // Research Manuscript Modal Details Opener
  window.viewResearchModal = function(researchId) {
    let title = "";
    let html = "";

    if (researchId === 'zn-air') {
      title = "Why the Corner Is Empty: Antagonistic Requirements in Re-chargeable Zinc–Air Batteries";
      html = `
        <div style="display:flex;flex-direction:column;gap:1.25rem;">
          <div class="status-pill status-review" style="width:fit-content;">UNDER DEPARTMENTAL / JOURNAL REVIEW</div>
          <div style="font-size:0.92rem;color:var(--text-muted);">
            <b>Authors:</b> Muhammad Kamran Ashraf, Hamda Maqbool, Safeer Ahmed*<br/>
            <b>Affiliation:</b> Department of Physical Chemistry, Quaid-i-Azam University, Islamabad 45320, Pakistan<br/>
            <b>Corresponding Author:</b> Prof. Dr. Safeer Ahmed (<code>safeerad@qau.edu.pk</code>)
          </div>

          <div style="background:rgba(0,242,254,0.04);border-left:3px solid var(--accent-cyan);padding:1rem 1.25rem;border-radius:6px;">
            <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-cyan);margin-bottom:0.4rem;font-weight:700;">ABSTRACT & CORE THESIS</div>
            <p style="font-size:0.9rem;color:var(--text-main);line-height:1.65;">
              Rechargeable aqueous zinc–air batteries promise ultra-high theoretical specific energy (1086 Wh kg⁻¹), intrinsically non-flammable safety, and rock-bottom material costs. However, practical commercialization has hit an elusive performance plateau—a phenomena we define as the "Empty Corner" of the Ragone–Durability space. In this critical review and mechanistic evaluation, we dissect the fundamentally antagonistic requirements governing the air cathode, electrolyte, and zinc anode.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div style="background:rgba(255,255,255,0.03);padding:1.15rem;border-radius:10px;border:1px solid var(--border-subtle);">
              <h4 style="color:var(--accent-amber);font-size:0.95rem;margin-bottom:0.5rem;">Coupled Failure Modes</h4>
              <ul style="padding-left:1.1rem;font-size:0.85rem;color:var(--text-muted);line-height:1.6;">
                <li><b>Carbon Corrosion vs. OER:</b> High positive potentials during charging accelerate electro-oxidation of carbonaceous catalyst supports.</li>
                <li><b>Zinc Dendrites vs. Hydrogen Evolution (HER):</b> Concentration polarization drives non-uniform zinc electrodeposition and cell shorting.</li>
                <li><b>Carbonate Precipitation:</b> Atmospheric CO₂ reaction with alkaline KOH yields insoluble K₂CO₃, clogging gas-diffusion pores.</li>
              </ul>
            </div>

            <div style="background:rgba(255,255,255,0.03);padding:1.15rem;border-radius:10px;border:1px solid var(--border-subtle);">
              <h4 style="color:var(--accent-emerald);font-size:0.95rem;margin-bottom:0.5rem;">The Proposed Reporting Standard</h4>
              <ul style="padding-left:1.1rem;font-size:0.85rem;color:var(--text-muted);line-height:1.6;">
                <li>Standardized negative-to-positive (N/P) capacity ratio constraints.</li>
                <li>Electrolyte-to-capacity (E/C) volume normalization.</li>
                <li>True round-trip energy efficiency metrics at commercially relevant areal current densities (≥ 10 mA cm⁻²).</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    } else if (researchId === 'chitosan') {
      title = "Grafting of Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate";
      html = `
        <div style="display:flex;flex-direction:column;gap:1.25rem;">
          <div class="status-pill status-completed" style="width:fit-content;">MANUSCRIPT COMPLETED — TARGETING JOURNAL SUBMISSION</div>
          <div style="font-size:0.92rem;color:var(--text-muted);">
            <b>Authors:</b> Anam Rehman<sup>1,†</sup>, <b>Muhammad Kamran Ashraf<sup>2,†,*</sup></b>, Hamda Maqbool<sup>2</sup><br/>
            <sup>1</sup> School of Chemistry, University of the Punjab, Lahore 54590, Pakistan<br/>
            <sup>2</sup> Department of Chemistry, Quaid-i-Azam University, Islamabad 45320, Pakistan<br/>
            <sup>†</sup> These authors contributed equally to this work.<br/>
            <b>* Corresponding author:</b> Muhammad Kamran Ashraf (<code>chkamran32b@gmail.com</code>)
          </div>

          <div style="background:rgba(16,185,129,0.05);border-left:3px solid var(--accent-emerald);padding:1rem 1.25rem;border-radius:6px;">
            <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-emerald);margin-bottom:0.4rem;font-weight:700;">SYNOPSIS & SPECTROSCOPIC/DFT CORROBORATION</div>
            <p style="font-size:0.9rem;color:var(--text-main);line-height:1.65;">
              Chitosan's primary amine (-NH₂) groups were chemically functionalized via free-radical graft copolymerization of ethyl acetoacetate (EAA) using ammonium persulfate (APS) as a thermally activated initiator. Density Functional Theory (DFT) calculations performed at the B3LYP/6-31G(d) level corroborated the β-ketoester linkage energetics and FTIR vibrational frequency shifts (C=O ester stretching at ~1735 cm⁻¹ and enolic resonance at ~1630 cm⁻¹).
            </p>
          </div>

          <div style="background:rgba(255,255,255,0.03);padding:1.25rem;border-radius:10px;border:1px solid var(--border-subtle);">
            <h4 style="color:var(--accent-cyan);font-size:0.95rem;margin-bottom:0.5rem;">Assembly into Fe₃O₄/Alginate Hydrogel Beads</h4>
            <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.6;">
              The resulting EAA-grafted chitosan macromolecule was blended with sodium alginate and coprecipitated with Fe₃O₄ magnetite nanoparticles into millimeter-scale spherical magnetic hydrogel beads. The beads exhibit superparamagnetic responsiveness (enabling magnetic retrieval with a neodymium magnet in under 15 seconds) and chelation capacity for toxic heavy metal divalent cations (Pb²⁺, Cd²⁺, Cu²⁺) from industrial effluents.
            </p>
          </div>
        </div>
      `;
    } else if (researchId === 'mof-cerium') {
      title = "Theoretical Investigation of Cerium Electronic Modulation (Ce3+/Ce4+) on Bimetallic NiCo-MOFs";
      html = `
        <div style="display:flex;flex-direction:column;gap:1.25rem;">
          <div class="status-pill status-thesis" style="width:fit-content;">MPHIL THESIS COMPUTATIONAL RESEARCH (SESSION 2025–2027)</div>
          <div style="font-size:0.92rem;color:var(--text-muted);">
            <b>Candidate:</b> Muhammad Kamran Ashraf (Department of Chemistry, QAU Islamabad)<br/>
            <b>Supervisor:</b> Prof. Dr. Safeer Ahmed (Professor of Physical Chemistry, QAU)<br/>
            <b>Co-supervisor (Computational):</b> Dr. Zahid Rashid (Department of Chemistry, QAU)<br/>
            <b>Methodology:</b> Ab-Initio Density Functional Theory (DFT + U, Quantum ESPRESSO, PAW PBE-GGA)
          </div>

          <div style="background:rgba(0,242,254,0.05);border-left:3px solid var(--accent-cyan);padding:1rem 1.25rem;border-radius:6px;">
            <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-cyan);margin-bottom:0.4rem;font-weight:700;">SCIENTIFIC HYPOTHESIS & COMPUTATIONAL DESIGNS</div>
            <p style="font-size:0.9rem;color:var(--text-main);line-height:1.65;">
              Bimetallic nickel–cobalt metal–organic frameworks (NiCo-BDC MOFs) offer exceptional porous surface areas, but suffer from sluggish reaction kinetics for the 4-electron oxygen reduction (ORR) and oxygen evolution (OER) electrocatalytic pathways. By atomically doping Cerium into the metal nodes, the flexible redox couple (Ce³⁺ ⇄ Ce⁴⁺ with 4f⁰/4f¹ electron buffering) drastically modulates the d-band center of neighbouring Co and Ni active sites.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div style="background:#02050e;padding:0.75rem;border-radius:8px;border:1px solid var(--border-subtle);text-align:center;">
              <img src="assets/images/research/02_Pristine_NiCo_MOF_2D_3D.png" style="width:100%;height:180px;object-fit:cover;border-radius:6px;cursor:zoom-in;" onclick="window.open(this.src, '_blank')" />
              <div style="font-size:0.76rem;color:var(--accent-cyan);margin-top:0.4rem;font-family:var(--font-mono);">Pristine NiCo-MOF 2D/3D (Click to zoom)</div>
            </div>
            <div style="background:#02050e;padding:0.75rem;border-radius:8px;border:1px solid var(--border-subtle);text-align:center;">
              <img src="assets/images/research/03_Ce_Doped_NiCo_MOF_3D.png" style="width:100%;height:180px;object-fit:cover;border-radius:6px;cursor:zoom-in;" onclick="window.open(this.src, '_blank')" />
              <div style="font-size:0.76rem;color:var(--accent-amber);margin-top:0.4rem;font-family:var(--font-mono);">Ce-Doped Active Node (Click to zoom)</div>
            </div>
          </div>

          <div style="background:#02050e;padding:0.75rem;border-radius:8px;border:1px solid var(--border-subtle);text-align:center;">
            <img src="assets/images/research/04_ORR_OER_Reaction_Intermediates.png" style="width:100%;max-height:240px;object-fit:contain;border-radius:6px;cursor:zoom-in;" onclick="window.open(this.src, '_blank')" />
            <div style="font-size:0.76rem;color:var(--text-muted);margin-top:0.4rem;font-family:var(--font-mono);">DFT Reaction Free Energy Profiles for OOH*, O*, and OH* Intermediates</div>
          </div>
        </div>
      `;
    } else if (researchId === 'bs-thesis') {
      title = "Green Synthesis of CaO Nanoparticles & Urea-Imprinted PANi@CaO Electrochemical Biosensor";
      html = `
        <div style="display:flex;flex-direction:column;gap:1.25rem;">
          <div class="status-pill status-completed" style="width:fit-content;">BS DEGREE CAPSTONE RESEARCH (PUNJAB UNIVERSITY, 2024)</div>
          <div style="font-size:0.92rem;color:var(--text-muted);">
            <b>Candidate:</b> Muhammad Kamran Ashraf (School of Chemistry, University of the Punjab)<br/>
            <b>Green Synthesis Supervisor:</b> Dr. Imran Din (Department of Chemistry, PU)<br/>
            <b>Electrochemical Sensing Supervisor:</b> Dr. Adeel Afzal (School of Chemistry, PU)
          </div>

          <div style="background:rgba(16,185,129,0.05);border-left:3px solid var(--accent-emerald);padding:1rem 1.25rem;border-radius:6px;">
            <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-emerald);margin-bottom:0.4rem;font-weight:700;">METHODOLOGY & EXPERIMENTAL RESULTS</div>
            <p style="font-size:0.9rem;color:var(--text-main);line-height:1.65;">
              1. <b>Phytochemical Nanotechnology:</b> Calcium oxide (CaO) nanoparticles were sustainably synthesized via plant-mediated precipitation using aqueous leaf extract of <i>Syzygium cumini</i> (Jamun) as natural capping and reducing agents, avoiding hazardous organic solvents.<br/><br/>
              2. <b>Molecular Imprinting:</b> Conductive polyaniline (PANi) was chemically oxidized in the presence of CaO nanoparticles and urea template molecules. Template extraction with acid–alcohol left artificial biomimetic receptor cavities specifically shaped for urea recognition.<br/><br/>
              3. <b>Electrochemical Diagnostics:</b> The sensor demonstrated wide linear dynamic range, sub-micromolar limit of detection (LOD), and high anti-interference selectivity against glucose, ascorbic acid, and uric acid for point-of-care renal clinical diagnostics.
            </p>
          </div>
        </div>
      `;
    }

    openModal(title, html);
  };

  // Full Screen Live CV Viewer Modal
  window.openCVViewer = function() {
    const cvHtml = `
      <div style="display:flex;flex-direction:column;gap:1.5rem;font-family:var(--font-main);">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--accent-cyan);padding-bottom:1rem;flex-wrap:wrap;gap:1rem;">
          <div>
            <h2 style="font-size:1.8rem;font-weight:800;color:var(--text-heading);margin-bottom:0.25rem;">MUHAMMAD KAMRAN ASHRAF</h2>
            <div style="font-family:var(--font-mono);color:var(--accent-cyan);font-size:0.9rem;">Physical Chemist & Computational Researcher · MPhil Scholar</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.35rem;">
              Department of Chemistry, Quaid-i-Azam University, Islamabad 45320, Pakistan<br/>
              Email: <b>chkamran32b@gmail.com</b> | Phone: <b>+92 307 0325132</b> | GitHub: <b>github.com/Kamran5H</b>
            </div>
          </div>
          <div style="display:flex;gap:0.75rem;">
            <button onclick="window.print()" class="btn-primary" style="padding:0.5rem 1rem;font-size:0.85rem;">Print Official CV</button>
          </div>
        </div>

        <div>
          <h3 style="color:var(--accent-cyan);font-size:1.1rem;margin-bottom:0.6rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border-subtle);padding-bottom:0.3rem;">Academic Profile</h3>
          <p style="font-size:0.92rem;color:var(--text-main);line-height:1.65;">
            Physical Chemist and computational researcher currently in the 4th semester of MPhil Physical Chemistry at Quaid-i-Azam University, Islamabad, under the supervision of Prof. Dr. Safeer Ahmed. Expertise spans electrochemical sensing, molecularly imprinted polymer (MIP) design, green biosynthesis of metal oxides, and density functional theory (DFT) simulations of heterogeneous electrocatalysts (Ce-doped NiCo MOFs). Complementing scientific training with high-rigor computational software engineering (25+ active repositories).
          </p>
        </div>

        <div>
          <h3 style="color:var(--accent-cyan);font-size:1.1rem;margin-bottom:0.6rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border-subtle);padding-bottom:0.3rem;">Education (Reverse Chronological)</h3>
          
          <div style="margin-bottom:1rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.95rem;">
              <span>MPhil in Physical Chemistry (4th Semester)</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2025 – 2027</span>
            </div>
            <div style="font-size:0.88rem;color:var(--text-muted);">Quaid-i-Azam University, Islamabad | Supervisor: Prof. Dr. Safeer Ahmed</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.2rem;">• Focus: Computational DFT electronic modulation of Ce-NiCo MOFs & Zinc–Air battery mechanics.</div>
          </div>

          <div style="margin-bottom:1rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.95rem;">
              <span>BS (4-Years) in Chemistry</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2020 – 2024</span>
            </div>
            <div style="font-size:0.88rem;color:var(--text-muted);">School of Chemistry, University of the Punjab, Lahore | CGPA: 2.97</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.2rem;">• Capstone Research: Green synthesis of CaO nanoparticles (Dr. Imran Din) & Urea-imprinted PANi biosensor (Dr. Adeel Afzal).</div>
          </div>

          <div style="margin-bottom:1rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.95rem;">
              <span>F.Sc Pre-Medical</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2018 – 2020</span>
            </div>
            <div style="font-size:0.88rem;color:var(--text-muted);">Govt Post Graduate College Okara | BISE Sahiwal | Marks: 960/1100 (Grade A+)</div>
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.95rem;">
              <span>Matriculation (Science)</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2015 – 2017</span>
            </div>
            <div style="font-size:0.88rem;color:var(--text-muted);">Govt High School Chak No. 32/2L Okara | BISE Sahiwal | Marks: 917/1100 (Grade A+)</div>
          </div>
        </div>

        <div>
          <h3 style="color:var(--accent-cyan);font-size:1.1rem;margin-bottom:0.6rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border-subtle);padding-bottom:0.3rem;">Teaching Experience</h3>
          <div style="margin-bottom:0.85rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.95rem;">
              <span>Chemistry Lecturer (Matric & Intermediate)</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2024 – 2025</span>
            </div>
            <div style="font-size:0.88rem;color:var(--text-muted);">Unique Science Academy & High School (Johar View Campus, Lahore)</div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.95rem;">
              <span>Science & Chemistry Teacher</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2019 – 2022</span>
            </div>
            <div style="font-size:0.88rem;color:var(--text-muted);">The Educators (Noor Campus, Moza Joyia, Okara)</div>
          </div>
        </div>

        <div>
          <h3 style="color:var(--accent-cyan);font-size:1.1rem;margin-bottom:0.6rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border-subtle);padding-bottom:0.3rem;">Working Research & Manuscripts</h3>
          <ul style="padding-left:1.25rem;font-size:0.88rem;color:var(--text-muted);line-height:1.65;">
            <li><b>Why the Corner Is Empty: Antagonistic Requirements in Re-chargeable Zinc–Air Batteries</b> — Muhammad Kamran Ashraf, Hamda Maqbool, Safeer Ahmed* (Under Review with Supervisor / Journal).</li>
            <li><b>Grafting of Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate: FTIR and DFT Evidence...</b> — Anam Rehman†, Muhammad Kamran Ashraf†*, Hamda Maqbool (Manuscript Completed).</li>
            <li><b>Theoretical Investigation of Cerium Electronic Modulation (Ce3+/Ce4+) on Bimetallic NiCo-MOFs for ORR/OER</b> — Muhammad Kamran Ashraf, Safeer Ahmed, Zahid Rashid (MPhil Thesis Proposal).</li>
          </ul>
        </div>
      </div>
    `;
    openModal("Curriculum Vitae — Muhammad Kamran Ashraf", cvHtml);
  };
});
