"use client";

import { useEffect, useRef, useState } from "react";
import { CV } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  ["Research", "#research"],
  ["Software", "#work"],
  ["Background", "#background"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia("(min-width: 901px)");
    const closeOnResize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", closeOnResize);
    const previous = document.body.style.overflow;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const links = menuRef.current?.querySelectorAll<HTMLAnchorElement>("a");
        const first = toggleRef.current;
        const last = links?.[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      media.removeEventListener("change", closeOnResize);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a
          className="brand"
          href="#top"
          onClick={() => setOpen(false)}
          aria-label="Muhammad Kamran Ashraf, home"
        >
          <span className="brand-mark" aria-hidden="true">
            K<span>.</span>
          </span>
          <span className="brand-caption">
            A Programmer Chemist’s Portfolio
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a
            className="nav-cv"
            href={CV.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            CV <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <div className="nav-controls">
          <ThemeToggle disabled={open} />
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            onClick={() => setOpen(!open)}
          >
            {open ? "Close −" : "Menu +"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          ref={menuRef}
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {LINKS.map(([label, href], i) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span className="eyebrow">0{i + 1}</span>
              {label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
          <a
            href={CV.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            View CV (PDF) <span aria-hidden="true">↗</span>
          </a>
        </nav>
      )}
    </header>
  );
}
