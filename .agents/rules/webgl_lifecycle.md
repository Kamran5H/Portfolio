# WebGL & Three.js Lifecycle Rules

1. **Exhaustive Disposal**:
   - In React/Next.js client components, every `THREE.Material`, `THREE.BufferGeometry`, `THREE.Texture`, and `THREE.WebGLRenderer` created must be collected and explicitly disposed on unmount.
   - Instanced meshes and line segments must be removed from parent groups and scenes during teardown.

2. **Context Loss Handling**:
   - Always attach `webglcontextlost` and `webglcontextrestored` event listeners on the canvas/renderer to prevent silent canvas freezing when the GPU reclaims contexts (e.g. mobile tab suspension).

3. **Hardware Acceleration & Battery Awareness**:
   - Avoid infinite full-screen procedural SVG fractal noise animations that force continuous GPU repainting on mobile devices.

4. **Viewport-Gated Canvas Mounting (IntersectionObserver)**:
   - For multi-canvas pages, defer mounting the `<Canvas>` component until the container enters the viewport using `IntersectionObserver` with an anticipatory margin (e.g., `rootMargin: '200px'`).
   - Render a lightweight CSS spinner while off-screen. This avoids browser WebGL context limits (often capped at 8–16 simultaneous contexts) and eliminates cold-start GPU/CPU bottlenecks.
