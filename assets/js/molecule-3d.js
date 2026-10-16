/* 
  MUHAMMAD KAMRAN ASHRAF — 3D MOLECULAR & CRYSTAL LATTICE VIEWER
  Powered by Three.js (WebGL)
  Visualizing Ce-NiCo MOFs, Urea Imprinted Polymers, CaO Nanoparticles & Orbitals
*/

(function() {
  const container = document.getElementById('molecule-canvas');
  if (!container) return;

  let scene, camera, renderer, currentGroup;
  let isAutoRotating = true;
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let currentPreset = 'mof';
  let isCanvasVisible = true;
  let animationFrameId = null;

  // Check if Three.js and WebGL are available
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (typeof THREE === 'undefined' || !isWebGLAvailable()) {
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;align-items:center;justify-content:center;color:var(--accent-blue);font-family:var(--font-mono);padding:2rem;text-align:center;background:rgba(15,23,42,0.6);border-radius:14px;border:1px solid var(--border-subtle);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="margin-bottom:1rem;">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
        <span style="font-weight:700;font-size:1.05rem;color:var(--text-heading);margin-bottom:0.35rem;">Ce-Doped NiCo-MOF 3D Lattice</span>
        <span style="font-size:0.82rem;color:var(--text-muted);max-width:320px;line-height:1.5;">
          Bimetallic catalytic framework with Cerium (Ce³⁺/Ce⁴⁺) electron modulation nodes.
        </span>
      </div>`;
    return;
  }

  function init() {
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 480;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Balanced academic laboratory lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf1f5f9, 1.4);
    dirLight1.position.set(20, 25, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x94a3b8, 0.9);
    dirLight2.position.set(-20, -20, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 50);
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);

    currentGroup = new THREE.Group();
    scene.add(currentGroup);

    // Build default model: Ce-NiCo MOF
    loadModel('mof');

    // Event Listeners for Interaction
    setupInteraction();

    // IntersectionObserver to freeze GPU loop when off-screen
    setupVisibilityObserver();

    window.addEventListener('resize', onWindowResize);
    startAnimationLoop();
  }

  function clearCurrentModel() {
    while (currentGroup.children.length > 0) {
      const obj = currentGroup.children[0];
      currentGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    }
  }

  // Atom builder utility (optimized polycount)
  function createAtom(x, y, z, radius, color, metalness = 0.35, roughness = 0.25) {
    const geo = new THREE.SphereGeometry(radius, 16, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      metalness: metalness,
      roughness: roughness,
      emissive: color,
      emissiveIntensity: 0.08
    });
    const atom = new THREE.Mesh(geo, mat);
    atom.position.set(x, y, z);
    return atom;
  }

  // Bond builder utility (optimized polycount)
  function createBond(p1, p2, radius = 0.12, color = 0x8899aa) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const geo = new THREE.CylinderGeometry(radius, radius, length, 8);
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.2,
      roughness: 0.5,
      transparent: true,
      opacity: 0.8
    });
    const bond = new THREE.Mesh(geo, mat);

    const orientation = new THREE.Matrix4();
    orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));
    orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    bond.applyMatrix4(orientation);
    bond.position.copy(p1).add(p2).multiplyScalar(0.5);

    return bond;
  }

  /* Model 1: Ce-Doped Bimetallic NiCo-MOF Lattice */
  function buildCeNiCoMOF() {
    clearCurrentModel();
    currentGroup.scale.set(1.1, 1.1, 1.1);

    const atoms = [];
    const size = 6.0;

    // Metal Clusters at 8 cube vertices
    // Colors: Cerium (Amber/Gold #f59e0b), Nickel (Cyan #00f2fe), Cobalt (Purple #a855f7)
    const vertices = [
      { p: [-size, -size, -size], type: 'Ni', color: 0x00f2fe, r: 0.95 },
      { p: [ size, -size, -size], type: 'Co', color: 0xa855f7, r: 0.92 },
      { p: [ size,  size, -size], type: 'Ce', color: 0xf59e0b, r: 1.25 }, // Ce3+/Ce4+ dopant node
      { p: [-size,  size, -size], type: 'Ni', color: 0x00f2fe, r: 0.95 },
      { p: [-size, -size,  size], type: 'Co', color: 0xa855f7, r: 0.92 },
      { p: [ size, -size,  size], type: 'Ni', color: 0x00f2fe, r: 0.95 },
      { p: [ size,  size,  size], type: 'Co', color: 0xa855f7, r: 0.92 },
      { p: [-size,  size,  size], type: 'Ce', color: 0xf59e0b, r: 1.25 }, // Ce dopant node
    ];

    vertices.forEach(v => {
      const atom = createAtom(v.p[0], v.p[1], v.p[2], v.r, v.color, 0.6, 0.2);
      currentGroup.add(atom);
      atoms.push(v);
    });

    // 1,4-Benzenedicarboxylate (BDC) organic linkers along the 12 edges
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    edges.forEach(e => {
      const p1 = new THREE.Vector3(...vertices[e[0]].p);
      const p2 = new THREE.Vector3(...vertices[e[1]].p);

      // Organic Linker cylinder
      currentGroup.add(createBond(p1, p2, 0.16, 0x475569));

      // Benzene ring center carbon nodes on each linker
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const benzeneNode = createAtom(mid.x, mid.y, mid.z, 0.45, 0x94a3b8, 0.2, 0.7);
      currentGroup.add(benzeneNode);

      // Carboxylate Oxygen atoms
      const q1 = new THREE.Vector3().lerpVectors(p1, p2, 0.25);
      const q2 = new THREE.Vector3().lerpVectors(p1, p2, 0.75);
      currentGroup.add(createAtom(q1.x, q1.y, q1.z, 0.38, 0xf43f5e)); // Oxygen
      currentGroup.add(createAtom(q2.x, q2.y, q2.z, 0.38, 0xf43f5e)); // Oxygen
    });

    // Adsorbed ORR/OER Intermediates (*OH, *OOH) near the active Ce/Co sites
    const oohPos1 = new THREE.Vector3(size, size + 2.2, -size);
    const oohPos2 = new THREE.Vector3(size + 1.2, size + 3.2, -size);
    currentGroup.add(createAtom(oohPos1.x, oohPos1.y, oohPos1.z, 0.55, 0xf43f5e)); // O*
    currentGroup.add(createAtom(oohPos2.x, oohPos2.y, oohPos2.z, 0.45, 0x00f2fe)); // H
    currentGroup.add(createBond(new THREE.Vector3(size, size, -size), oohPos1, 0.09, 0xf59e0b));
    currentGroup.add(createBond(oohPos1, oohPos2, 0.08, 0xffffff));

    updateBadgeTitle("Ce-Doped NiCo-MOF (Bifunctional ORR/OER Model)");
  }

  /* Model 2: Urea-Imprinted Cavity & Polyaniline (PANi) */
  function buildUreaPANi() {
    clearCurrentModel();
    currentGroup.scale.set(1.2, 1.2, 1.2);

    // Central Urea Template Molecule: C=O with two NH2
    const ureaC = new THREE.Vector3(0, 0, 0);
    const ureaO = new THREE.Vector3(0, 1.6, 0);
    const ureaN1 = new THREE.Vector3(-1.4, -0.9, 0);
    const ureaN2 = new THREE.Vector3(1.4, -0.9, 0);

    currentGroup.add(createAtom(ureaC.x, ureaC.y, ureaC.z, 0.65, 0x94a3b8)); // C
    currentGroup.add(createAtom(ureaO.x, ureaO.y, ureaO.z, 0.72, 0xf43f5e)); // O (Red)
    currentGroup.add(createAtom(ureaN1.x, ureaN1.y, ureaN1.z, 0.68, 0x3b82f6)); // N1 (Blue)
    currentGroup.add(createAtom(ureaN2.x, ureaN2.y, ureaN2.z, 0.68, 0x3b82f6)); // N2 (Blue)

    currentGroup.add(createBond(ureaC, ureaO, 0.2, 0xf43f5e));
    currentGroup.add(createBond(ureaC, ureaN1, 0.15, 0x3b82f6));
    currentGroup.add(createBond(ureaC, ureaN2, 0.15, 0x3b82f6));

    // Polyaniline (PANi) conducting polymer chain wrapping around creating imprinted cavity
    const ringCenters = [
      new THREE.Vector3(-4.5, 2.5, 0),
      new THREE.Vector3(-3.5, -2.5, 1.5),
      new THREE.Vector3(3.5, -2.5, -1.5),
      new THREE.Vector3(4.5, 2.5, 0),
      new THREE.Vector3(0, 4.2, 1.0)
    ];

    ringCenters.forEach((center, idx) => {
      // Aniline ring representation
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const rx = center.x + Math.cos(angle) * 1.1;
        const ry = center.y + Math.sin(angle) * 1.1;
        const rz = center.z;
        currentGroup.add(createAtom(rx, ry, rz, 0.32, 0x00f2fe, 0.3, 0.5));
      }
      // Dotted Hydrogen bonds to urea
      if (idx === 0) currentGroup.add(createBond(center, ureaN1, 0.05, 0x00f2fe));
      if (idx === 3) currentGroup.add(createBond(center, ureaN2, 0.05, 0x00f2fe));
      if (idx === 4) currentGroup.add(createBond(center, ureaO, 0.05, 0xf43f5e));
    });

    updateBadgeTitle("Urea-Imprinted Cavity in PANi Matrix (Biosensor)");
  }

  /* Model 3: Green-Synthesized CaO Nanocrystal Lattice */
  function buildCaONanocrystal() {
    clearCurrentModel();
    currentGroup.scale.set(1.1, 1.1, 1.1);

    // Rock-salt cubic lattice of CaO
    const dim = 2; // 3x3x3 grid
    const spacing = 2.4;

    for (let x = -dim; x <= dim; x++) {
      for (let y = -dim; y <= dim; y++) {
        for (let z = -dim; z <= dim; z++) {
          const isCa = (x + y + z) % 2 === 0;
          const pos = new THREE.Vector3(x * spacing, y * spacing, z * spacing);

          if (isCa) {
            // Ca2+ Ion (Teal, larger)
            currentGroup.add(createAtom(pos.x, pos.y, pos.z, 0.72, 0x00f2fe, 0.5, 0.2));
          } else {
            // O2- Ion (Red, slightly smaller)
            currentGroup.add(createAtom(pos.x, pos.y, pos.z, 0.58, 0xf43f5e, 0.3, 0.4));
          }

          // Lattice bonds to positive axes
          if (x < dim) currentGroup.add(createBond(pos, new THREE.Vector3((x + 1) * spacing, y * spacing, z * spacing), 0.07, 0x475569));
          if (y < dim) currentGroup.add(createBond(pos, new THREE.Vector3(x * spacing, (y + 1) * spacing, z * spacing), 0.07, 0x475569));
          if (z < dim) currentGroup.add(createBond(pos, new THREE.Vector3(x * spacing, y * spacing, (z + 1) * spacing), 0.07, 0x475569));
        }
      }
    }

    updateBadgeTitle("Plant-Synthesized CaO Crystal Lattice (Jamun-Mediated)");
  }

  /* Model 4: Quantum Electron Orbital Cloud */
  function buildOrbitalCloud() {
    clearCurrentModel();
    currentGroup.scale.set(1.3, 1.3, 1.3);

    // Nucleus
    currentGroup.add(createAtom(0, 0, 0, 1.2, 0xf59e0b, 0.8, 0.1));

    // d-orbital lobes (dx2-y2 and dz2 representation using torus & lobes)
    const lobeGeo = new THREE.SphereGeometry(2.4, 24, 24);
    lobeGeo.scale(1, 2.5, 1);

    const matLobePos = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.45,
      metalness: 0.2,
      roughness: 0.3
    });

    const matLobeNeg = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.45,
      metalness: 0.2,
      roughness: 0.3
    });

    const lobe1 = new THREE.Mesh(lobeGeo, matLobePos);
    lobe1.position.set(0, 3.2, 0);
    currentGroup.add(lobe1);

    const lobe2 = new THREE.Mesh(lobeGeo, matLobeNeg);
    lobe2.position.set(0, -3.2, 0);
    currentGroup.add(lobe2);

    // Torus belt (dz2 doughnut)
    const torusGeo = new THREE.TorusGeometry(3.5, 0.6, 16, 64);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.5,
      wireframe: true
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 2;
    currentGroup.add(torus);

    // Electron particle rings
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 5.5 + Math.random() * 2.5;
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.15,
      transparent: true,
      opacity: 0.75
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    currentGroup.add(particles);

    updateBadgeTitle("DFT Hybridized dz² Orbitals & Electron Density");
  }

  function updateBadgeTitle(text) {
    const badge = document.querySelector('.canvas-title-badge');
    if (badge) badge.innerText = text;
  }

  function loadModel(preset) {
    currentPreset = preset;
    if (preset === 'mof') buildCeNiCoMOF();
    else if (preset === 'urea') buildUreaPANi();
    else if (preset === 'cao') buildCaONanocrystal();
    else if (preset === 'orbital') buildOrbitalCloud();
  }

  function setupInteraction() {
    const dom = renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    dom.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      currentGroup.rotation.y += deltaX * 0.008;
      currentGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support for mobile devices with passive listeners and pinch zoom
    let initialPinchDistance = null;

    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        initialPinchDistance = null;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isDragging = false;
        initialPinchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
      initialPinchDistance = null;
    }, { passive: true });

    dom.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        currentGroup.rotation.y += deltaX * 0.008;
        currentGroup.rotation.x += deltaY * 0.008;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && initialPinchDistance !== null) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = initialPinchDistance - currentDist;
        camera.position.z += diff * 0.05;
        camera.position.z = Math.max(16, Math.min(60, camera.position.z));
        initialPinchDistance = currentDist;
      }
    }, { passive: true });

    // Double click to reset orientation and zoom
    dom.addEventListener('dblclick', () => {
      if (currentGroup) {
        currentGroup.rotation.set(0, 0, 0);
      }
      camera.position.set(0, 0, 32);
    });

    // Mouse wheel zoom
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.03;
      camera.position.z = Math.max(16, Math.min(60, camera.position.z));
    }, { passive: false });

    // Preset button clicks
    const ctrlButtons = document.querySelectorAll('.ctrl-btn');
    ctrlButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        ctrlButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const preset = btn.getAttribute('data-preset');
        loadModel(preset);
      });
    });

    // Pause/Resume button
    const pauseBtn = document.getElementById('btn-canvas-pause');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isAutoRotating = !isAutoRotating;
        pauseBtn.innerText = isAutoRotating ? 'Pause' : 'Resume';
      });
    }
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function setupVisibilityObserver() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible) {
          startAnimationLoop();
        } else {
          stopAnimationLoop();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(container);
  }

  function startAnimationLoop() {
    if (!animationFrameId && isCanvasVisible) {
      animate();
    }
  }

  function stopAnimationLoop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function animate() {
    if (!isCanvasVisible) {
      animationFrameId = null;
      return;
    }
    animationFrameId = requestAnimationFrame(animate);

    if (isAutoRotating && !isDragging && currentGroup) {
      currentGroup.rotation.y += 0.003;
      currentGroup.rotation.x += 0.001;
    }

    renderer.render(scene, camera);
  }

  // Initialize once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
