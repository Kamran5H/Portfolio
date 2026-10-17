# Research model exploration

The conceptual Ce–NiCo framework now includes complete, metal-node, cerium-site and organic-linker views. These change the visibility of existing instanced meshes without creating more WebGL contexts. Bonds are shown only in the complete view so isolated atoms are not connected by misleading floating lines. The legend names all five illustrated elements; view-specific text explicitly identifies the positions and proportions as illustrative.

Zoom is bounded from 80% to 140% and survives viewport resizing. Reset restores the complete view, default zoom and orientation, and pauses animation. The native range and select have visible labels; the zoom range also describes its value to assistive technology. Controls flow below a fixed-height viewport and wrap on narrow screens.

Animation advances using elapsed frame time, capped at 50 ms, and resets its time baseline after pause, visibility change or context recovery. It remains opt-in and halts while hidden or outside the viewport. A global pointer tracking listener was removed. Drag capture loss now ends dragging. Instanced meshes are explicitly disposed and detached with the existing geometry, material, texture and renderer cleanup.

The hero link opens the disclosure on every ordinary activation, including when its hash is already selected. Direct links to `#framework-viewer` also open it after hydration. The canvas still mounts only when the disclosure is open.

Browser verification is required for visual rendering, zoom endpoints, all four layer views, theme switching, reset, pointer rotation, keyboard controls, context recovery and mobile overflow. Static compilation and export checks alone do not establish those behaviors.
