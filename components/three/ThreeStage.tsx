'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

interface ThreeStageProps {
  children: React.ReactNode;
  className?: string;
  fallbackIcon?: string;
}

export default function ThreeStage({ children, className = '', fallbackIcon = '⚡' }: ThreeStageProps) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !mounted) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '50px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className={`relative flex items-center justify-center bg-ink-card/60 rounded-2xl border border-line ${className}`}>
        <span className="text-xl opacity-20">{fallbackIcon}</span>
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-ink-card rounded-2xl border border-line p-6 ${className}`}>
        <span className="text-3xl">{fallbackIcon}</span>
        <span className="mt-2 font-mono text-[11px] text-paper-dim">3D Architecture</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-line/80 bg-gradient-to-b from-ink-card to-ink-2 shadow-lg shadow-black/30 ${className}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald/10 blur-xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-gold/10 blur-xl" />

      <div className="relative h-full w-full pointer-events-none">
        {inView ? (
          <Canvas
            frameloop="always"
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            dpr={isMobile ? 1 : [1, 1.5]}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: isMobile ? 'low-power' : 'default',
              stencil: false,
              depth: true,
            }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} />
            <pointLight position={[-5, -5, -2]} color="#10b981" intensity={0.8} />
            <pointLight position={[5, -2, 2]} color="#f59e0b" intensity={0.6} />

            <Suspense fallback={null}>
              {children}
            </Suspense>
          </Canvas>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xl opacity-20">{fallbackIcon}</span>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-2.5 right-3 flex items-center gap-1.5 opacity-60">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright" />
        <span className="font-mono text-[9px] uppercase tracking-wider text-paper-dim">3D Artifact</span>
      </div>
    </div>
  );
}
