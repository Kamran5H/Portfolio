"use client";

import { useEffect, useRef } from "react";

const CHARS = "01アイウエオカキクケコ0123456789ABCDEF";

type MatrixRainProps = {
  className?: string;
};

export default function MatrixRain({ className }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    const columnWidth = 20;

    const drops: number[] = [];
    const speeds: number[] = [];
    const lastChars: string[] = [];

    const pickChar = () => CHARS[Math.floor(Math.random() * CHARS.length)] ?? "0";

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;

      columns = Math.max(1, Math.floor(width / columnWidth));
      drops.length = 0;
      speeds.length = 0;
      lastChars.length = 0;

      for (let i = 0; i < columns; i++) {
        drops.push(Math.random() * (height / columnWidth));
        speeds.push(Math.random() * 1.2 + 0.4);
        lastChars.push(pickChar());
      }

      ctx.textBaseline = "top";
      ctx.font = `${columnWidth}px monospace`;
    };

    const draw = () => {
      if (document.hidden) {
        rafRef.current = window.requestAnimationFrame(draw);
        return;
      }

      // Fade previous frame.
      ctx.fillStyle = "rgba(2,4,9,0.05)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < columns; i++) {
        const x = i * columnWidth;
        const y = drops[i] * columnWidth;

        const ch = lastChars[i] ?? pickChar();
        const nextChar = Math.random() > 0.98 ? pickChar() : ch;
        lastChars[i] = nextChar;

        // Trail (one cell above) + leading char.
        ctx.fillStyle = "rgba(0,212,255,0.15)";
        ctx.fillText(nextChar, x, y - columnWidth);

        ctx.fillStyle = "rgba(0,212,255,0.7)";
        ctx.fillText(nextChar, x, y);

        drops[i] += 0.25 * speeds[i];
        if (y > height + 50) {
          drops[i] = -Math.random() * 10;
          speeds[i] = Math.random() * 1.2 + 0.4;
          lastChars[i] = pickChar();
        }
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={className ? className : "absolute inset-0 z-0 pointer-events-none"} />;
}

