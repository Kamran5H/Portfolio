"use client";

export default function FrameworkLink() {
  return (
    <a
      href="#framework-viewer"
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        const viewer = document.getElementById("framework-viewer");
        if (viewer instanceof HTMLDetailsElement) viewer.open = true;
      }}
    >
      Explore the 3D molecular model <span aria-hidden="true">↘</span>
    </a>
  );
}
