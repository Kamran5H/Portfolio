import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          1: "#eeede4",
          2: "#eaf0e8",
          3: "#e0e6dd",
          card: "#fffcf5",
        },
        paper: {
          DEFAULT: "var(--paper)",
          dim: "var(--muted)",
          faint: "var(--faint)",
        },
        signal: "var(--accent)",
        emerald: {
          DEFAULT: "var(--accent)",
          bright: "var(--accent)",
          glow: "rgba(36, 99, 86, 0.12)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          bright: "var(--gold)",
          glow: "rgba(129, 97, 51, 0.12)",
        },
        line: {
          DEFAULT: "rgba(40, 59, 55, 0.16)",
          2: "rgba(40, 59, 55, 0.24)",
          hover: "rgba(40, 59, 55, 0.32)",
          bright: "rgba(36, 99, 86, 0.35)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionTimingFunction: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};

export default config;
