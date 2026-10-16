'use client';

import { useEffect, useRef } from 'react';
import CVButton from './CVButton';

/** A crystal-lattice dot field that bends away from the cursor, then springs back. */
function Lattice() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, t = 0;
    let pts: { x: number; y: number; ox: number; oy: number; vx: number; vy: number; hot: boolean }[] = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w < 640 ? 26 : 34;
      pts = [];
      for (let y = gap / 2, row = 0; y < h; y += gap * 0.866, row++) {
        for (let x = (row % 2 ? gap / 2 : 0) + gap / 2; x < w; x += gap) {
          pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, hot: Math.random() < 0.035 });
        }
      }
    };

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy, R = 140;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 2.2;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
        p.vx += (p.ox - p.x) * 0.06; p.vy += (p.oy - p.y) * 0.06;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
        const disp = Math.min(Math.hypot(p.x - p.ox, p.y - p.oy) / 30, 1);
        const pulse = p.hot ? 0.5 + 0.5 * Math.sin(t * 3 + p.ox) : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + disp * 1.6 + pulse * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = p.hot ? `rgba(255,91,31,${0.35 + pulse * 0.6})` : `rgba(236,232,223,${0.14 + disp * 0.6})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const out = () => { mouse.x = mouse.y = -9999; };
    build();
    if (reduce) { draw(); cancelAnimationFrame(raf); } else draw();
    window.addEventListener('resize', build);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', out);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', build); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', out); };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_70%_45%,black_20%,transparent_75%)]" />;
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <Lattice />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1280px] flex-col justify-end px-4 pb-16 pt-28 sm:px-8 sm:pb-24">
        <p className="meta mb-6 flex items-center gap-2 text-paper-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-moss animate-pulse" /> Islamabad · MPhil Physical Chemistry, QAU
        </p>
        <h1 className="display max-w-5xl text-[clamp(3rem,9vw,8.5rem)] leading-[0.92]">
          Chemist by training.<br />
          <em className="text-paper-dim">Builder</em> by habit.
        </h1>
        <p className="mt-8 max-w-md text-lg text-paper-dim">
          I&apos;m Kamran. One campus network in production, twenty-plus tools on GitHub.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#work" className="btn btn-solid">
            Explore Live Works
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 5v14m0 0 6-6m-6 6-6-6" /></svg>
          </a>
          <CVButton />
        </div>
      </div>
    </section>
  );
}
