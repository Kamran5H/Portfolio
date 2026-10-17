'use client';

import { useEffect, useRef, useState } from 'react';

/** Adds `.in` to `.reveal` and `.card-3d-flip` elements as they scroll into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .card-3d-flip');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Cursor-driven 3D tilt with spring easing and optional depth scaling. Inert on touch / reduced motion. */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !window.matchMedia('(hover: hover)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    let raf = 0,
      tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `perspective(1200px) rotateX(${cy}deg) rotateY(${cx}deg) translateZ(10px)`;
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        raf = requestAnimationFrame(loop);
      }
    };

    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * max * 2;
      ty = -((e.clientY - r.top) / r.height - 0.5) * max * 2;
      kick();
    };

    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
}

/** Simple ticking counter for looping demo animations; pauses off-screen. */
export function useTicker(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = setInterval(() => setTick((t) => t + 1), ms);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [ms]);
  return [ref, tick] as const;
}
