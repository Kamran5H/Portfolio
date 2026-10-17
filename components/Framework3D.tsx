'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * A slowly turning Ce-doped NiCo metal–organic framework: metal nodes on a cubic
 * lattice joined by benzene-dicarboxylate (BDC) linkers. Drag-free — it leans toward the cursor.
 */
export default function Framework3D() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current!;
    const isMobile = window.innerWidth < 768;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? 'low-power' : 'default',
    });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0x0f0f0d, 9, 20);
    scene.fog = fog;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    scene.add(new THREE.HemisphereLight(0xfff4e0, 0x1a1712, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(5, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0xff5b1f, 1.4, 30);
    rim.position.set(-6, -3, 4);
    scene.add(rim);

    const lattice = new THREE.Group();
    scene.add(lattice);

    const N = 3, A = 2.6, off = ((N - 1) * A) / 2;
    const atoms: { p: THREE.Vector3; kind: 'Ni' | 'Co' | 'Ce' | 'O' | 'C'; r: number }[] = [];
    const bonds: number[] = [];
    const link = (a: THREE.Vector3, b: THREE.Vector3) => bonds.push(a.x, a.y, a.z, b.x, b.y, b.z);

    // Metal nodes
    const node = (i: number, j: number, k: number) => new THREE.Vector3(i * A - off, j * A - off, k * A - off);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
      const h = (i * 7 + j * 3 + k * 5) % 9;
      atoms.push({ p: node(i, j, k), kind: h === 4 ? 'Ce' : h % 2 ? 'Co' : 'Ni', r: h === 4 ? 0.34 : 0.26 });
    }

    // BDC linkers along every edge: carboxylate O, then a benzene ring
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
      const a = node(i, j, k);
      const dirs: [number, number, number][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      for (const [di, dj, dk] of dirs) {
        if (i + di >= N || j + dj >= N || k + dk >= N) continue;
        const b = node(i + di, j + dj, k + dk);
        const axis = b.clone().sub(a).normalize();
        const side = Math.abs(axis.dot(up)) > 0.9 ? new THREE.Vector3(1, 0, 0) : up.clone();
        const perp = side.cross(axis).normalize();
        const mid = a.clone().lerp(b, 0.5);
        const o1 = a.clone().lerp(b, 0.16), o2 = a.clone().lerp(b, 0.84);
        atoms.push({ p: o1, kind: 'O', r: 0.1 }, { p: o2, kind: 'O', r: 0.1 });
        link(a, o1); link(b, o2);
        const ring: THREE.Vector3[] = [];
        for (let s = 0; s < 6; s++) {
          const t = (s / 6) * Math.PI * 2;
          const v = mid.clone().addScaledVector(axis, Math.cos(t) * 0.42).addScaledVector(perp, Math.sin(t) * 0.42);
          ring.push(v);
          atoms.push({ p: v, kind: 'C', r: 0.085 });
        }
        for (let s = 0; s < 6; s++) link(ring[s], ring[(s + 1) % 6]);
        link(o1, ring[3]); link(o2, ring[0]);
      }
    }

    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const textures: THREE.Texture[] = [];

    const COLORS = { Ni: 0x8fbf6a, Co: 0xff5b1f, Ce: 0xd9b45a, O: 0xece8df, C: 0x6f6a60 };
    const geo = new THREE.SphereGeometry(1, 20, 14);
    geometries.push(geo);

    (Object.keys(COLORS) as (keyof typeof COLORS)[]).forEach((kind) => {
      const list = atoms.filter((a) => a.kind === kind);
      const mat = new THREE.MeshStandardMaterial({
        color: COLORS[kind], roughness: kind === 'C' ? 0.7 : 0.35, metalness: kind === 'Ce' ? 0.6 : 0.15,
        emissive: kind === 'Ce' ? 0x5a3c00 : 0x000000,
      });
      materials.push(mat);
      const mesh = new THREE.InstancedMesh(geo, mat, list.length);
      const m = new THREE.Matrix4();
      list.forEach((a, idx) => mesh.setMatrixAt(idx, m.makeScale(a.r, a.r, a.r).setPosition(a.p)));
      lattice.add(mesh);
    });

    const bondGeo = new THREE.BufferGeometry();
    bondGeo.setAttribute('position', new THREE.Float32BufferAttribute(bonds, 3));
    geometries.push(bondGeo);

    const lineMat = new THREE.LineBasicMaterial({ color: 0xa9a397, transparent: true, opacity: 0.35 });
    materials.push(lineMat);
    lattice.add(new THREE.LineSegments(bondGeo, lineMat));

    // Cerium glow halos
    const glow = document.createElement('canvas');
    glow.width = glow.height = 64;
    const g = glow.getContext('2d')!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glow);
    textures.push(glowTex);

    const halo = new THREE.SpriteMaterial({ map: glowTex, color: 0xd9b45a, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending });
    materials.push(halo);
    atoms.filter((a) => a.kind === 'Ce').forEach((a) => { const s = new THREE.Sprite(halo); s.position.copy(a.p); s.scale.setScalar(1.6); lattice.add(s); });

    lattice.rotation.set(0.5, 0.6, 0);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // Fit the ~6-unit lattice to the shorter side of the viewport.
      const fit = 6.2 / Math.tan((camera.fov * Math.PI) / 360) / Math.min(1, camera.aspect * 1.4);
      camera.position.z = Math.max(11, fit);
      fog.near = camera.position.z - 4;
      fog.far = camera.position.z + 7;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const target = { x: 0, y: 0 };
    const move = (e: PointerEvent) => { target.x = (e.clientX / window.innerWidth - 0.5) * 0.8; target.y = (e.clientY / window.innerHeight - 0.5) * 0.6; };
    window.addEventListener('pointermove', move, { passive: true });

    let raf = 0, visible = true, t = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) loop(); });
    io.observe(el);
    const loop = () => {
      cancelAnimationFrame(raf);
      if (!visible) return;
      t += 0.0035;
      lattice.rotation.y = 0.6 + t + target.x;
      lattice.rotation.x += (0.5 + target.y - lattice.rotation.x) * 0.04;
      halo.opacity = 0.16 + Math.sin(t * 8) * 0.08;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    renderer.render(scene, camera);
    if (!reduce) loop();

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', move);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      materials.forEach((m) => m.dispose());
      geometries.forEach((g) => g.dispose());
      textures.forEach((tex) => tex.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mount} aria-hidden className="h-full w-full pointer-events-none" />;
}
