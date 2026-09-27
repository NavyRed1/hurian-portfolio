"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Point = Record<string, string | number>;

/** Real training/evaluation curves only — pass actual logged data, never synthetic-looking placeholders. */
export function ProjectChart({ data, xKey, yKey }: { data: Point[]; xKey: string; yKey: string }) {
  return (
    <div className="not-prose h-64 rounded-card border border-line bg-panel p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,227,179,0.14)" vertical={false} />
          <XAxis dataKey={xKey} stroke="#A99A85" fontSize={12} />
          <YAxis stroke="#A99A85" fontSize={12} />
          <Tooltip contentStyle={{ background: "#1D1610", border: "1px solid rgba(255,227,179,0.14)" }} />
          <Line type="monotone" dataKey={yKey} stroke="#F88F22" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
