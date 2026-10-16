# WebGL & Three.js Lifecycle Rules

1. **Exhaustive Disposal**:
   - In React/Next.js client components, every `THREE.Material`, `THREE.BufferGeometry`, `THREE.Texture`, and `THREE.WebGLRenderer` created must be collected and explicitly disposed on unmount.
   - Instanced meshes and line segments must be removed from parent groups and scenes during teardown.

2. **Context Loss Handling**:
   - Always attach `webglcontextlost` and `webglcontextrestored` event listeners on the canvas/renderer to prevent silent canvas freezing when the GPU reclaims contexts (e.g. mobile tab suspension).

3. **Hardware Acceleration & Battery Awareness**:
   - Avoid infinite full-screen procedural SVG fractal noise animations that force continuous GPU repainting on mobile devices.
