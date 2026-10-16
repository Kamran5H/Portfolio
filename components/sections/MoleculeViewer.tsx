'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function MoleculeViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPreset, setCurrentPreset] = useState<'mof' | 'urea' | 'cao' | 'orbital'>('mof');
  const [isRotating, setIsRotating] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Balanced academic lighting
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

    const currentGroup = new THREE.Group();
    scene.add(currentGroup);
    groupRef.current = currentGroup;

    // Build initial preset
    loadPreset(currentPreset, currentGroup);

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (isVisibleRef.current) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    function startLoop() {
      if (!animFrameRef.current && isVisibleRef.current) {
        animate();
      }
    }

    function stopLoop() {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    }

    function animate() {
      if (!isVisibleRef.current) {
        animFrameRef.current = null;
        return;
      }
      animFrameRef.current = requestAnimationFrame(animate);

      if (isRotating && !isDraggingRef.current && groupRef.current) {
        groupRef.current.rotation.y += 0.003;
        groupRef.current.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    }

    startLoop();

    // Mouse drag controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !groupRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;
      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z += e.deltaY * 0.03;
      cameraRef.current.position.z = Math.max(16, Math.min(60, cameraRef.current.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const onAppSleep = () => {
      stopLoop();
    };
    const onAppWake = () => {
      if (isVisibleRef.current) {
        startLoop();
      }
    };

    window.addEventListener('app:sleep', onAppSleep);
    window.addEventListener('app:wake', onAppWake);

    return () => {
      observer.disconnect();
      stopLoop();
      window.removeEventListener('app:sleep', onAppSleep);
      window.removeEventListener('app:wake', onAppWake);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  const createAtom = (x: number, y: number, z: number, radius: number, color: number) => {
    const geo = new THREE.SphereGeometry(radius, 16, 16);
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.35,
      roughness: 0.25,
      emissive: color,
      emissiveIntensity: 0.08,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    return mesh;
  };

  const createBond = (p1: THREE.Vector3, p2: THREE.Vector3, radius = 0.12, color = 0x8899aa) => {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const geo = new THREE.CylinderGeometry(radius, radius, length, 8);
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.2,
      roughness: 0.5,
      transparent: true,
      opacity: 0.8,
    });
    const bond = new THREE.Mesh(geo, mat);
    const orientation = new THREE.Matrix4();
    orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));
    orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    bond.applyMatrix4(orientation);
    bond.position.copy(p1).add(p2).multiplyScalar(0.5);
    return bond;
  };

  const loadPreset = (preset: 'mof' | 'urea' | 'cao' | 'orbital', group: THREE.Group) => {
    while (group.children.length > 0) {
      const obj = group.children[0] as THREE.Mesh;
      group.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else (obj.material as THREE.Material).dispose();
      }
    }

    if (preset === 'mof') {
      // Ce-NiCo MOF framework
      const coords = [
        { x: -5, y: -5, z: -5, c: 0x00f2fe, r: 1.2 }, // Ni
        { x: 5, y: -5, z: -5, c: 0x6366f1, r: 1.2 },  // Co
        { x: 5, y: 5, z: -5, c: 0x00f2fe, r: 1.2 },
        { x: -5, y: 5, z: -5, c: 0x6366f1, r: 1.2 },
        { x: -5, y: -5, z: 5, c: 0x6366f1, r: 1.2 },
        { x: 5, y: -5, z: 5, c: 0x00f2fe, r: 1.2 },
        { x: 5, y: 5, z: 5, c: 0x6366f1, r: 1.2 },
        { x: -5, y: 5, z: 5, c: 0x00f2fe, r: 1.2 },
        { x: 0, y: 0, z: 0, c: 0xf59e0b, r: 1.7 },    // Cerium Dopant Node
      ];
      coords.forEach((c) => group.add(createAtom(c.x, c.y, c.z, c.r, c.c)));

      const bonds = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [8, 0], [8, 2], [8, 5], [8, 7],
      ];
      bonds.forEach(([i, j]) => {
        const p1 = new THREE.Vector3(coords[i].x, coords[i].y, coords[i].z);
        const p2 = new THREE.Vector3(coords[j].x, coords[j].y, coords[j].z);
        group.add(createBond(p1, p2, 0.15, 0x94a3b8));
      });
    } else if (preset === 'urea') {
      // Urea [CO(NH2)2] molecule
      const c = createAtom(0, 0, 0, 0.9, 0x475569);
      const o = createAtom(0, 2.3, 0, 1.0, 0xef4444);
      const n1 = createAtom(-2.0, -1.0, 0, 0.95, 0x3b82f6);
      const n2 = createAtom(2.0, -1.0, 0, 0.95, 0x3b82f6);
      const h1 = createAtom(-2.9, -0.6, 0.7, 0.6, 0xffffff);
      const h2 = createAtom(-2.4, -2.1, -0.5, 0.6, 0xffffff);
      const h3 = createAtom(2.9, -0.6, 0.7, 0.6, 0xffffff);
      const h4 = createAtom(2.4, -2.1, -0.5, 0.6, 0xffffff);
      group.add(c, o, n1, n2, h1, h2, h3, h4);

      group.add(createBond(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 2.3, 0), 0.18, 0xef4444));
      group.add(createBond(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-2.0, -1.0, 0), 0.16, 0x3b82f6));
      group.add(createBond(new THREE.Vector3(0, 0, 0), new THREE.Vector3(2.0, -1.0, 0), 0.16, 0x3b82f6));
      group.add(createBond(new THREE.Vector3(-2.0, -1.0, 0), new THREE.Vector3(-2.9, -0.6, 0.7), 0.1, 0xffffff));
      group.add(createBond(new THREE.Vector3(-2.0, -1.0, 0), new THREE.Vector3(-2.4, -2.1, -0.5), 0.1, 0xffffff));
      group.add(createBond(new THREE.Vector3(2.0, -1.0, 0), new THREE.Vector3(2.9, -0.6, 0.7), 0.1, 0xffffff));
      group.add(createBond(new THREE.Vector3(2.0, -1.0, 0), new THREE.Vector3(2.4, -2.1, -0.5), 0.1, 0xffffff));
    } else if (preset === 'cao') {
      // Rock-salt CaO crystal lattice
      const step = 3.5;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const isCa = (x + y + z) % 2 === 0;
            const atom = createAtom(x * step, y * step, z * step, isCa ? 1.0 : 0.8, isCa ? 0x10b981 : 0xef4444);
            group.add(atom);
          }
        }
      }
    } else {
      // d-Orbital dz2 torus and lobes
      const lobe1 = new THREE.Mesh(new THREE.SphereGeometry(2.5, 16, 16), new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 }));
      lobe1.scale.set(0.7, 2.0, 0.7);
      lobe1.position.set(0, 3, 0);

      const lobe2 = lobe1.clone();
      lobe2.position.set(0, -3, 0);

      const torus = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.7, 12, 32), new THREE.MeshStandardMaterial({ color: 0xef4444, transparent: true, opacity: 0.7 }));
      torus.rotation.x = Math.PI / 2;

      group.add(lobe1, lobe2, torus);
    }
  };

  const handlePresetChange = (preset: 'mof' | 'urea' | 'cao' | 'orbital') => {
    setCurrentPreset(preset);
    if (groupRef.current) {
      loadPreset(preset, groupRef.current);
    }
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      <div className="w-full h-[460px] bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md overflow-hidden relative shadow-lg">
        {/* Top Overlay Badge */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] px-2.5 py-1 rounded-full font-mono text-[11px] text-[var(--text-heading)] pointer-events-auto">
            {currentPreset === 'mof' && 'Ce-Doped NiCo-MOF (ORR/OER Model)'}
            {currentPreset === 'urea' && 'Urea Template [CO(NH₂)₂] Molecule'}
            {currentPreset === 'cao' && 'Rock-salt CaO Nanocrystal Lattice'}
            {currentPreset === 'orbital' && 'd-Orbital Electron Density Isosurface'}
          </span>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white px-2.5 py-1 rounded-md text-[11px] font-mono pointer-events-auto transition-colors"
          >
            {isRotating ? 'Pause' : 'Resume'}
          </button>
        </div>

        {/* 3D WebGL Canvas */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] text-[var(--text-faint)] bg-[rgba(0,0,0,0.5)] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap">
          Drag to rotate &bull; Scroll to zoom 3D lattice
        </div>

        {/* Controls */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-1 rounded-full z-10">
          <button
            onClick={() => handlePresetChange('mof')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              currentPreset === 'mof' ? 'bg-[var(--accent-blue)] text-white' : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            Ce-NiCo MOF
          </button>
          <button
            onClick={() => handlePresetChange('urea')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              currentPreset === 'urea' ? 'bg-[var(--accent-blue)] text-white' : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            Urea-PANi
          </button>
          <button
            onClick={() => handlePresetChange('cao')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              currentPreset === 'cao' ? 'bg-[var(--accent-blue)] text-white' : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            CaO NPs
          </button>
          <button
            onClick={() => handlePresetChange('orbital')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              currentPreset === 'orbital' ? 'bg-[var(--accent-blue)] text-white' : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            d-Orbitals
          </button>
        </div>
      </div>
    </div>
  );
}
