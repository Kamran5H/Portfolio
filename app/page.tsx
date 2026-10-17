'use client';

import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Work from '@/components/Work';
import Lab from '@/components/Lab';
import Stack from '@/components/Stack';
import Research from '@/components/Research';
import Contact from '@/components/Contact';
import { useReveal } from '@/lib/hooks';

const GlobalStage3D = dynamic(() => import('@/components/three/GlobalStage3D'), {
  ssr: false,
});

export default function Home() {
  useReveal();
  return (
    <div className="relative min-h-screen bg-ink text-paper overflow-x-hidden">
      {/* Persistent Full-Page Three.js 3D Background Stage */}
      <GlobalStage3D />

      {/* Foreground Content with layered z-index */}
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Work />
          <Lab />
          <Stack />
          <Research />
        </main>
        <Contact />
      </div>
    </div>
  );
}
