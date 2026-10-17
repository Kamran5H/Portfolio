'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * GlobalStage3D: Persistent, full-page WebGL Three.js background canvas.
 * Seamlessly choreographs a 3D journey across the portfolio as the user scrolls:
 *  - Hero: 3D Metallic Monogram ('MKA' / 'KAMRAN') & Authentic Ce-doped NiCo MOF crystal
 *  - Works: Holographic prism rings & rotating data circuits
 *  - Lab: Floating programming syntax tokens ({ }, </>, fn()) & benzene rings
 *  - Research: Quantum ESPRESSO orbital wavefields & crystal lattice planes
 *  - Universal: 350-particle ambient cyber-chemistry constellation reacting to mouse physics
 */
export default function GlobalStage3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(0x070c18, 0.024);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 0, 16);

    // Trackers for materials, geometries, and textures for clean disposal
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const textures: THREE.Texture[] = [];

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xe8f0ff, 0x070c18, 0.7);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(8, 12, 10);
    scene.add(dirLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 2.2, 40);
    emeraldLight.position.set(-6, -2, 6);
    scene.add(emeraldLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 2.0, 35);
    goldLight.position.set(7, 4, 4);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 1.8, 30);
    cyanLight.position.set(0, -8, 8);
    scene.add(cyanLight);

    /* -----------------------------------------------------------
     * ZONE 1: HERO - 3D METALLIC MONOGRAM & Ce-doped NiCo MOF
     * ----------------------------------------------------------- */
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);
    scene.add(heroGroup);

    // 1A. 3D Metallic Monogram Emblem "MKA"
    const emblemGroup = new THREE.Group();
    emblemGroup.position.set(-3.2, 1.2, 2.5);
    heroGroup.add(emblemGroup);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.88,
      roughness: 0.18,
      emissive: 0x0e2418,
    });
    materials.push(metalMat);

    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.92,
      roughness: 0.15,
      emissive: 0x3d2402,
    });
    materials.push(goldMetalMat);

    // Outer decorative faceted ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.05, 16, 64);
    geometries.push(ringGeo);
    const emblemRing = new THREE.Mesh(ringGeo, goldMetalMat);
    emblemGroup.add(emblemRing);

    // Monogram 'M' geometric bars
    const barGeo = new THREE.BoxGeometry(0.12, 1.3, 0.12);
    geometries.push(barGeo);
    const barLeft = new THREE.Mesh(barGeo, metalMat);
    barLeft.position.set(-0.55, 0, 0);
    const barRight = new THREE.Mesh(barGeo, metalMat);
    barRight.position.set(0.55, 0, 0);
    const barCenterL = new THREE.Mesh(barGeo, metalMat);
    barCenterL.position.set(-0.25, 0.1, 0);
    barCenterL.rotation.z = -0.42;
    const barCenterR = new THREE.Mesh(barGeo, metalMat);
    barCenterR.position.set(0.25, 0.1, 0);
    barCenterR.rotation.z = 0.42;
    emblemGroup.add(barLeft, barRight, barCenterL, barCenterR);

    // 1B. Authentic Ce-doped NiCo-MOF Crystal Lattice
    const mofLattice = new THREE.Group();
    mofLattice.position.set(3.4, -0.6, 0);
    heroGroup.add(mofLattice);

    const N = 3, A = 2.4, off = ((N - 1) * A) / 2;
    const atoms: { p: THREE.Vector3; kind: 'Ni' | 'Co' | 'Ce' | 'O' | 'C'; r: number }[] = [];
    const bonds: number[] = [];
    const link = (a: THREE.Vector3, b: THREE.Vector3) => bonds.push(a.x, a.y, a.z, b.x, b.y, b.z);

    const node = (i: number, j: number, k: number) => new THREE.Vector3(i * A - off, j * A - off, k * A - off);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
      const h = (i * 7 + j * 3 + k * 5) % 9;
      atoms.push({ p: node(i, j, k), kind: h === 4 ? 'Ce' : h % 2 ? 'Co' : 'Ni', r: h === 4 ? 0.32 : 0.24 });
    }

    const upVec = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
      const a = node(i, j, k);
      const dirs: [number, number, number][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      for (const [di, dj, dk] of dirs) {
        if (i + di >= N || j + dj >= N || k + dk >= N) continue;
        const b = node(i + di, j + dj, k + dk);
        const axis = b.clone().sub(a).normalize();
        const side = Math.abs(axis.dot(upVec)) > 0.9 ? new THREE.Vector3(1, 0, 0) : upVec.clone();
        const perp = side.cross(axis).normalize();
        const mid = a.clone().lerp(b, 0.5);
        const o1 = a.clone().lerp(b, 0.18), o2 = a.clone().lerp(b, 0.82);
        atoms.push({ p: o1, kind: 'O', r: 0.09 }, { p: o2, kind: 'O', r: 0.09 });
        link(a, o1); link(b, o2);

        const ring: THREE.Vector3[] = [];
        for (let s = 0; s < 6; s++) {
          const t = (s / 6) * Math.PI * 2;
          const v = mid.clone().addScaledVector(axis, Math.cos(t) * 0.38).addScaledVector(perp, Math.sin(t) * 0.38);
          ring.push(v);
          atoms.push({ p: v, kind: 'C', r: 0.08 });
        }
        for (let s = 0; s < 6; s++) link(ring[s], ring[(s + 1) % 6]);
        link(o1, ring[3]); link(o2, ring[0]);
      }
    }

    const sphereGeo = new THREE.SphereGeometry(1, 16, 12);
    geometries.push(sphereGeo);

    const ATOM_COLORS = { Ni: 0x10b981, Co: 0xff5b1f, Ce: 0xf59e0b, O: 0xe2e8f0, C: 0x64748b };
    (Object.keys(ATOM_COLORS) as (keyof typeof ATOM_COLORS)[]).forEach((kind) => {
      const list = atoms.filter((a) => a.kind === kind);
      const mat = new THREE.MeshStandardMaterial({
        color: ATOM_COLORS[kind],
        roughness: kind === 'C' ? 0.6 : 0.28,
        metalness: kind === 'Ce' ? 0.75 : 0.25,
        emissive: kind === 'Ce' ? 0x633d02 : kind === 'Ni' ? 0x032b1d : 0x000000,
      });
      materials.push(mat);
      const mesh = new THREE.InstancedMesh(sphereGeo, mat, list.length);
      const m = new THREE.Matrix4();
      list.forEach((a, idx) => mesh.setMatrixAt(idx, m.makeScale(a.r, a.r, a.r).setPosition(a.p)));
      mofLattice.add(mesh);
    });

    const bondGeo = new THREE.BufferGeometry();
    bondGeo.setAttribute('position', new THREE.Float32BufferAttribute(bonds, 3));
    geometries.push(bondGeo);

    const lineMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.32 });
    materials.push(lineMat);
    mofLattice.add(new THREE.LineSegments(bondGeo, lineMat));

    // Cerium Halo Texture
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = haloCanvas.height = 64;
    const ctx = haloCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(245, 158, 11, 0.9)');
    grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.35)');
    grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const haloTex = new THREE.CanvasTexture(haloCanvas);
    textures.push(haloTex);

    const haloMat = new THREE.SpriteMaterial({
      map: haloTex,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(haloMat);

    atoms.filter((a) => a.kind === 'Ce').forEach((a) => {
      const s = new THREE.Sprite(haloMat);
      s.position.copy(a.p);
      s.scale.setScalar(1.8);
      mofLattice.add(s);
    });

    /* -----------------------------------------------------------
     * ZONE 2: SELECTED WORK - HOLOGRAPHIC PRISM RINGS & CIRCUITS
     * ----------------------------------------------------------- */
    const workGroup = new THREE.Group();
    workGroup.position.set(0, -18, -4);
    scene.add(workGroup);

    const torusGeo1 = new THREE.TorusGeometry(3.6, 0.03, 16, 80);
    const torusGeo2 = new THREE.TorusGeometry(4.8, 0.04, 16, 90);
    geometries.push(torusGeo1, torusGeo2);

    const cyanWireMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.35 });
    const emeraldWireMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.35 });
    materials.push(cyanWireMat, emeraldWireMat);

    const prismRing1 = new THREE.Mesh(torusGeo1, cyanWireMat);
    const prismRing2 = new THREE.Mesh(torusGeo2, emeraldWireMat);
    prismRing1.rotation.x = 1.2;
    prismRing2.rotation.y = 0.8;
    workGroup.add(prismRing1, prismRing2);

    // Orbiting data nodes
    const nodeGeo = new THREE.OctahedronGeometry(0.35, 0);
    geometries.push(nodeGeo);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x042f1f,
    });
    materials.push(nodeMat);

    const workNodes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const m = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / 5) * Math.PI * 2;
      m.position.set(Math.cos(angle) * 4.2, Math.sin(angle) * 2.2, Math.sin(angle * 2) * 1.5);
      workGroup.add(m);
      workNodes.push(m);
    }

    /* -----------------------------------------------------------
     * ZONE 3: LAB - FLOATING CODE SYNTAX TOKENS & BENZENE LINKERS
     * ----------------------------------------------------------- */
    const labGroup = new THREE.Group();
    labGroup.position.set(0, -36, -2);
    scene.add(labGroup);

    // Create 3D curly brace '{' and '}' wireframe geometry
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
      metalness: 0.6,
      roughness: 0.25,
      emissive: 0x02293d,
    });
    materials.push(codeTokenMat);

    const bLeft = new THREE.Mesh(bracketLGeo, codeTokenMat);
    bLeft.position.set(-2.8, 0, 1);
    const bRight = new THREE.Mesh(bracketRGeo, codeTokenMat);
    bRight.position.set(2.8, 0, 1);
    labGroup.add(bLeft, bRight);

    // Floating Benzene 6-Carbon Rings
    const benzeneGroup = new THREE.Group();
    labGroup.add(benzeneGroup);

    const cBondMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 });
    materials.push(cBondMat);

    for (let b = 0; b < 3; b++) {
      const ringPts: THREE.Vector3[] = [];
      const rad = 1.0;
      for (let s = 0; s < 6; s++) {
        const th = (s / 6) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(th) * rad, Math.sin(th) * rad, 0));
      }
      ringPts.push(ringPts[0]); // close loop
      const rGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      geometries.push(rGeo);
      const rLine = new THREE.Line(rGeo, cBondMat);
      rLine.position.set((b - 1) * 3.2, (b % 2 ? 1.4 : -1.2), (b - 1) * 1.5);
      rLine.rotation.set(0.3 * b, 0.4 * b, 0);
      benzeneGroup.add(rLine);
    }

    /* -----------------------------------------------------------
     * ZONE 4: RESEARCH - QUANTUM ESPRESSO ORBITAL WAVEFIELDS
     * ----------------------------------------------------------- */
    const researchGroup = new THREE.Group();
    researchGroup.position.set(0, -54, -3);
    scene.add(researchGroup);

    // Quantum d-band orbital (TorusKnot with wireframe + dielectric core)
    const orbitalGeo = new THREE.TorusKnotGeometry(2.4, 0.45, 100, 16, 2, 3);
    geometries.push(orbitalGeo);

    const orbitalWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const orbitalCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x10b981,
    });
    materials.push(orbitalWireMat, orbitalCoreMat);

    const orbitalMesh = new THREE.Mesh(orbitalGeo, orbitalWireMat);
    const orbitalCore = new THREE.Mesh(orbitalGeo, orbitalCoreMat);
    orbitalCore.scale.setScalar(0.96);
    researchGroup.add(orbitalMesh, orbitalCore);

    // Crystal lattice vector planes
    const gridPlaneGeo = new THREE.PlaneGeometry(10, 10, 10, 10);
    geometries.push(gridPlaneGeo);
    const gridPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    materials.push(gridPlaneMat);
    const gridPlane = new THREE.Mesh(gridPlaneGeo, gridPlaneMat);
    gridPlane.rotation.x = Math.PI / 2;
    gridPlane.position.y = -2.5;
    researchGroup.add(gridPlane);

    /* -----------------------------------------------------------
     * ZONE 5: AMBIENT 350-PARTICLE CYBER-CHEMISTRY STARDUST
     * ----------------------------------------------------------- */
    const particleCount = isMobile ? 120 : 350;
    const particleGeo = new THREE.BufferGeometry();
    geometries.push(particleGeo);

    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const colorChoices = [
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xf59e0b), // Gold
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xf8fafc), // White
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pPositions[i3] = (Math.random() - 0.5) * 26;
      pPositions[i3 + 1] = Math.random() * -65 + 8; // span across entire vertical scroll journey
      pPositions[i3 + 2] = (Math.random() - 0.5) * 22;

      const c = colorChoices[i % colorChoices.length];
      pColors[i3] = c.r;
      pColors[i3 + 1] = c.g;
      pColors[i3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    // Particle Texture circle
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
      size: 0.22,
      vertexColors: true,
      map: pTex,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(particleMat);

    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    /* -----------------------------------------------------------
     * SCROLL & CURSOR PARALLAX CAMERA CHOREOGRAPHY
     * ----------------------------------------------------------- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let currentScroll = 0;
    let targetScroll = 0;

    const onScroll = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const max = Math.max(docHeight - window.innerHeight, 1);
      targetScroll = Math.min(Math.max(window.scrollY / max, 0), 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
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

      // Smooth pointer lerp
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      // Smooth scroll progress lerp
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Camera journey along Y trajectory
      // Progress 0.0 -> Y: 0 (Hero)
      // Progress 0.3 -> Y: -18 (Work)
      // Progress 0.6 -> Y: -36 (Lab)
      // Progress 0.85 -> Y: -54 (Research)
      // Progress 1.0 -> Y: -62 (Contact)
      const targetCamY = -currentScroll * 58;
      camera.position.y += (targetCamY - camera.position.y) * 0.09;

      // Subtle dynamic camera depth and lateral drift
      camera.position.x = Math.sin(currentScroll * Math.PI * 2) * 2.2 + pointer.x * 0.8;
      camera.position.z = 15 - Math.sin(currentScroll * Math.PI) * 2.5 - pointer.y * 0.6;
      camera.lookAt(pointer.x * 0.5, camera.position.y, 0);

      if (!reduceMotion) {
        // Hero MOF slow rotation & Cerium pulse
        mofLattice.rotation.y = 0.6 + clock * 0.35 + pointer.x * 0.3;
        mofLattice.rotation.x = 0.4 + pointer.y * 0.2;
        emblemGroup.rotation.y = -clock * 0.25;
        emblemRing.rotation.z = clock * 0.15;
        haloMat.opacity = 0.25 + Math.sin(clock * 3) * 0.1;

        // Work prism rings
        prismRing1.rotation.z += 0.008;
        prismRing2.rotation.x += 0.006;
        workNodes.forEach((n, idx) => {
          n.rotation.x += 0.02;
          n.rotation.y += 0.02;
          n.position.y += Math.sin(clock * 2 + idx) * 0.005;
        });

        // Lab bracket & benzene floating
        bLeft.rotation.z = Math.sin(clock * 1.5) * 0.08;
        bRight.rotation.z = -Math.sin(clock * 1.5) * 0.08;
        benzeneGroup.rotation.y = clock * 0.2;

        // Research orbital spin
        orbitalMesh.rotation.x = clock * 0.4;
        orbitalMesh.rotation.y = clock * 0.5;
        orbitalCore.rotation.x = -clock * 0.3;
        orbitalCore.rotation.y = -clock * 0.4;

        // Stardust slow drift
        particleField.rotation.y = clock * 0.04 + pointer.x * 0.02;
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
