"use client";

import { useState } from "react";
import type { Skill } from "@/lib/schemas/skill";

export function Skills({ skills }: { skills: Skill[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  if (skills.length === 0) return null;
  const open = skills.find((s) => s.id === openId) ?? null;

  return (
    <section id="skills" className="border-t py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mb-11 text-center">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>Skill sets</p>
        <h2 className="text-3xl font-extrabold tracking-tight">What I work with</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, i) => (
          <button
            key={skill.id}
            onClick={() => setOpenId(skill.id === openId ? null : skill.id)}
            className="glass rounded-card p-8 text-center transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="mb-3.5 text-xs font-semibold" style={{ color: "var(--ink-soft)" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-1.5 text-base font-extrabold">{skill.name}</h3>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
              {skill.category}
            </p>
          </button>
        ))}
      </div>

      {open && (
        <div className="glass mt-5 rounded-panel p-8">
          <h3 className="mb-2.5 text-xl font-extrabold">{open.name}</h3>
          {open.description && (
            <p className="mb-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {open.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {open.tags.map((tag) => (
              <span key={tag} className="glass rounded-lg px-3 py-1.5 text-[13px] font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => setOpenId(null)}
            className="mt-4 inline-block text-[13px] font-semibold"
            style={{ color: "var(--ink-soft)" }}
          >
            Close ✕
          </button>
        </div>
      )}
    </section>
  );
}
