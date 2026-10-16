import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          bg: "#0a0e17",
          surface: "#0f172a",
          card: "#111a2e",
          cardHover: "#162038",
          blue: "#2563eb",
          blueHover: "#1d4ed8",
          sky: "#0284c7",
          emerald: "#059669",
          amber: "#d97706",
          border: "rgba(255, 255, 255, 0.08)",
          textMain: "#cbd5e1",
          textMuted: "#94a3b8",
          textHeading: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["Outfit", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["Space Grotesk", "Outfit", "sans-serif"],
        mono: ["Fira Code", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
