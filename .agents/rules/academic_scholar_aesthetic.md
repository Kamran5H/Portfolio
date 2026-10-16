# Academic Scholar Aesthetic & Performance Guardrail

When designing or writing copy for research scholars, scientists, and university academics:
1. **Eliminate AI Hype Tropes**: Never use marketing buzzwords ("synthesizing intelligence at the intersection of...", "autonomous AI architect", "turbo downloader", "neural cinema", emoji ranks 🏆, ⚡). Present exact institution, degree, supervisor names, verified marks/CGPA, and specific chemical/scientific mechanisms.
2. **No Typing Effects on Scholarly Titles**: Academic titles must render immediately without typing cursor delays or interval timers.
3. **Zero Compositing Drag**: Avoid multiple `backdrop-filter: blur(...)` and large fixed `filter: blur(...)` elements on long scrollable pages. Use solid surface cards with subtle hairline borders (`1px solid rgba(255,255,255,0.08)` / `#e2e8f0`).
4. **Pause 3D Rendering When Off-Screen**: Always attach an `IntersectionObserver` to WebGL canvases (Three.js) so that `requestAnimationFrame` halts when scrolled out of view, ensuring 0% idle CPU and GPU usage.
