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
          DEFAULT: "#070c18", // deep midnight navy
          2: "#0e172a",       // secondary midnight slate
          3: "#16223b",       // card surface
          card: "#111c33",    // explicit stage panel
        },
        paper: {
          DEFAULT: "#f8fafc", // high-contrast crisp text
          dim: "#cbd5e1",     // secondary readable copy
          faint: "#818fa3",   // subtle metadata
        },
        emerald: {
          DEFAULT: "#10b981",
          bright: "#34d399",
          glow: "rgba(16, 185, 129, 0.25)",
        },
        gold: {
          DEFAULT: "#f59e0b",
          bright: "#fbbf24",
          glow: "rgba(245, 158, 11, 0.25)",
        },
        line: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          2: "rgba(255, 255, 255, 0.16)",
          bright: "rgba(52, 211, 153, 0.35)",
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
