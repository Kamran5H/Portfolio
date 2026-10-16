/* 
  MUHAMMAD KAMRAN ASHRAF — ACADEMIC & COMPUTATIONAL PORTFOLIO
  Core Application Logic: Modals, ScrollSpy, Lightbox, CV Viewer, A11y & Toasts
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switching (Dark Obsidian & Clean Light)
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

  // 2. Mobile Menu Navigation & Accessible Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 3. ScrollSpy Navigation (Dynamic Active Section Tracking)
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(sec => scrollSpyObserver.observe(sec));

  // 4. Floating Back-to-Top with Circular Scroll Progress Ring
  const backToTopBtn = document.getElementById('btn-back-to-top');
  const progressCircle = document.getElementById('scroll-progress-circle');
  const circumference = 2 * Math.PI * 18; // r=18

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollY / (maxScroll || 1)));

    if (progressCircle) {
      const offset = circumference - progress * circumference;
      progressCircle.style.strokeDashoffset = `${offset}`;
    }

    if (backToTopBtn) {
      if (scrollY > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Typing Effect for Sub-headline
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
        typeSpeed = 2200; // Pause at full phrase
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400; // Pause before next phrase
      }

      setTimeout(typeLoop, typeSpeed);
    }
    typeLoop();
  }

  // 6. Accessible Modal Dialog System (Focus Trap & Scroll Stability)
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  let lastActiveElement = null;

  window.openModal = function(titleHtml, bodyHtml) {
    if (!modalBackdrop) return;
    lastActiveElement = document.activeElement;

    modalTitle.innerHTML = titleHtml;
    modalBody.innerHTML = bodyHtml;

    // Compensate scrollbar width to prevent desktop layout jump
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');

    if (modalCloseBtn) modalCloseBtn.focus();
  };

  window.closeModal = function() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Trap keyboard focus inside open modal (Tab & Shift+Tab)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalBackdrop && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
      closeImageLightbox();
      return;
    }

    if (e.key === 'Tab' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      const focusables = modalBackdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // 7. Full-Screen Image Lightbox Viewer
  window.openImageLightbox = function(src, caption) {
    let lb = document.getElementById('lightbox-viewer');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'lightbox-viewer';
      lb.className = 'lightbox-modal';
      lb.innerHTML = `
        <div class="lightbox-overlay" onclick="closeImageLightbox()"></div>
        <div class="lightbox-content">
          <button class="lightbox-close" onclick="closeImageLightbox()" aria-label="Close Lightbox">&times;</button>
          <img id="lightbox-img" src="" alt="Full view" />
          <div id="lightbox-caption" class="lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(lb);
    }

    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (img) img.src = src;
    if (cap) cap.innerText = caption || 'High-Resolution Research Asset';

    lb.classList.add('active');
  };

  window.closeImageLightbox = function() {
    const lb = document.getElementById('lightbox-viewer');
    if (lb) lb.classList.remove('active');
  };

  // 8. Project Filtering with Smooth Transitions
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const cat = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCats = card.getAttribute('data-category') || '';
        if (cat === 'all' || cardCats.includes(cat)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 9. Toast Notification System
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

  // 10. Document / Certificate Lightbox Modal Opener
  window.viewDocumentModal = function(docTitle, docImagePath, docMeta) {
    const content = `
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <div style="background:#02050e;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);text-align:center;padding:0.75rem;">
          <img src="${docImagePath}" alt="${docTitle}" style="max-width:100%;max-height:560px;object-fit:contain;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,0.7);cursor:zoom-in;" onclick="openImageLightbox('${docImagePath}', '${docTitle.replace(/'/g, "\\'")}')" />
          <div style="font-size:0.75rem;color:var(--accent-cyan);margin-top:0.45rem;font-family:var(--font-mono);">
            🔍 Click image to open in full-screen zoom lightbox
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.03);padding:1.25rem;border-radius:10px;border:1px solid rgba(255,255,255,0.06);">
          <div style="font-family:var(--font-mono);color:var(--accent-cyan);font-size:0.8rem;margin-bottom:0.4rem;font-weight:700;">VERIFIED ACADEMIC RECORD</div>
          <div style="color:var(--text-muted);font-size:0.92rem;line-height:1.6;">${docMeta}</div>
          <div style="margin-top:1rem;display:flex;gap:0.75rem;flex-wrap:wrap;">
            <button onclick="openImageLightbox('${docImagePath}', '${docTitle.replace(/'/g, "\\'")}')" class="btn-primary" style="font-size:0.82rem;padding:0.45rem 1rem;">
              Full Screen Lightbox
            </button>
            <a href="${docImagePath}" download class="btn-secondary" style="font-size:0.82rem;padding:0.45rem 1rem;text-decoration:none;">
              Download High-Res Scan
            </a>
          </div>
        </div>
      </div>
    `;
    openModal(docTitle, content);
  };

  // 11. Research Manuscript Modal Details Opener (Includes all 4 diagrams for MOF)
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
                <li><b>Zinc Dendrites vs. HER:</b> Concentration polarization drives non-uniform zinc electrodeposition and cell shorting.</li>
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
            <h4 style="color:var(--accent-cyan);font-size:0.95rem;margin-bottom:0.5rem;">Assembly into Fe₃O₄/Alginate Magnetic Hydrogel Beads</h4>
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
            <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-cyan);margin-bottom:0.4rem;font-weight:700;">SCIENTIFIC HYPOTHESIS & STRUCTURAL DESIGNS</div>
            <p style="font-size:0.9rem;color:var(--text-main);line-height:1.65;">
              Bimetallic nickel–cobalt metal–organic frameworks (NiCo-BDC MOFs) offer exceptional porous surface areas, but suffer from sluggish reaction kinetics for the 4-electron oxygen reduction (ORR) and oxygen evolution (OER) electrocatalytic pathways. By atomically doping Cerium into the metal nodes, the flexible redox couple (Ce³⁺ ⇄ Ce⁴⁺ with 4f⁰/4f¹ electron buffering) drastically modulates the d-band center of neighbouring Co and Ni active sites.
            </p>
          </div>

          <!-- All 4 Research Structural Figures with In-Page Lightbox -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div style="background:#02050e;padding:0.75rem;border-radius:8px;border:1px solid var(--border-subtle);text-align:center;">
              <img src="assets/images/research/01_BDC_Linker_Structure.png" style="width:100%;height:160px;object-fit:contain;border-radius:6px;cursor:zoom-in;" onclick="openImageLightbox(this.src, '1,4-Benzenedicarboxylate (BDC) Linker Coordination Modes')" />
              <div style="font-size:0.76rem;color:var(--accent-cyan);margin-top:0.4rem;font-family:var(--font-mono);">Fig 1: BDC Organic Linker Structure</div>
            </div>

            <div style="background:#02050e;padding:0.75rem;border-radius:8px;border:1px solid var(--border-subtle);text-align:center;">
              <img src="assets/images/research/02_Pristine_NiCo_MOF_2D_3D.png" style="width:100%;height:160px;object-fit:contain;border-radius:6px;cursor:zoom-in;" onclick="openImageLightbox(this.src, 'Pristine 2D/3D NiCo-MOF Coordination Framework')" />
              <div style="font-size:0.76rem;color:var(--accent-cyan);margin-top:0.4rem;font-family:var(--font-mono);">Fig 2: Pristine NiCo-MOF 2D/3D</div>
            </div>

            <div style="background:#02050e;padding:0.75rem;border-radius:8px;border:1px solid var(--border-subtle);text-align:center;">
              <img src="assets/images/research/03_Ce_Doped_NiCo_MOF_3D.png" style="width:100%;height:160px;object-fit:contain;border-radius:6px;cursor:zoom-in;" onclick="openImageLightbox(this.src, 'Ce-Doped Active Catalytic Center with Electronic Modulation')" />
              <div style="font-size:0.76rem;color:var(--accent-amber);margin-top:0.4rem;font-family:var(--font-mono);">Fig 3: Ce-Doped Active Catalytic Node</div>
            </div>

            <div style="background:#02050e;padding:0.75rem;border-radius:8px;border:1px solid var(--border-subtle);text-align:center;">
              <img src="assets/images/research/04_ORR_OER_Reaction_Intermediates.png" style="width:100%;height:160px;object-fit:contain;border-radius:6px;cursor:zoom-in;" onclick="openImageLightbox(this.src, 'DFT Reaction Free Energy Profiles for OOH*, O*, and OH* Intermediates')" />
              <div style="font-size:0.76rem;color:var(--accent-emerald);margin-top:0.4rem;font-family:var(--font-mono);">Fig 4: ORR/OER Reaction Pathways</div>
            </div>
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

  // 12. Full Screen Printable Curriculum Vitae Modal
  window.openCVViewer = function() {
    const cvHtml = `
      <div class="printable-cv-container" style="display:flex;flex-direction:column;gap:1.5rem;font-family:var(--font-main);">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--accent-cyan);padding-bottom:1rem;flex-wrap:wrap;gap:1rem;">
          <div>
            <h2 style="font-size:1.8rem;font-weight:800;color:var(--text-heading);margin-bottom:0.25rem;">MUHAMMAD KAMRAN ASHRAF</h2>
            <div style="font-family:var(--font-mono);color:var(--accent-cyan);font-size:0.9rem;font-weight:600;">Physical Chemist & Computational Researcher · MPhil Scholar</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.35rem;line-height:1.5;">
              Department of Chemistry, Quaid-i-Azam University, Islamabad 45320, Pakistan<br/>
              Email: <b>chkamran32b@gmail.com</b> | Phone / WhatsApp: <b>+92 307 0325132</b> | GitHub: <b>github.com/Kamran5H</b>
            </div>
          </div>
          <div class="no-print" style="display:flex;gap:0.75rem;">
            <button onclick="window.print()" class="btn-primary" style="padding:0.5rem 1rem;font-size:0.85rem;">
              🖨️ Print / Save as PDF
            </button>
            <button onclick="copyCVText()" class="btn-secondary" style="padding:0.5rem 1rem;font-size:0.85rem;">
              📋 Copy Plain Text
            </button>
          </div>
        </div>

        <div>
          <h3 style="color:var(--accent-cyan);font-size:1.05rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border-subtle);padding-bottom:0.25rem;">Academic Profile</h3>
          <p style="font-size:0.9rem;color:var(--text-main);line-height:1.65;">
            Physical Chemist and computational researcher in the 4th semester of MPhil Physical Chemistry at Quaid-i-Azam University, Islamabad, under the supervision of Prof. Dr. Safeer Ahmed. Research expertise spans electrochemical sensing, molecularly imprinted polymer (MIP) design, green biosynthesis of metal oxide nanoparticles, and density functional theory (DFT) simulations of heterogeneous electrocatalysts (Ce-doped NiCo MOFs). Experienced in 25+ software engineering and AI architectures.
          </p>
        </div>

        <div>
          <h3 style="color:var(--accent-cyan);font-size:1.05rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border-subtle);padding-bottom:0.25rem;">Education (Reverse Chronological)</h3>
          
          <div style="margin-bottom:0.9rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.92rem;">
              <span>MPhil in Physical Chemistry (4th Semester)</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2025 – 2027</span>
            </div>
            <div style="font-size:0.86rem;color:var(--text-muted);">Quaid-i-Azam University, Islamabad | Supervisor: Prof. Dr. Safeer Ahmed (CGPA: 3.30/4.00)</div>
            <div style="font-size:0.83rem;color:var(--text-muted);margin-top:0.2rem;">• Focus: Computational DFT electronic modulation of Ce-NiCo MOFs & Zinc–Air battery mechanics.</div>
          </div>

          <div style="margin-bottom:0.9rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.92rem;">
              <span>Bachelor of Science (BS) in Chemistry</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2020 – 2024</span>
            </div>
            <div style="font-size:0.86rem;color:var(--text-muted);">School of Chemistry, University of the Punjab, Lahore | CGPA: 2.97 / 4.00</div>
            <div style="font-size:0.83rem;color:var(--text-muted);margin-top:0.2rem;">• Capstone Research: Green synthesis of CaO nanoparticles (Dr. Imran Din) & Urea-imprinted PANi biosensor (Dr. Adeel Afzal).</div>
          </div>

          <div style="margin-bottom:0.9rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.92rem;">
              <span>Associate Degree in Science (ADS / B.Sc)</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2020 – 2022</span>
            </div>
            <div style="font-size:0.86rem;color:var(--text-muted);">Govt. Post Graduate College, Okara &bull; University of the Punjab</div>
          </div>

          <div style="margin-bottom:0.9rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.92rem;">
              <span>F.Sc Pre-Medical</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2018 – 2020</span>
            </div>
            <div style="font-size:0.86rem;color:var(--text-muted);">Govt. Post Graduate College Okara | BISE Sahiwal | Marks: 960/1100 (Grade A+)</div>
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.92rem;">
              <span>Matriculation (Science)</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">2015 – 2017</span>
            </div>
            <div style="font-size:0.86rem;color:var(--text-muted);">Govt High School Chak No. 32/2L Okara | BISE Sahiwal | Marks: 917/1100 (Grade A+)</div>
          </div>
        </div>

        <div>
          <h3 style="color:var(--accent-cyan);font-size:1.05rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border-subtle);padding-bottom:0.25rem;">Teaching Experience</h3>
          <div style="margin-bottom:0.75rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.92rem;">
              <span>Chemistry Lecturer (Matric & Intermediate)</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">Jan 2024 – Feb 2025</span>
            </div>
            <div style="font-size:0.86rem;color:var(--text-muted);">Unique Science Academy & High School (Johar View Campus, Lahore)</div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--text-heading);font-size:0.92rem;">
              <span>Science & Chemistry Teacher</span>
              <span style="font-family:var(--font-mono);color:var(--accent-cyan);">Jan 2019 – Jan 2022</span>
            </div>
            <div style="font-size:0.86rem;color:var(--text-muted);">The Educators (Noor Campus, Moza Joyia, Okara)</div>
          </div>
        </div>

        <div>
          <h3 style="color:var(--accent-cyan);font-size:1.05rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border-subtle);padding-bottom:0.25rem;">Working Research & Manuscripts</h3>
          <ul style="padding-left:1.25rem;font-size:0.86rem;color:var(--text-muted);line-height:1.65;">
            <li><b>Why the Corner Is Empty: Antagonistic Requirements in Re-chargeable Zinc–Air Batteries</b> — Muhammad Kamran Ashraf, Hamda Maqbool, Safeer Ahmed* (Under Review with Supervisor / Journal).</li>
            <li><b>Grafting of Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate: FTIR and DFT Evidence...</b> — Anam Rehman†, Muhammad Kamran Ashraf†*, Hamda Maqbool (Manuscript Completed).</li>
            <li><b>Theoretical Investigation of Cerium Electronic Modulation (Ce3+/Ce4+) on Bimetallic NiCo-MOFs for ORR/OER</b> — Muhammad Kamran Ashraf, Safeer Ahmed, Zahid Rashid (MPhil Thesis Proposal).</li>
          </ul>
        </div>
      </div>
    `;
    openModal("Curriculum Vitae — Muhammad Kamran Ashraf", cvHtml);
  };

  // Plain Text CV Copy for ATS and Applications
  window.copyCVText = function() {
    const text = `MUHAMMAD KAMRAN ASHRAF
Physical Chemist & Computational Researcher · MPhil Scholar
Department of Chemistry, Quaid-i-Azam University, Islamabad 45320, Pakistan
Email: chkamran32b@gmail.com | Phone: +92 307 0325132 | GitHub: https://github.com/Kamran5H

EDUCATION (Reverse Chronological):
• MPhil in Physical Chemistry (4th Semester, Session 2025–2027)
  Quaid-i-Azam University, Islamabad (CGPA: 3.30/4.00)
  Supervisor: Prof. Dr. Safeer Ahmed | Co-supervisor: Dr. Zahid Rashid
• BS (4 Years) in Chemistry (2020–2024)
  School of Chemistry, University of the Punjab, Lahore (CGPA: 2.97/4.00)
• Associate Degree in Science (ADS / B.Sc) (2020–2022)
  Govt. Post Graduate College Okara / University of the Punjab
• F.Sc Pre-Medical (2018–2020)
  BISE Sahiwal (960/1100, Grade A+)
• Matriculation in Science (2015–2017)
  BISE Sahiwal (917/1100, Grade A+)

TEACHING EXPERIENCE:
• Chemistry Lecturer: Unique Science Academy Lahore (Jan 2024 – Feb 2025)
• Science & Chemistry Teacher: The Educators Okara (Jan 2019 – Jan 2022)

WORKING RESEARCH & MANUSCRIPTS:
1. Why the Corner Is Empty: Antagonistic Requirements in Re-chargeable Zinc–Air Batteries (Under Review)
2. Grafting of Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate: FTIR and DFT Evidence (Completed)
3. Theoretical Investigation of Cerium Electronic Modulation (Ce3+/Ce4+) on Bimetallic NiCo-MOFs for ORR/OER (MPhil Thesis Proposal)`;

    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Plain text CV copied to clipboard!');
    }).catch(() => {
      showToast('Clipboard access required');
    });
  };
});
