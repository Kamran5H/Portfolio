'use client';

import { useEffect, useState } from 'react';

export interface Scroll3DState {
  progress: number; // 0.0 to 1.0
  velocity: number;
  section: 'hero' | 'work' | 'lab' | 'stack' | 'research' | 'contact';
}

/**
 * High-performance hook tracking normalized page scroll (0.0 to 1.0)
 * and active section for smooth WebGL 3D camera choreography.
 */
export function useScroll3D(): Scroll3DState {
  const [state, setState] = useState<Scroll3DState>({
    progress: 0,
    velocity: 0,
    section: 'hero',
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const compute = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(docHeight - winHeight, 1);
      const currentY = window.scrollY;
      const progress = Math.min(Math.max(currentY / maxScroll, 0), 1);
      const velocity = currentY - lastY;
      lastY = currentY;

      let section: Scroll3DState['section'] = 'hero';
      if (progress > 0.85) section = 'contact';
      else if (progress > 0.68) section = 'research';
      else if (progress > 0.52) section = 'stack';
      else if (progress > 0.34) section = 'lab';
      else if (progress > 0.12) section = 'work';

      setState({ progress, velocity, section });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(compute);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    compute();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
}
