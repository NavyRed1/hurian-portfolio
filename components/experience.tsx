"use client";

import { useState } from "react";
import type { Experience as ExperienceType } from "@/lib/schemas/experience";

export function Experience({ experiences }: { experiences: ExperienceType[] }) {
  const [active, setActive] = useState(0);
  if (experiences.length === 0) return null;
  const current = experiences[active];

  return (
    <section id="experiences" className="border-t py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mb-11 text-center">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>Track record</p>
        <h2 className="text-3xl font-extrabold tracking-tight">Experiences</h2>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="glass inline-flex gap-1 rounded-2xl p-1.5">
          {experiences.map((exp, i) => (
            <button
              key={exp.id}
              onClick={() => setActive(i)}
              className="rounded-xl px-5 py-2 text-[13px] font-bold transition-all"
              style={
                i === active
                  ? { background: "var(--ink)", color: "var(--bg)" }
                  : { color: "var(--ink-soft)" }
              }
            >
              {exp.organization}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-xl text-center">
        <p className="mb-2.5 text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>{current.role}</p>
        <h3 className="mb-3.5 text-xl font-extrabold">{current.organization}</h3>
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{current.description}</p>
      </div>
    </section>
  );
}
