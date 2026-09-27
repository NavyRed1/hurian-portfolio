import type { Achievement } from "@/lib/schemas/experience";

/** Evidence rows, not decorative badges — matches the brief's "evidence, not decoration". */
export function Achievements({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) return null;
  return (
    <section id="achievements" className="border-t border-line py-20">
      <h2 className="mb-9 font-display text-2xl font-bold text-ink">Achievements</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievements.map((a) => (
          <div key={a.id} className="rounded-card border border-line bg-panel p-5">
            <div className="mb-1 font-mono text-xs text-sunset-3">{new Date(a.date).getFullYear()}</div>
            <h3 className="mb-1 font-display text-[15px] font-semibold text-ink">{a.title}</h3>
            {a.organization && <div className="mb-2 text-[13px] text-ink-dim">{a.organization}</div>}
            <p className="mb-3 text-sm leading-relaxed text-ink-dim">{a.description}</p>
            {a.evidence_url && (
              <a href={a.evidence_url} target="_blank" rel="noreferrer" className="font-sans text-[13px] font-medium text-sunset-3">
                View evidence →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
