type Row = Record<string, string | number>;

/** Renders a real dataset summary table passed in as rows/columns — no invented data. */
export function DatasetTable({ columns, rows }: { columns: string[]; rows: Row[] }) {
  return (
    <div className="not-prose overflow-x-auto rounded-card border border-line">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-panel">
            {columns.map((col) => (
              <th key={col} className="px-4 py-2.5 font-sans font-semibold text-ink-dim">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-none">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2.5 font-mono text-ink-dim">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
