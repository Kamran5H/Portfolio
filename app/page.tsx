'use client';

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Work from '@/components/Work';
import Lab from '@/components/Lab';
import Stack from '@/components/Stack';
import Research from '@/components/Research';
import Contact from '@/components/Contact';
import { useReveal } from '@/lib/hooks';

export default function Home() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Lab />
        <Stack />
        <Research />
      </main>
      <Contact />
    </>
  );
}
