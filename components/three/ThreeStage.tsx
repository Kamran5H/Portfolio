'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

interface ThreeStageProps {
  children: React.ReactNode;
  className?: string;
  fallbackIcon?: string;
}

export default function ThreeStage({ children, className = '', fallbackIcon = '⚡' }: ThreeStageProps) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className={`relative flex items-center justify-center bg-ink-card/60 rounded-2xl border border-line ${className}`}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-bright border-t-transparent opacity-60" />
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-ink-card rounded-2xl border border-line p-6 ${className}`}>
        <span className="text-4xl">{fallbackIcon}</span>
        <span className="mt-2 font-mono text-xs text-paper-dim">Interactive 3D Preview</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line/80 bg-gradient-to-b from-ink-card to-ink-2 shadow-xl shadow-black/40 ${className}`}>
      {/* Ambient accent corner glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-gold/10 blur-2xl" />

      {/* Canvas container */}
      <div className="relative h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} />
          <pointLight position={[-5, -5, -2]} color="#10b981" intensity={0.8} />
          <pointLight position={[5, -2, 2]} color="#f59e0b" intensity={0.6} />

          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </div>

      {/* Subtle interaction cue at bottom */}
      <div className="pointer-events-none absolute bottom-2.5 right-3 flex items-center gap-1.5 opacity-60">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright" />
        <span className="font-mono text-[9px] uppercase tracking-wider text-paper-dim">3D Artifact</span>
      </div>
    </div>
  );
}
