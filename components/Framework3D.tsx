"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Focus = "all" | "metals" | "cerium" | "linkers";
const FOCUS_COPY: Record<Focus, string> = {
  all: "The complete conceptual framework: metal nodes connected by an organic linker sketch.",
  metals:
    "Nickel, cobalt and cerium nodes are shown together. Their positions and proportions are illustrative.",
  cerium:
    "Gold spheres mark the illustrative cerium sites. This view does not represent a measured dopant concentration.",
  linkers:
    "Carbon and oxygen spheres outline the illustrative organic linkers. This is not a refined atomic structure.",
};

/**
 * A slowly turning Ce-doped NiCo metal–organic framework: metal nodes on a cubic
 * lattice joined by benzene-dicarboxylate (BDC) linkers. Drag or use the turn controls;
 * animation is opt-in and stops when the scene is hidden or off-screen.
 */
export default function Framework3D() {
  const mount = useRef<HTMLDivElement>(null);
  const control = useRef<((paused: boolean) => void) | null>(null);
  const view = useRef<((direction: "left" | "right" | "reset") => void) | null>(
    null,
  );
  const [paused, setPaused] = useState(true);
  const [unsupported, setUnsupported] = useState(false);
  const [focus, setFocus] = useState<Focus>("all");
  const [zoom, setZoom] = useState(100);
  const display = useRef<((focus: Focus, zoom: number) => void) | null>(null);

  useEffect(() => {
    const el = mount.current!;
    const isMobile = window.innerWidth < 768;
    const canvas = document.createElement("canvas");
    const onCreationError = () => setUnsupported(true);
    canvas.addEventListener("webglcontextcreationerror", onCreationError);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? "low-power" : "default",
      });
    } catch {
      canvas.removeEventListener("webglcontextcreationerror", onCreationError);
      return;
    }
    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5),
    );
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const palette = () => getComputedStyle(document.documentElement);
    const fog = new THREE.Fog(
      new THREE.Color(palette().getPropertyValue("--model-bg").trim()),
      9,
      20,
    );
    scene.fog = fog;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    scene.add(new THREE.HemisphereLight(0xfff4e0, 0x1a1712, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(5, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0x9f8055, 1.0, 30);
    rim.position.set(-6, -3, 4);
    scene.add(rim);

    const lattice = new THREE.Group();
    scene.add(lattice);

    const N = 3,
      A = 2.6,
      off = ((N - 1) * A) / 2;
    const atoms: {
      p: THREE.Vector3;
      kind: "Ni" | "Co" | "Ce" | "O" | "C";
      r: number;
    }[] = [];
    const bonds: number[] = [];
    const link = (a: THREE.Vector3, b: THREE.Vector3) =>
      bonds.push(a.x, a.y, a.z, b.x, b.y, b.z);

    // Metal nodes
    const node = (i: number, j: number, k: number) =>
      new THREE.Vector3(i * A - off, j * A - off, k * A - off);
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        for (let k = 0; k < N; k++) {
          const h = (i * 7 + j * 3 + k * 5) % 9;
          atoms.push({
            p: node(i, j, k),
            kind: h === 4 ? "Ce" : h % 2 ? "Co" : "Ni",
            r: h === 4 ? 0.34 : 0.26,
          });
        }

    // BDC linkers along every edge: carboxylate O, then a benzene ring
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        for (let k = 0; k < N; k++) {
          const a = node(i, j, k);
          const dirs: [number, number, number][] = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
          ];
          for (const [di, dj, dk] of dirs) {
            if (i + di >= N || j + dj >= N || k + dk >= N) continue;
            const b = node(i + di, j + dj, k + dk);
            const axis = b.clone().sub(a).normalize();
            const side =
              Math.abs(axis.dot(up)) > 0.9
                ? new THREE.Vector3(1, 0, 0)
                : up.clone();
            const perp = side.cross(axis).normalize();
            const mid = a.clone().lerp(b, 0.5);
            const o1 = a.clone().lerp(b, 0.16),
              o2 = a.clone().lerp(b, 0.84);
            atoms.push(
              { p: o1, kind: "O", r: 0.1 },
              { p: o2, kind: "O", r: 0.1 },
            );
            link(a, o1);
            link(b, o2);
            const ring: THREE.Vector3[] = [];
            for (let s = 0; s < 6; s++) {
              const t = (s / 6) * Math.PI * 2;
              const v = mid
                .clone()
                .addScaledVector(axis, Math.cos(t) * 0.42)
                .addScaledVector(perp, Math.sin(t) * 0.42);
              ring.push(v);
              atoms.push({ p: v, kind: "C", r: 0.085 });
            }
            for (let s = 0; s < 6; s++) link(ring[s], ring[(s + 1) % 6]);
            link(o1, ring[3]);
            link(o2, ring[0]);
          }
        }

    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const textures: THREE.Texture[] = [];

    const COLORS = {
      Ni: 0x3f8069,
      Co: 0x9b5a40,
      Ce: 0xb38c45,
      O: 0x77969b,
      C: 0x525b54,
    };
    const geo = new THREE.SphereGeometry(1, 20, 14);
    geometries.push(geo);

    const atomMeshes = new Map<keyof typeof COLORS, THREE.InstancedMesh>();
    (Object.keys(COLORS) as (keyof typeof COLORS)[]).forEach((kind) => {
      const list = atoms.filter((a) => a.kind === kind);
      const mat = new THREE.MeshStandardMaterial({
        color: COLORS[kind],
        roughness: kind === "C" ? 0.7 : 0.35,
        metalness: kind === "Ce" ? 0.6 : 0.15,
        emissive: kind === "Ce" ? 0x5a3c00 : 0x000000,
      });
      materials.push(mat);
      const mesh = new THREE.InstancedMesh(geo, mat, list.length);
      const m = new THREE.Matrix4();
      list.forEach((a, idx) =>
        mesh.setMatrixAt(idx, m.makeScale(a.r, a.r, a.r).setPosition(a.p)),
      );
      lattice.add(mesh);
      atomMeshes.set(kind, mesh);
    });

    const bondGeo = new THREE.BufferGeometry();
    bondGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(bonds, 3),
    );
    geometries.push(bondGeo);

    const lineMat = new THREE.LineBasicMaterial({
      color: palette().getPropertyValue("--muted").trim(),
      transparent: true,
      opacity: 0.55,
    });
    materials.push(lineMat);
    const bondLines = new THREE.LineSegments(bondGeo, lineMat);
    lattice.add(bondLines);

    // Cerium glow halos
    const glow = document.createElement("canvas");
    glow.width = glow.height = 64;
    const g = glow.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glow);
    textures.push(glowTex);

    const halo = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xd9b45a,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materials.push(halo);
    const halos = new THREE.Group();
    lattice.add(halos);
    atoms
      .filter((a) => a.kind === "Ce")
      .forEach((a) => {
        const s = new THREE.Sprite(halo);
        s.position.copy(a.p);
        s.scale.setScalar(1.6);
        halos.add(s);
      });

    lattice.rotation.set(0.5, 0.6, 0);

    let zoomLevel = 100;
    let lost = false;
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // Fit the ~6-unit lattice to the shorter side of the viewport.
      const fit =
        6.2 /
        Math.tan((camera.fov * Math.PI) / 360) /
        Math.min(1, camera.aspect * 1.4);
      camera.position.z = Math.max(11, fit) / (zoomLevel / 100);
      fog.near = camera.position.z - 4;
      fog.far = camera.position.z + 7;
      camera.updateProjectionMatrix();
      if (!lost) renderer.render(scene, camera);
    };
    display.current = (nextFocus, nextZoom) => {
      zoomLevel = Math.max(80, Math.min(140, nextZoom));
      atomMeshes.forEach((mesh, kind) => {
        mesh.visible =
          nextFocus === "all" ||
          (nextFocus === "metals" && ["Ni", "Co", "Ce"].includes(kind)) ||
          (nextFocus === "cerium" && kind === "Ce") ||
          (nextFocus === "linkers" && ["C", "O"].includes(kind));
      });
      bondLines.visible = nextFocus === "all";
      halos.visible = nextFocus !== "linkers";
      resize();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let raf = 0,
      visible = false,
      t = 0,
      isPaused = true;
    const manual = { y: 0 };
    view.current = (direction) => {
      if (direction === "reset") {
        manual.y = 0;
        t = 0;
        lattice.rotation.set(0.5, 0.6, 0);
      } else {
        manual.y += direction === "left" ? -0.3 : 0.3;
        lattice.rotation.y = 0.6 + t + manual.y;
      }
      if (!lost) renderer.render(scene, camera);
    };
    let dragX: number | null = null;
    const down = (e: PointerEvent) => {
      if (!e.isPrimary || e.button !== 0) return;
      dragX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const drag = (e: PointerEvent) => {
      if (dragX === null) return;
      manual.y += (e.clientX - dragX) * 0.01;
      dragX = e.clientX;
      lattice.rotation.y = 0.6 + t + manual.y;
      if (!lost) renderer.render(scene, camera);
    };
    const upDrag = () => {
      dragX = null;
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", drag);
    canvas.addEventListener("pointerup", upDrag);
    canvas.addEventListener("pointercancel", upDrag);
    canvas.addEventListener("lostpointercapture", upDrag);
    const syncPalette = () => {
      fog.color.set(palette().getPropertyValue("--model-bg").trim());
      lineMat.color.set(palette().getPropertyValue("--muted").trim());
      if (!lost) renderer.render(scene, camera);
    };
    const themeObserver = new MutationObserver(syncPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    let lastFrame: number | null = null;
    const loop = (now: number) => {
      cancelAnimationFrame(raf);
      if (!visible || isPaused || lost || document.hidden) return;
      const elapsed = lastFrame === null ? 0 : Math.min(50, now - lastFrame);
      lastFrame = now;
      t += elapsed * 0.00021;
      lattice.rotation.y = 0.6 + t + manual.y;
      halo.opacity = 0.16 + Math.sin(t * 8) * 0.08;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      lastFrame = null;
      if (visible && !isPaused && !lost && !document.hidden)
        raf = requestAnimationFrame(loop);
    };
    control.current = (next) => {
      isPaused = next;
      sync();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    renderer.render(scene, camera);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
    };
    const onContextRestored = () => {
      lost = false;
      renderer.render(scene, camera);
      sync();
    };
    renderer.domElement.addEventListener(
      "webglcontextlost",
      onContextLost,
      false,
    );
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      onContextRestored,
      false,
    );

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      control.current = null;
      view.current = null;
      display.current = null;
      themeObserver.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", drag);
      canvas.removeEventListener("pointerup", upDrag);
      canvas.removeEventListener("pointercancel", upDrag);
      canvas.removeEventListener("lostpointercapture", upDrag);
      document.removeEventListener("visibilitychange", sync);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        onContextRestored,
      );
      canvas.removeEventListener("webglcontextcreationerror", onCreationError);
      scene.clear();
      lattice.clear();
      halos.clear();
      atomMeshes.forEach((mesh) => mesh.dispose());
      materials.forEach((m) => m.dispose());
      geometries.forEach((g) => g.dispose());
      textures.forEach((tex) => tex.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="framework-explorer">
      <div className="model-viewport">
        <div
          ref={mount}
          aria-hidden="true"
          className="model-canvas h-full w-full"
        />
        {unsupported ? (
          <p className="absolute inset-0 flex items-center justify-center p-8 text-sm text-paper-dim">
            The schematic needs WebGL. Research details are available above.
          </p>
        ) : (
          <div
            className="model-controls"
            role="group"
            aria-label="3D model controls"
          >
            <span className="model-hint">Drag to turn</span>
            <button
              className="model-turn"
              aria-label="Rotate model left"
              onClick={() => view.current?.("left")}
            >
              ←
            </button>
            <button
              className="model-turn"
              aria-label="Rotate model right"
              onClick={() => view.current?.("right")}
            >
              →
            </button>
            <button
              className="model-turn"
              aria-label="Reset model view"
              onClick={() => {
                view.current?.("reset");
                control.current?.(true);
                setPaused(true);
                setFocus("all");
                setZoom(100);
                display.current?.("all", 100);
              }}
            >
              ↺
            </button>
            <button
              className="btn btn-ghost model-animate"
              aria-label={paused ? "Animate schematic" : "Pause animation"}
              aria-pressed={!paused}
              onClick={() => {
                control.current?.(!paused);
                setPaused(!paused);
              }}
            >
              {paused ? "Animate" : "Pause"}
            </button>
          </div>
        )}
      </div>
      {!unsupported && (
        <div className="model-explorer-options">
          <div className="model-view-options">
            <label htmlFor="framework-focus">
              Explore a layer
              <select
                id="framework-focus"
                value={focus}
                onChange={(e) => {
                  const next = e.target.value as Focus;
                  setFocus(next);
                  display.current?.(next, zoom);
                }}
              >
                <option value="all">Complete framework</option>
                <option value="metals">Metal nodes</option>
                <option value="cerium">Cerium sites</option>
                <option value="linkers">Organic linker sketch</option>
              </select>
            </label>
            <label htmlFor="framework-zoom">
              Zoom · {zoom}%
              <input
                id="framework-zoom"
                type="range"
                min="80"
                max="140"
                step="5"
                value={zoom}
                aria-label="Molecular model zoom"
                aria-valuetext={`${zoom} percent of the default view`}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setZoom(next);
                  display.current?.(focus, next);
                }}
              />
            </label>
          </div>
          <p className="caption" role="status">
            {FOCUS_COPY[focus]}
          </p>
          <ul className="model-legend" aria-label="Schematic atom colors">
            <li>
              <span className="atom-ni" aria-hidden="true" />
              Ni · nickel
            </li>
            <li>
              <span className="atom-co" aria-hidden="true" />
              Co · cobalt
            </li>
            <li>
              <span className="atom-ce" aria-hidden="true" />
              Ce · cerium
            </li>
            <li>
              <span className="atom-o" aria-hidden="true" />O · oxygen
            </li>
            <li>
              <span className="atom-c" aria-hidden="true" />C · carbon
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
