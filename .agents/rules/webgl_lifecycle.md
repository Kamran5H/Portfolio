# WebGL & Three.js Lifecycle Rules

1. **Exhaustive Disposal**:
   - In React/Next.js client components, every `THREE.Material`, `THREE.BufferGeometry`, `THREE.Texture`, and `THREE.WebGLRenderer` created must be collected and explicitly disposed on unmount.
   - Instanced meshes and line segments must be removed from parent groups and scenes during teardown.

2. **Context Loss Handling**:
   - Always attach `webglcontextlost` and `webglcontextrestored` event listeners on the canvas/renderer to prevent silent canvas freezing when the GPU reclaims contexts (e.g. mobile tab suspension).

3. **Energy & Frame Throttling**:
   - Cancel `requestAnimationFrame` when the document is hidden (`document.addEventListener("visibilitychange", ...)`).
   - Cap delta time in animation loops (`Math.min(dt, 50)`) to prevent physics/lerp explosions when returning to backgrounded tabs.
   - Cap device pixel ratio (`Math.min(window.devicePixelRatio || 1, 1.5)` on mobile, `2` on desktop) to prevent GPU thermal throttling.

4. **Reduced-Motion Compliance**:
   - Query `window.matchMedia("(prefers-reduced-motion: reduce)")`. When matched, immediately snap camera coordinates or model rotations to the target position rather than running smooth interpolation loops.

5. **Viewport-Gated Canvas Mounting (IntersectionObserver)**:
   - For multi-canvas pages or heavy 3D scenes, pause RAF loops or defer mounting canvas components until the container enters the viewport using `IntersectionObserver`.
   - Render a lightweight CSS placeholder while off-screen to avoid browser WebGL context exhaustion (typically capped at 8–16 simultaneous contexts).
