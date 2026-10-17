'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * GlobalStage3D: Persistent, full-page WebGL Three.js background canvas.
 * Seamlessly choreographs a high-end 3D journey across the portfolio as the user scrolls:
 *  - Zone 1 (Hero): 3D Metallic "K" Gyroscopic Monogram with s/p/d orbital rings & Ce-catalyst nodes
 *  - Zone 2 (Works): Holographic prism rings, energy lasers, & orbiting data octahedra
 *  - Zone 3 (Lab): 3D Code syntax tokens ({ }, </>) & aromatic benzene rings with π-electron clouds
 *  - Zone 4 (Stack & Research): Authentic Quantum ESPRESSO dz² d-band orbital & reciprocal lattice grid
 *  - Zone 5 (Contact / Universe): 350-particle cyber-chemistry constellation reacting to physics
 *
 * Scrutinized for 60 FPS performance, mobile responsive framing, and section-locked keyframing.
 */
export default function GlobalStage3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = width < 768;
    let aspect = width / height;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Renderer setup with battery & retina throttling
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(0x070c18, 0.016);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 140);
    camera.position.set(0, 0, 16);

    // Trackers for memory cleanup
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const textures: THREE.Texture[] = [];

    // Lighting rig (boosted for maximum vibrancy through frosted glass)
    const hemiLight = new THREE.HemisphereLight(0xe2e8f0, 0x070c18, 0.85);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(8, 14, 10);
    scene.add(dirLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 2.8, 50);
    emeraldLight.position.set(-6, -2, 6);
    scene.add(emeraldLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 2.6, 45);
    goldLight.position.set(7, 4, 5);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.4, 40);
    cyanLight.position.set(0, -8, 8);
    scene.add(cyanLight);

    /* -----------------------------------------------------------
     * COMMON TEXTURE ASSETS
     * ----------------------------------------------------------- */
    const makeGlowTexture = (colorStop: string) => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, colorStop);
      grad.addColorStop(0.4, colorStop.replace('1)', '0.35)'));
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      textures.push(tex);
      return tex;
    };

    const goldHaloTex = makeGlowTexture('rgba(245, 158, 11, 1)');
    const emeraldHaloTex = makeGlowTexture('rgba(16, 185, 129, 1)');
    const cyanHaloTex = makeGlowTexture('rgba(6, 182, 212, 1)');

    /* -----------------------------------------------------------
     * ZONE 1: HERO (Y = 0) - 3D METALLIC "KAMRAN" GYROSCOPE MONOGRAM
     * ----------------------------------------------------------- */
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);
    scene.add(heroGroup);

    // 1A. Gyroscopic Armillary Rings
    const gyroGroup = new THREE.Group();
    heroGroup.add(gyroGroup);

    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.94,
      roughness: 0.14,
      emissive: 0x3d2402,
    });
    const platinumMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.88,
      roughness: 0.18,
      emissive: 0x071e16,
    });
    const emeraldMetalMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.85,
      roughness: 0.22,
      emissive: 0x032a1b,
    });
    materials.push(goldMetalMat, platinumMat, emeraldMetalMat);

    // Outer Ring (Gold)
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.045, 16, 72);
    geometries.push(ring1Geo);
    const ringOuter = new THREE.Mesh(ring1Geo, goldMetalMat);
    gyroGroup.add(ringOuter);

    // Middle Ring (Emerald)
    const ring2Geo = new THREE.TorusGeometry(1.6, 0.038, 16, 64);
    geometries.push(ring2Geo);
    const ringMid = new THREE.Mesh(ring2Geo, emeraldMetalMat);
    ringMid.rotation.x = Math.PI / 3;
    gyroGroup.add(ringMid);

    // Inner Ring (Platinum)
    const ring3Geo = new THREE.TorusGeometry(1.3, 0.032, 16, 56);
    geometries.push(ring3Geo);
    const ringInner = new THREE.Mesh(ring3Geo, platinumMat);
    ringInner.rotation.y = Math.PI / 3;
    gyroGroup.add(ringInner);

    // 1B. Sculpted 3D "K" Monogram Emblem (Centerpiece of the Gyroscope)
    const kMonogram = new THREE.Group();
    gyroGroup.add(kMonogram);

    // Vertical spine of 'K'
    const spineGeo = new THREE.BoxGeometry(0.14, 1.25, 0.14);
    geometries.push(spineGeo);
    const spine = new THREE.Mesh(spineGeo, platinumMat);
    spine.position.set(-0.32, 0, 0);

    // Upper diagonal arm of 'K'
    const armUpGeo = new THREE.BoxGeometry(0.12, 0.82, 0.12);
    geometries.push(armUpGeo);
    const armUp = new THREE.Mesh(armUpGeo, goldMetalMat);
    armUp.position.set(0.08, 0.32, 0);
    armUp.rotation.z = -0.72;

    // Lower diagonal arm of 'K'
    const armDownGeo = new THREE.BoxGeometry(0.12, 0.86, 0.12);
    geometries.push(armDownGeo);
    const armDown = new THREE.Mesh(armDownGeo, goldMetalMat);
    armDown.position.set(0.1, -0.32, 0);
    armDown.rotation.z = 0.72;

    kMonogram.add(spine, armUp, armDown);

    // 1C. Orbiting Catalyst Active-Site Polyhedra (Ce / Ni / Co cluster nodes)
    const catalystGroup = new THREE.Group();
    heroGroup.add(catalystGroup);

    const octaGeo = new THREE.OctahedronGeometry(0.24, 0);
    const tetraGeo = new THREE.TetrahedronGeometry(0.22, 0);
    geometries.push(octaGeo, tetraGeo);

    const ceMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x5a3903,
    });
    const niMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x053020,
    });
    const coMat = new THREE.MeshStandardMaterial({
      color: 0xff5b1f,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x4d1604,
    });
    materials.push(ceMat, niMat, coMat);

    const nodes: { mesh: THREE.Mesh; rad: number; speed: number; phase: number; incl: number }[] = [
      { mesh: new THREE.Mesh(octaGeo, ceMat), rad: 2.7, speed: 0.65, phase: 0, incl: 0.3 },
      { mesh: new THREE.Mesh(tetraGeo, niMat), rad: 3.1, speed: -0.5, phase: 2.1, incl: -0.4 },
      { mesh: new THREE.Mesh(tetraGeo, coMat), rad: 2.4, speed: 0.75, phase: 4.2, incl: 0.5 },
    ];
    nodes.forEach((n) => {
      catalystGroup.add(n.mesh);
    });

    // Golden halo around Ce cluster
    const haloMat = new THREE.SpriteMaterial({
      map: goldHaloTex,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(haloMat);
    const ceHalo = new THREE.Sprite(haloMat);
    ceHalo.scale.setScalar(1.5);
    nodes[0].mesh.add(ceHalo);

    /* -----------------------------------------------------------
     * ZONE 2: SELECTED WORK (Y = -18) - HOLOGRAPHIC PRISM RINGS & CIRCUITS
     * ----------------------------------------------------------- */
    const workGroup = new THREE.Group();
    workGroup.position.set(0, -18, -3.5);
    scene.add(workGroup);

    const torusGeo1 = new THREE.TorusGeometry(3.6, 0.03, 16, 80);
    const torusGeo2 = new THREE.TorusGeometry(4.8, 0.04, 16, 90);
    geometries.push(torusGeo1, torusGeo2);

    const cyanWireMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.45 });
    const emeraldWireMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.45 });
    materials.push(cyanWireMat, emeraldWireMat);

    const prismRing1 = new THREE.Mesh(torusGeo1, cyanWireMat);
    const prismRing2 = new THREE.Mesh(torusGeo2, emeraldWireMat);
    prismRing1.rotation.x = 1.15;
    prismRing2.rotation.y = 0.85;
    workGroup.add(prismRing1, prismRing2);

    // Orbiting data nodes with laser trace bonds
    const workNodes: THREE.Mesh[] = [];
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      metalness: 0.85,
      roughness: 0.18,
      emissive: 0x042f1f,
    });
    materials.push(nodeMat);

    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(octaGeo, nodeMat);
      workGroup.add(m);
      workNodes.push(m);
    }

    // Dynamic laser circuit beam line between work nodes
    const beamGeo = new THREE.BufferGeometry();
    const beamCoords = new Float32Array(6 * 3);
    beamGeo.setAttribute('position', new THREE.BufferAttribute(beamCoords, 3));
    geometries.push(beamGeo);

    const beamMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    materials.push(beamMat);
    const beamLine = new THREE.LineLoop(beamGeo, beamMat);
    workGroup.add(beamLine);

    /* -----------------------------------------------------------
     * ZONE 3: LAB (Y = -36) - 3D CODE SYNTAX & AROMATIC BENZENE LINKERS
     * ----------------------------------------------------------- */
    const labGroup = new THREE.Group();
    labGroup.position.set(0, -36, -2.5);
    scene.add(labGroup);

    // 3A. 3D Curly Braces '{' and '}'
    const makeBracketGeo = (flip = 1) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.5 * flip, 1.4, 0),
        new THREE.Vector3(0.15 * flip, 1.2, 0),
        new THREE.Vector3(0.15 * flip, 0.4, 0),
        new THREE.Vector3(-0.25 * flip, 0, 0),
        new THREE.Vector3(0.15 * flip, -0.4, 0),
        new THREE.Vector3(0.15 * flip, -1.2, 0),
        new THREE.Vector3(0.5 * flip, -1.4, 0),
      ]);
      return new THREE.TubeGeometry(curve, 32, 0.05, 8, false);
    };

    const bracketLGeo = makeBracketGeo(1);
    const bracketRGeo = makeBracketGeo(-1);
    geometries.push(bracketLGeo, bracketRGeo);

    const codeTokenMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.7,
      roughness: 0.22,
      emissive: 0x02293d,
    });
    materials.push(codeTokenMat);

    const bLeft = new THREE.Mesh(bracketLGeo, codeTokenMat);
    const bRight = new THREE.Mesh(bracketRGeo, codeTokenMat);
    labGroup.add(bLeft, bRight);

    // 3B. Floating Benzene 6-Carbon Rings with Delocalized π-Electron Circles
    const benzeneGroup = new THREE.Group();
    labGroup.add(benzeneGroup);

    const cBondMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 });
    const piCloudMat = new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.45 });
    materials.push(cBondMat, piCloudMat);

    for (let b = 0; b < 3; b++) {
      const bRing = new THREE.Group();
      const ringPts: THREE.Vector3[] = [];
      const rad = 1.05;
      for (let s = 0; s < 6; s++) {
        const th = (s / 6) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(th) * rad, Math.sin(th) * rad, 0));
      }
      ringPts.push(ringPts[0]);
      const rGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      geometries.push(rGeo);
      bRing.add(new THREE.Line(rGeo, cBondMat));

      // Inner aromatic delocalized π-cloud circle
      const piPts: THREE.Vector3[] = [];
      const piRad = 0.62;
      for (let s = 0; s < 32; s++) {
        const th = (s / 32) * Math.PI * 2;
        piPts.push(new THREE.Vector3(Math.cos(th) * piRad, Math.sin(th) * piRad, 0));
      }
      piPts.push(piPts[0]);
      const piGeo = new THREE.BufferGeometry().setFromPoints(piPts);
      geometries.push(piGeo);
      bRing.add(new THREE.Line(piGeo, piCloudMat));

      bRing.position.set((b - 1) * 3.4, (b % 2 ? 1.4 : -1.2), (b - 1) * 1.6);
      bRing.rotation.set(0.3 * b, 0.4 * b, 0);
      benzeneGroup.add(bRing);
    }

    /* -----------------------------------------------------------
     * ZONE 4: STACK & RESEARCH (Y = -50 to -54) - QUANTUM ESPRESSO dz² ORBITAL
     * ----------------------------------------------------------- */
    const researchGroup = new THREE.Group();
    researchGroup.position.set(0, -52, -3);
    scene.add(researchGroup);

    // 4A. Authentic dz² d-Orbital (Vertical Lobes + Equatorial Torus Ring)
    const dz2Group = new THREE.Group();
    researchGroup.add(dz2Group);

    const lobeGeo = new THREE.SphereGeometry(0.85, 24, 18);
    geometries.push(lobeGeo);
    const orbitalGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x4a2c03,
      transparent: true,
      opacity: 0.85,
    });
    materials.push(orbitalGoldMat);

    // Upper lobe of dz²
    const lobeTop = new THREE.Mesh(lobeGeo, orbitalGoldMat);
    lobeTop.scale.set(0.7, 1.4, 0.7);
    lobeTop.position.set(0, 1.25, 0);

    // Lower lobe of dz²
    const lobeBottom = new THREE.Mesh(lobeGeo, orbitalGoldMat);
    lobeBottom.scale.set(0.7, 1.4, 0.7);
    lobeBottom.position.set(0, -1.25, 0);

    // Equatorial donut (torus) ring of dz²
    const torusDonutGeo = new THREE.TorusGeometry(1.2, 0.28, 20, 60);
    geometries.push(torusDonutGeo);
    const donutMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.9,
      roughness: 0.18,
      emissive: 0x053020,
      transparent: true,
      opacity: 0.85,
    });
    materials.push(donutMat);
    const donut = new THREE.Mesh(torusDonutGeo, donutMat);
    donut.rotation.x = Math.PI / 2;

    dz2Group.add(lobeTop, lobeBottom, donut);

    // 4B. Torus Knot Wavefield Shell surrounding orbital
    const orbitalGeo = new THREE.TorusKnotGeometry(2.6, 0.38, 100, 16, 2, 3);
    geometries.push(orbitalGeo);

    const orbitalWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    materials.push(orbitalWireMat);
    const orbitalMesh = new THREE.Mesh(orbitalGeo, orbitalWireMat);
    researchGroup.add(orbitalMesh);

    // 4C. Reciprocal Lattice Brillouin Plane Grid (representing k-points)
    const gridPlaneGeo = new THREE.PlaneGeometry(12, 12, 12, 12);
    geometries.push(gridPlaneGeo);
    const gridPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    materials.push(gridPlaneMat);
    const gridPlane = new THREE.Mesh(gridPlaneGeo, gridPlaneMat);
    gridPlane.rotation.x = Math.PI / 2;
    gridPlane.position.y = -3.2;
    researchGroup.add(gridPlane);

    /* -----------------------------------------------------------
     * ZONE 5: AMBIENT 350-PARTICLE CYBER-CHEMISTRY CONSTELLATION
     * ----------------------------------------------------------- */
    const particleCount = isMobile ? 130 : 350;
    const particleGeo = new THREE.BufferGeometry();
    geometries.push(particleGeo);

    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xf59e0b), // Gold
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xf8fafc), // Platinum
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pPositions[i3] = (Math.random() - 0.5) * 28;
      pPositions[i3 + 1] = Math.random() * -72 + 8; // span the entire scroll journey: top to contact footer
      pPositions[i3 + 2] = (Math.random() - 0.5) * 22;

      const c = colorPalette[i % colorPalette.length];
      pColors[i3] = c.r;
      pColors[i3 + 1] = c.g;
      pColors[i3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d')!;
    pCtx.beginPath();
    pCtx.arc(16, 16, 14, 0, Math.PI * 2);
    pCtx.fillStyle = '#ffffff';
    pCtx.fill();
    const pTex = new THREE.CanvasTexture(pCanvas);
    textures.push(pTex);

    const particleMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      map: pTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(particleMat);

    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    /* -----------------------------------------------------------
     * SECTION-LOCKED SCROLL PROGRESS & RESPONSIVE FRAMING
     * ----------------------------------------------------------- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let currentCamY = 0;
    let targetCamY = 0;
    let currentScrollRatio = 0;
    let latestScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let cachedOffsets: { id: string; camY: number; top: number }[] = [];
    let cachedMaxScroll = 1;
    let cachedWindowH = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Synchronize 3D zones precisely with document section offsets
    const sectionTargets: { id: string; camY: number }[] = [
      { id: 'top', camY: 0 },
      { id: 'work', camY: -18 },
      { id: 'lab', camY: -36 },
      { id: 'stack', camY: -46 },
      { id: 'research', camY: -52 },
      { id: 'contact', camY: -64 },
    ];

    // Measure section offsets once on mount/resize — NEVER on scroll
    const measureSectionOffsets = () => {
      cachedWindowH = window.innerHeight;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      cachedMaxScroll = Math.max(docHeight - cachedWindowH, 1);
      cachedOffsets = sectionTargets.map((s) => {
        const dom = document.getElementById(s.id);
        return {
          id: s.id,
          camY: s.camY,
          top: dom ? dom.offsetTop : 0,
        };
      });
    };
    measureSectionOffsets();

    // Re-measure after fonts and dynamic elements settle
    const settleTimer = setTimeout(measureSectionOffsets, 400);

    // Frictionless scroll listener: 0 DOM queries, 0 reflows, purely records scroll offset
    const onScroll = () => {
      latestScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Responsive layout adapter
    const adaptLayout = (w: number, h: number) => {
      width = w;
      height = h;
      aspect = w / h;
      isMobile = w < 768;

      renderer.setSize(w, h);
      camera.aspect = aspect;

      // Adjust camera distance and group scale on mobile portrait so 3D elements are never clipped
      if (aspect < 1.0) {
        const mobileScale = Math.min(1.0, Math.max(0.68, aspect / 1.15));
        camera.position.z = 17;
        
        // Center hero monogram above typography
        gyroGroup.position.set(0, 2.6, 0);
        gyroGroup.scale.setScalar(mobileScale * 0.9);
        catalystGroup.position.set(0, 2.6, 0);
        catalystGroup.scale.setScalar(mobileScale * 0.9);

        // Compact lab brackets
        bLeft.position.set(-1.6, 0, 1);
        bRight.position.set(1.6, 0, 1);
        bLeft.scale.setScalar(mobileScale);
        bRight.scale.setScalar(mobileScale);

        workGroup.scale.setScalar(mobileScale);
        researchGroup.scale.setScalar(mobileScale);
      } else {
        camera.position.z = 15;

        // Desktop layout: Monogram crowns left hero column
        gyroGroup.position.set(-3.2, 0.8, 2.5);
        gyroGroup.scale.setScalar(1.0);
        catalystGroup.position.set(-3.2, 0.8, 2.5);
        catalystGroup.scale.setScalar(1.0);

        // Full lab brackets
        bLeft.position.set(-2.8, 0, 1);
        bRight.position.set(2.8, 0, 1);
        bLeft.scale.setScalar(1.0);
        bRight.scale.setScalar(1.0);

        workGroup.scale.setScalar(1.0);
        researchGroup.scale.setScalar(1.0);
      }

      camera.updateProjectionMatrix();
    };
    adaptLayout(window.innerWidth, window.innerHeight);

    const onResize = () => {
      adaptLayout(window.innerWidth, window.innerHeight);
      measureSectionOffsets();
    };
    window.addEventListener('resize', onResize);

    /* -----------------------------------------------------------
     * MAIN ANIMATION LOOP
     * ----------------------------------------------------------- */
    let raf = 0;
    let clock = 0;
    let isVisible = true;

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !reduceMotion) tickLoop();
    });
    io.observe(el);

    const tickLoop = () => {
      cancelAnimationFrame(raf);
      if (!isVisible) return;

      clock += 0.012;

      // Pointer lerp spring
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      // Update camera target smoothly from cached section positions (zero DOM reflows)
      if (cachedOffsets.length > 0) {
        currentScrollRatio = Math.min(Math.max(latestScrollY / cachedMaxScroll, 0), 1);
        const scrollMid = latestScrollY + cachedWindowH * 0.35;

        if (scrollMid <= cachedOffsets[0].top) {
          targetCamY = cachedOffsets[0].camY;
        } else if (scrollMid >= cachedOffsets[cachedOffsets.length - 1].top) {
          targetCamY = cachedOffsets[cachedOffsets.length - 1].camY;
        } else {
          for (let i = 0; i < cachedOffsets.length - 1; i++) {
            const cur = cachedOffsets[i];
            const nxt = cachedOffsets[i + 1];
            if (scrollMid >= cur.top && scrollMid < nxt.top) {
              const span = nxt.top - cur.top;
              const p = span > 0 ? (scrollMid - cur.top) / span : 0;
              const t = p * p * (3 - 2 * p);
              targetCamY = cur.camY + (nxt.camY - cur.camY) * t;
              break;
            }
          }
        }
      }

      // Responsive, brisk camera lerp tracking scroll targets without drag
      currentCamY += (targetCamY - currentCamY) * 0.18;
      camera.position.y = currentCamY;

      // Subtle dynamic camera depth and lateral drift
      camera.position.x = Math.sin(currentScrollRatio * Math.PI * 2) * 1.8 + pointer.x * 0.7;
      camera.lookAt(pointer.x * 0.4, camera.position.y, 0);

      if (!reduceMotion) {
        // Hero Gyroscope & K Monogram
        ringOuter.rotation.z = clock * 0.25;
        ringMid.rotation.x = clock * 0.35;
        ringMid.rotation.y = clock * 0.2;
        ringInner.rotation.y = -clock * 0.4;
        kMonogram.rotation.y = -clock * 0.18 + pointer.x * 0.3;

        // Catalyst Nodes Orbit
        nodes.forEach((n) => {
          const t = clock * n.speed + n.phase;
          n.mesh.position.set(
            Math.cos(t) * n.rad,
            Math.sin(t) * n.rad * 0.6 + Math.sin(t * 2) * n.incl,
            Math.sin(t) * n.rad * 0.8
          );
          n.mesh.rotation.x += 0.02;
          n.mesh.rotation.y += 0.02;
        });

        // Work Prism Rings
        prismRing1.rotation.z += 0.007;
        prismRing2.rotation.x += 0.005;

        // Work nodes orbit & laser circuit update
        const posAttr = beamGeo.getAttribute('position') as THREE.BufferAttribute;
        workNodes.forEach((n, idx) => {
          const angle = (idx / 6) * Math.PI * 2 + clock * 0.2;
          const x = Math.cos(angle) * 4.2;
          const y = Math.sin(angle) * 2.2;
          const z = Math.sin(angle * 2) * 1.4;
          n.position.set(x, y, z);
          n.rotation.x += 0.02;
          n.rotation.y += 0.02;

          posAttr.setXYZ(idx, x, y, z);
        });
        posAttr.needsUpdate = true;

        // Lab Brackets & Benzene Rings
        bLeft.rotation.z = Math.sin(clock * 1.4) * 0.06;
        bRight.rotation.z = -Math.sin(clock * 1.4) * 0.06;
        benzeneGroup.rotation.y = clock * 0.22;

        // Research dz² orbital & torus knot
        dz2Group.rotation.y = clock * 0.45 + pointer.x * 0.3;
        dz2Group.rotation.z = Math.sin(clock * 0.8) * 0.15;
        orbitalMesh.rotation.x = clock * 0.35;
        orbitalMesh.rotation.y = clock * 0.45;

        // Constellation stardust slow drift
        particleField.rotation.y = clock * 0.03 + pointer.x * 0.02;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tickLoop);
    };

    // Initial render
    renderer.render(scene, camera);
    if (!reduceMotion) tickLoop();

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);

    return () => {
      clearTimeout(settleTimer);
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);

      materials.forEach((m) => m.dispose());
      geometries.forEach((g) => g.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
