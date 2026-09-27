/** Renders one real, project-supplied metric. Never fabricate a value — pass it in from actual results. */
export function ProjectMetric({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <div className="inline-flex flex-col rounded-card border border-line bg-panel px-5 py-4 not-prose">
      <span className="font-mono text-2xl font-semibold text-ink">
        {value}
        {unit && <span className="text-sm text-ink-dim"> {unit}</span>}
      </span>
      <span className="mt-1 font-sans text-xs text-ink-dim">{label}</span>
    </div>
  );
}
