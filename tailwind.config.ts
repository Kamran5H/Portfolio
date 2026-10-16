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
        ink: { DEFAULT: "#0f0f0d", 2: "#171714", 3: "#201f1b" },
        paper: { DEFAULT: "#ece8df", dim: "#a9a397", faint: "#6f6a60" },
        signal: "#ff5b1f",
        moss: "#8fbf6a",
        gold: "#d9b45a",
        line: { DEFAULT: "rgba(236, 232, 223, 0.09)", 2: "rgba(236, 232, 223, 0.16)" },
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
