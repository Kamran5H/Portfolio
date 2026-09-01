import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Space Mono", "monospace"],
        jetbrains: ["JetBrains Mono", "monospace"],
        ibm: ["IBM Plex Mono", "monospace"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        blink: "blink 1s step-end infinite",
        pulse_dot: "pulse_dot 2s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        pulse_dot: {
          "0%,100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.3)", opacity: "0.6" },
        },
      },
      boxShadow: {
        cyan: "0 0 20px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.15)",
        green: "0 0 20px rgba(10,255,155,0.4), 0 0 60px rgba(10,255,155,0.1)",
        orange: "0 0 20px rgba(255,107,53,0.5), 0 0 60px rgba(255,107,53,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;

