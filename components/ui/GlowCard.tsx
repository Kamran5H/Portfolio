"use client";

import clsx from "clsx";
import { useMemo, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

type Accent = "cyan" | "green" | "orange" | "purple";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  accentColor?: Accent;
};

const accentToSpot = (accent: Accent) => {
  switch (accent) {
    case "green":
      return "rgba(10,255,155,0.07)";
    case "orange":
      return "rgba(255,107,53,0.07)";
    case "purple":
      return "rgba(123,47,255,0.07)";
    case "cyan":
    default:
      return "rgba(0,212,255,0.07)";
  }
};

export default function GlowCard({ children, className, accentColor = "cyan" }: GlowCardProps) {
  const spotRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const spotColor = useMemo(() => accentToSpot(accentColor), [accentColor]);

  const onMouseMove = (e: ReactMouseEvent) => {
    const container = containerRef.current;
    const spot = spotRef.current;
    if (!container || !spot) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spot.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${spotColor}, transparent)`;
    spot.style.opacity = "1";
  };

  const onMouseLeave = () => {
    const spot = spotRef.current;
    if (!spot) return;
    spot.style.background = "transparent";
    spot.style.opacity = "0";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "relative overflow-hidden",
        "border border-[var(--border-subtle)] rounded-[8px]",
        "transition-all duration-300",
        "hover:border-[var(--border-glow)] hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]",
        "bg-[var(--bg-card)]",
        className
      )}
    >
      <div
        ref={spotRef}
        aria-hidden="true"
        className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-200"
      />
      {children}
    </div>
  );
}

