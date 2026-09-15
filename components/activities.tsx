import type { Activity } from "@/lib/schemas/experience";

export function Activities({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) return null;
  return (
    <section id="activities" className="border-t border-line py-20">
      <h2 className="mb-9 font-display text-2xl font-bold text-ink">Activities</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a) => (
          <div key={a.id} className="rounded-card border border-line bg-panel p-5">
            <div className="mb-1 font-sans text-xs text-sunset-3">{a.category}</div>
            <h3 className="mb-1 font-display text-[15px] font-semibold text-ink">{a.title}</h3>
            {a.description && <p className="text-sm leading-relaxed text-ink-dim">{a.description}</p>}
            {a.external_url && (
              <a href={a.external_url} target="_blank" rel="noreferrer" className="mt-2 inline-block font-sans text-[13px] font-medium text-sunset-3">
                Learn more →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
