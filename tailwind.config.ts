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
        ink: "var(--ink)",
        "ink-dim": "var(--ink-soft)",
        panel: "var(--panel)",
        bg: "var(--bg)",
        line: "var(--line)",
        // Kept only so admin/MDX utility components (badges, accents) still
        // resolve to something meaningful — everything maps to the one glow
        // accent now, there is no multi-color "sunset" palette anymore.
        sunset: {
          1: "var(--glow)",
          2: "var(--glow)",
          3: "var(--glow)",
          4: "var(--glow)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        // No separate display/mono typefaces in the current design — both
        // resolve to the same Inter stack so older admin/MDX markup still compiles.
        display: ["var(--font-sans)"],
        mono: ["var(--font-sans)"],
        body: ["var(--font-sans)"],
      },
      borderRadius: {
        card: "20px",
        btn: "16px",
        panel: "22px",
      },
      maxWidth: {
        content: "1100px",
      },
    },
  },
  plugins: [],
};

export default config;
