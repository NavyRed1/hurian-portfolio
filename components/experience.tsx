import type { Experience as ExperienceType } from "@/lib/schemas/experience";

function formatRange(start: string, end: string | null) {
  const startYear = new Date(start).getFullYear();
  const endYear = end ? new Date(end).getFullYear() : "Present";
  return `${startYear} — ${endYear}`;
}

/** Deliberately NOT a card grid — a timeline reads as chronological progression, cards don't. */
export function Experience({ experiences }: { experiences: ExperienceType[] }) {
  if (experiences.length === 0) return null;
  return (
    <section id="experience" className="border-t border-line py-20">
      <h2 className="mb-9 font-display text-2xl font-bold text-ink">Experience</h2>
      <div className="relative border-l border-line pl-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pb-9 last:pb-0">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-sunset-2 shadow-[0_0_0_1px_rgba(255,227,179,0.14)]" />
            <div className="mb-1.5 font-mono text-xs text-sunset-3">{formatRange(exp.start_date, exp.end_date)}</div>
            <h3 className="mb-1 font-display text-base font-semibold text-ink">{exp.role}</h3>
            <div className="mb-2 text-[13px] text-ink-dim">{exp.organization}</div>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-dim">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
