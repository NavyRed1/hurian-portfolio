type ModelResult = { name: string; metrics: Record<string, string | number> };

/** Side-by-side model comparison, fed real evaluation results only. */
export function ModelComparison({ models }: { models: ModelResult[] }) {
  const metricKeys = models.length > 0 ? Object.keys(models[0].metrics) : [];
  return (
    <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-2">
      {models.map((model) => (
        <div key={model.name} className="rounded-card border border-line bg-panel p-4">
          <div className="mb-2 font-display text-sm font-semibold text-ink">{model.name}</div>
          {metricKeys.map((key) => (
            <div key={key} className="flex justify-between border-t border-line py-1.5 font-mono text-xs text-ink-dim first:border-none">
              <span>{key}</span>
              <span className="text-ink">{model.metrics[key]}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
