"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

export default function StudioScene({
  journeyRef,
  positionRef,
  onUnavailable,
}: {
  journeyRef: MutableRefObject<((position: number) => void) | null>;
  positionRef: MutableRefObject<number>;
  onUnavailable: () => void;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const failure = useRef(onUnavailable);
  useEffect(() => {
    failure.current = onUnavailable;
  }, [onUnavailable]);
  useEffect(() => {
    const el = mount.current!;
    const canvas = document.createElement("canvas");
    let disposed = false;
    const fail = () => {
      if (!disposed) failure.current();
    };
    canvas.addEventListener("webglcontextcreationerror", fail);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      queueMicrotask(fail);
      return () => {
        disposed = true;
        canvas.removeEventListener("webglcontextcreationerror", fail);
      };
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 160);
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];
    const material = (
      color: THREE.ColorRepresentation,
      roughness = 0.7,
      metalness = 0.05,
    ) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
      });
      materials.push(mat);
      return mat;
    };
    const plaster = material(0xe5dfcf),
      stone = material(0xc5bdaa),
      oak = material(0x9c7752),
      sage = material(0x426c5b),
      brass = material(0xc9a468, 0.35, 0.65),
      ink = material(0x26372f),
      paper = material(0xf5f0df),
      copper = material(0xb47152, 0.4, 0.35),
      glass = material(0x9eb9ad, 0.24, 0.2);
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1),
      cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 32),
      sphereGeometry = new THREE.SphereGeometry(1, 16, 12);
    geometries.push(boxGeometry, cylinderGeometry, sphereGeometry);
    const box = (
      group: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number,
      mat: THREE.Material,
    ) => {
      const mesh = new THREE.Mesh(boxGeometry, mat);
      mesh.position.set(x, y, z);
      mesh.scale.set(w, h, d);
      group.add(mesh);
      return mesh;
    };
    const cylinder = (
      group: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      r: number,
      h: number,
      mat: THREE.Material,
    ) => {
      const mesh = new THREE.Mesh(cylinderGeometry, mat);
      mesh.position.set(x, y, z);
      mesh.scale.set(r, h, r);
      group.add(mesh);
      return mesh;
    };
    const sphere = (
      group: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      r: number,
      mat: THREE.Material,
    ) => {
      const mesh = new THREE.Mesh(sphereGeometry, mat);
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(r);
      group.add(mesh);
      return mesh;
    };
    const label = (
      group: THREE.Object3D,
      text: string,
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      background = "#f0ecdf",
      color = "#344d40",
    ) => {
      const sheet = document.createElement("canvas");
      sheet.width = 768;
      sheet.height = 384;
      const ctx = sheet.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, 768, 384);
      ctx.fillStyle = color;
      ctx.font = "30px Georgia";
      ctx.fillText("K / RESEARCH STUDIO", 48, 65);
      ctx.fillRect(48, 95, 672, 2);
      ctx.font = "46px Georgia";
      text
        .split("\n")
        .forEach((line, i) => ctx.fillText(line, 48, 175 + i * 65));
      const tex = new THREE.CanvasTexture(sheet);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      textures.push(tex);
      const mat = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
      materials.push(mat);
      const geo = new THREE.PlaneGeometry(w, h);
      geometries.push(geo);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      group.add(mesh);
      return mesh;
    };
    const plant = (group: THREE.Object3D, x: number, z: number, scale = 1) => {
      cylinder(group, x, -0.35, z, 0.38 * scale, 0.75, stone);
      cylinder(group, x, 0.5, z, 0.035, 1.2, brass);
      for (let i = 0; i < 7; i++) {
        const a = i * 2.4;
        const leaf = sphere(
          group,
          x + Math.cos(a) * 0.25 * scale,
          0.65 + i * 0.12,
          z + Math.sin(a) * 0.25 * scale,
          0.25 * scale,
          sage,
        );
        leaf.scale.set(0.22 * scale, 0.5 * scale, 0.13 * scale);
        leaf.rotation.z = Math.cos(a) * 0.6;
      }
    };
    const book = (
      group: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      mat: THREE.Material,
    ) => {
      box(group, x, y, z, w, h, 0.6, mat);
      box(group, x, y + h * 0.3, z + 0.307, w * 0.65, 0.025, 0.012, brass);
    };
    const desk = (group: THREE.Object3D, x = 1.8, z = 0.5) => {
      box(group, x, 0.65, z, 4.8, 0.22, 2, oak);
      for (const dx of [-2, 2])
        for (const dz of [-0.7, 0.7])
          box(group, x + dx, -0.05, z + dz, 0.1, 1.35, 0.1, ink);
    };
    const monitor = (
      group: THREE.Object3D,
      x: number,
      z: number,
      title: string,
    ) => {
      box(group, x, 1.65, z, 1.9, 1.2, 0.14, ink);
      label(group, title, x, 1.65, z + 0.08, 1.75, 1.05, "#24392f", "#d4dfcb");
      box(group, x, 1.02, z, 0.1, 0.6, 0.1, brass);
      box(group, x, 0.82, z + 0.1, 0.7, 0.04, 0.5, ink);
    };
    const hemisphere = new THREE.HemisphereLight(0xffffff, 0x6e776a, 2.4);
    scene.add(hemisphere);
    const sun = new THREE.DirectionalLight(0xffedd1, 3.4);
    sun.position.set(8, 10, 8);
    scene.add(sun);
    scene.add(sun.target);
    const fill = new THREE.DirectionalLight(0xc4e4de, 1.2);
    fill.position.set(-5, 4, 3);
    scene.add(fill);
    scene.add(fill.target);
    const roomNames = [
      "THE ENTRANCE",
      "RESEARCH BENCH",
      "SOFTWARE DESK",
      "ACADEMIC LIBRARY",
      "COLLABORATION",
    ];
    const groups: THREE.Group[] = [];
    for (let i = 0; i < 5; i++) {
      const group = new THREE.Group();
      group.position.x = i * 18;
      scene.add(group);
      groups.push(group);
      box(group, 0, -0.85, 0, 18, 0.3, 12, plaster);
      box(group, 0, 2.4, -3.3, 18, 6.4, 0.2, plaster);
      box(group, 1.8, -0.65, 0.3, 7, 0.08, 5, stone);
      // Open architectural frames visually connect all five rooms.
      for (const x of [-7.7, 7.7]) {
        box(group, x, 2, -1.7, 0.18, 5.6, 0.18, stone);
        box(group, x, 4.75, 0.7, 0.18, 0.18, 5, stone);
      }
      for (let k = 0; k < 8; k++)
        box(group, 4.4 + k * 0.26, 2.3, -3.12, 0.055, 4.3, 0.12, oak);
      label(group, roomNames[i], 1.2, 3.6, -3.16, 3.1, 1.55);
      if (i === 3 || i === 4) plant(group, 5.4, 1.6, 1.1);
      cylinder(group, -2.3, -0.43, 1.3, 0.7, 0.5, stone);
      cylinder(group, -2.3, -0.16, 1.3, 0.77, 0.07, brass);
      // Floor inlay forms one uninterrupted route through the studio.
      box(group, 0, -0.687, 3.9, 18, 0.015, 0.035, brass);
    }
    const entrance = groups[0];
    desk(entrance, 1.6, 0.3);
    box(entrance, 0.4, 0.82, 0.55, 1.4, 0.08, 0.9, paper);
    box(entrance, 2.6, 2.05, -0.35, 3.05, 2.64, 0.12, ink);
    const photograph = new THREE.TextureLoader().load(
      "/images/certificate-presentation.jpg",
      () => {
        if (disposed) photograph.dispose();
        else wake();
      },
    );
    photograph.colorSpace = THREE.SRGBColorSpace;
    photograph.anisotropy = renderer.capabilities.getMaxAnisotropy();
    textures.push(photograph);
    const photoMaterial = new THREE.MeshBasicMaterial({
      map: photograph,
      toneMapped: false,
    });
    materials.push(photoMaterial);
    const photoGeometry = new THREE.PlaneGeometry(2.89, (2.89 * 2197) / 2560);
    geometries.push(photoGeometry);
    const photo = new THREE.Mesh(photoGeometry, photoMaterial);
    photo.position.set(2.6, 2.05, -0.27);
    entrance.add(photo);
    cylinder(entrance, 3.5, 1.1, 1, 0.16, 0.5, stone);
    cylinder(entrance, -0.25, 1.35, -0.25, 0.06, 1.1, brass);
    const lampGeo = new THREE.ConeGeometry(0.5, 0.4, 32);
    geometries.push(lampGeo);
    const lamp = new THREE.Mesh(lampGeo, sage);
    lamp.position.set(-0.25, 1.96, -0.25);
    entrance.add(lamp);
    // A coding terminal and lab glassware introduce both sides of the practice.
    monitor(entrance, -0.85, -0.55, "Python / Chemistry\nmodel → analyse");
    cylinder(entrance, 0.55, 1.05, 0.7, 0.2, 0.5, glass);
    cylinder(entrance, 0.55, 1.35, 0.7, 0.09, 0.15, ink);
    // Research sculpture and a schematic instrument bench.
    const research = groups[1];
    cylinder(research, 1.5, 0.05, 0.1, 1.5, 1.4, stone);
    cylinder(research, 1.5, 0.78, 0.1, 1.53, 0.08, brass);
    const bondMat = new THREE.LineBasicMaterial({ color: 0x45605c });
    materials.push(bondMat);
    const points: number[] = [];
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++)
        for (let z = 0; z < 3; z++) {
          const px = 0.5 + x,
            py = 1.3 + y * 0.85,
            pz = -0.9 + z;
          sphere(
            research,
            px,
            py,
            pz,
            (x + y + z) % 5 === 0 ? 0.16 : 0.12,
            (x + y + z) % 5 === 0 ? brass : (x + y) % 2 ? sage : copper,
          );
          if (x < 2) points.push(px, py, pz, px + 1, py, pz);
          if (y < 2) points.push(px, py, pz, px, py + 0.85, pz);
          if (z < 2) points.push(px, py, pz, px, py, pz + 1);
        }
    const bonds = new THREE.BufferGeometry();
    bonds.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    geometries.push(bonds);
    research.add(new THREE.LineSegments(bonds, bondMat));
    box(research, 4.3, 0.35, -1.1, 2.2, 0.15, 1.1, oak);
    for (let k = 0; k < 3; k++) {
      cylinder(research, 3.6 + k * 0.6, 0.7, -1.1, 0.18, 0.6, glass);
      cylinder(research, 3.6 + k * 0.6, 1.06, -1.1, 0.09, 0.18, brass);
    }
    // Potentiostat housing, electrode leads and an electrochemical cell.
    box(research, -1.2, 0.45, -0.65, 1.6, 1.1, 1, ink);
    label(
      research,
      "POTENTIOSTAT\nOER / HER",
      -1.2,
      0.53,
      -0.13,
      1.35,
      0.7,
      "#162a30",
      "#f5f2e9",
    );
    cylinder(research, 3.7, 0.9, 0.8, 0.4, 0.8, glass);
    for (const dx of [-0.18, 0, 0.18])
      cylinder(research, 3.7 + dx, 1.5, 0.8, 0.035, 0.7, copper);
    // Software workstations carry actual project names.
    const software = groups[2];
    desk(software, 1.7, 0.6);
    monitor(software, 0.15, 0.1, "Articles\nDownloader");
    monitor(software, 2.45, -0.1, "QAU Kalam");
    box(software, 1.2, 0.81, 1.05, 1.8, 0.05, 0.6, ink);
    for (let k = 0; k < 8; k++)
      box(software, 0.5 + k * 0.2, 0.842, 1, 0.1, 0.01, 0.32, stone);
    label(
      software,
      "Python · TypeScript\nData → models → tools",
      2,
      2.8,
      -2.9,
      3.8,
      1.6,
      "#162a30",
      "#f5f2e9",
    );
    // Compact compute tower: a recognisable programming workstation.
    box(software, 4.65, 0.35, 0.25, 0.65, 1.9, 1.1, ink);
    for (let k = 0; k < 5; k++)
      box(software, 4.65, 0.65 + k * 0.16, 0.81, 0.45, 0.035, 0.02, brass);
    // An architectural library, with a reading lectern and books.
    const library = groups[3];
    for (let k = 0; k < 4; k++) {
      box(library, 1.8, 0.1 + k * 0.9, -1.1, 5.5, 0.12, 0.85, oak);
      for (let j = 0; j < 12; j++)
        book(
          library,
          -0.65 + j * 0.44,
          0.48 + k * 0.9,
          -1.1,
          0.25,
          0.55 + (j % 3) * 0.08,
          [sage, paper, copper, stone][(j + k) % 4],
        );
    }
    box(library, -1.05, 1.5, -1.1, 0.12, 4, 0.85, oak);
    box(library, 4.65, 1.5, -1.1, 0.12, 4, 0.85, oak);
    cylinder(library, 1.8, 0.05, 1.8, 0.1, 1.5, brass);
    const lectern = box(library, 1.8, 0.87, 1.8, 1.7, 0.1, 1, paper);
    lectern.rotation.x = 0.2;
    // A quiet meeting area completes the journey.
    const contact = groups[4];
    cylinder(contact, 1.6, 0.55, 0.2, 1.6, 0.18, oak);
    cylinder(contact, 1.6, -0.05, 0.2, 0.15, 1.1, brass);
    for (const x of [-0.6, 3.8]) {
      box(contact, x, -0.02, 0.4, 0.9, 0.2, 0.9, sage);
      box(contact, x, 0.48, -0.05, 0.9, 1.1, 0.15, sage);
      for (const dx of [-0.3, 0.3])
        box(contact, x + dx, -0.38, 0.4, 0.06, 0.6, 0.6, ink);
    }
    box(contact, 1.5, 0.66, 0.2, 1.1, 0.035, 0.75, paper);
    cylinder(contact, 2.4, 0.83, 0.1, 0.14, 0.36, glass);
    label(contact, "Let’s make\nsomething useful.", 1.6, 2.25, -2.9, 3, 1.5);

    let desired = positionRef.current,
      current = positionRef.current,
      raf = 0,
      last = 0,
      lost = false,
      visible = true;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const background = new THREE.Color();
    scene.background = background;
    scene.fog = new THREE.Fog(background, 22, 55);
    const render = () => {
      const x = current * 18;
      const mobile = el.clientWidth < 760;
      camera.position.set(x + 7.8, mobile ? 6.5 : 5.4, mobile ? 14 : 12);
      camera.lookAt(x + 1.4, 1.2, 0);
      sun.position.x = x + 8;
      sun.target.position.set(x, 0, 0);
      fill.position.x = x - 5;
      fill.target.position.set(x, 1, 0);
      groups.forEach((group, i) => {
        group.visible = Math.abs(i - current) < 1.5;
      });
      renderer.render(scene, camera);
    };
    const tick = (now: number) => {
      raf = 0;
      if (disposed || lost || !visible || document.hidden) return;
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      current = motion.matches
        ? desired
        : THREE.MathUtils.lerp(current, desired, 1 - Math.exp(-dt / 110));
      if (Math.abs(current - desired) < 0.0002) current = desired;
      render();
      if (current !== desired) raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf && !disposed && !lost && visible && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    journeyRef.current = (position) => {
      desired = THREE.MathUtils.clamp(position, 0, 4);
      wake();
    };
    const palette = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      background.set(dark ? 0x18251f : 0xeae5d8);
      (scene.fog as THREE.Fog).color.copy(background);
      plaster.color.set(dark ? 0x293c32 : 0xe5dfcf);
      stone.color.set(dark ? 0x47584b : 0xc5bdaa);
      bondMat.color.set(dark ? 0xc4dbd6 : 0x334c49);
      sage.color.set(dark ? 0x79ac96 : 0x285f50);
      glass.color.set(dark ? 0x8ec4d1 : 0x487f94);
      hemisphere.intensity = dark ? 1.8 : 2.4;
      renderer.toneMappingExposure = dark ? 1.25 : 1.2;
      wake();
    };
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.setViewOffset(
        w,
        h,
        w < 760 ? 0 : -w * 0.19,
        w < 760 ? h * 0.22 : 0,
        w,
        h,
      );
      camera.updateProjectionMatrix();
      wake();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else wake();
    });
    io.observe(el);
    const theme = new MutationObserver(palette);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else wake();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const contextRestored = () => {
      lost = false;
      wake();
    };
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("webglcontextrestored", contextRestored);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", wake);
    palette();
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      journeyRef.current = null;
      ro.disconnect();
      io.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", wake);
      canvas.removeEventListener("webglcontextcreationerror", fail);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      groups.forEach((group) => group.clear());
      scene.clear();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      canvas.remove();
    };
  }, [journeyRef, positionRef]);
  return <div ref={mount} className="studio-renderer" />;
}
