export function LangStrip({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const looped = [...items, ...items];

  return (
    <div className="overflow-hidden border-y py-5" style={{ borderColor: "var(--line)" }}>
      <div className="marquee-track text-[15px] font-bold" style={{ color: "var(--ink)" }}>
        {looped.map((item, i) => (
          <span key={`${item}-${i}`} className="whitespace-nowrap px-7">{item}</span>
        ))}
      </div>
    </div>
  );
}
