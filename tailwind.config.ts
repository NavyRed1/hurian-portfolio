import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        sunset: {
          1: "#EA6113",
          2: "#F88F22",
          3: "#FBB931",
          4: "#FFE3B3",
        },
        bg: "#15100B",
        panel: "#1D1610",
        line: "rgba(255, 227, 179, 0.14)",
        ink: "#F3ECE0",
        "ink-dim": "#A99A85",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        card: "14px",
        btn: "12px",
        panel: "16px",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
