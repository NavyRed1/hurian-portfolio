import type { Activity } from "@/lib/schemas/experience";

export function Activities({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) return null;
  return (
    <section id="activities" className="border-t py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mb-11 text-center">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>Involvement</p>
        <h2 className="text-3xl font-extrabold tracking-tight">Activities</h2>
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <div key={activity.id}>
            <div className="mb-4 aspect-[16/10] overflow-hidden rounded-panel border" style={{ borderColor: "var(--line)" }}>
              {activity.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activity.image} alt={activity.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: "var(--ink-soft)" }}>
                  {activity.title}
                </div>
              )}
            </div>
            <div className="mb-2 text-xs font-bold uppercase tracking-wide">{activity.category}</div>
            <h3 className="mb-2 text-[17px] font-extrabold">{activity.title}</h3>
            {activity.description && (
              <p className="mb-3.5 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{activity.description}</p>
            )}
            {activity.external_url && (
              <a href={activity.external_url} target="_blank" rel="noreferrer" className="btn btn-text text-[13px]">
                View project <span className="arrow">→</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
