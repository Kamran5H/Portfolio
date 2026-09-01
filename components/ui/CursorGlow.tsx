"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastX = useRef<number>(-9999);
  const lastY = useRef<number>(-9999);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const flush = () => {
      rafRef.current = null;
      const x = lastX.current;
      const y = lastY.current;
      // Center the glow under the cursor.
      el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      lastX.current = e.clientX;
      lastY.current = e.clientY;
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] transition-transform duration-100 ease-out"
      style={{
        width: 400,
        height: 400,
        opacity: 0.06,
        background:
          "radial-gradient(closest-side at center, rgba(0,212,255,1) 0%, rgba(0,212,255,0.65) 35%, rgba(0,212,255,0) 70%)",
        transform: "translate3d(-9999px, -9999px, 0)",
      }}
    />
  );
}

