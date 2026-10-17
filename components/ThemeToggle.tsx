"use client";

import { useSyncExternalStore } from "react";

const subscribe = (notify: () => void) => {
  window.addEventListener("portfolio-theme", notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener("portfolio-theme", notify);
    window.removeEventListener("storage", notify);
  };
};
const getTheme = () =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export default function ThemeToggle({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#191f1d" : "#f6f4ed");
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* The selection still works for this visit. */
    }
    window.dispatchEvent(new Event("portfolio-theme"));
  };
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      disabled={disabled}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 3a7 7 0 0 1 0 14Z" fill="currentColor" />
      </svg>
      <span>{theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}
