"use client";

import { useEffect, useState } from "react";

/** The day/night switch: persists to localStorage, no flash on load (see the inline script in layout.tsx). */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable — theme just won't persist across reloads.
    }
  }

  // Avoid rendering theme-dependent inline state before hydration settles.
  if (!mounted) return <button id="theme-toggle" aria-label="Toggle dark mode" />;

  return (
    <button id="theme-toggle" aria-label="Toggle dark mode" onClick={toggle}>
      <div className="stars-bg" />
      <div className="celestial-body" />
      <div className="landscape night-landscape">
        <svg viewBox="0 0 36 24" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path d="M-5,25 L10,10 L22,25 Z" fill="#1a112c" />
          <path d="M12,25 L26,6 L40,25 Z" fill="#0d0716" />
        </svg>
      </div>
      <div className="landscape day-landscape">
        <svg viewBox="0 0 36 24" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path d="M-5,25 Q8,8 20,18 T40,15 L40,25 Z" fill="#f97316" />
          <path d="M15,25 Q25,15 35,20 T45,18 L45,25 Z" fill="#ea580c" />
        </svg>
      </div>
    </button>
  );
}
