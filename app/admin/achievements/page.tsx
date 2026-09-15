import { createClient } from "@/lib/supabase/server";
import { createRow, deleteRow, toggleVisible } from "@/lib/actions/collections";

export default async function AdminAchievementsPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from("achievements").select("*").order("sort_order");

  async function addAchievement(formData: FormData) {
    "use server";
    await createRow("achievements", {
      title: formData.get("title"),
      organization: formData.get("organization") || null,
      description: formData.get("description"),
      date: formData.get("date"),
      evidence_url: formData.get("evidence_url") || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
      visible: true,
    });
  }

  const inputClass = "rounded-btn border border-line bg-panel px-3 py-2 text-sm text-ink";

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink">Achievements</h1>
      <form action={addAchievement} className="mb-6 grid max-w-lg gap-2">
        <input name="title" placeholder="Title" required className={inputClass} />
        <input name="organization" placeholder="Organization" className={inputClass} />
        <textarea name="description" placeholder="Description" required rows={2} className={inputClass} />
        <input name="date" type="date" required className={inputClass} />
        <input name="evidence_url" placeholder="Evidence URL" className={inputClass} />
        <button className="glass-btn glass-btn-primary !text-[13px] justify-center">Add</button>
      </form>
      <div className="divide-y divide-line rounded-card border border-line bg-panel">
        {(rows ?? []).map((r) => (
          <div key={r.id} className="flex items-center justify-between p-3 text-sm">
            <span className="text-ink">{r.title}</span>
            <div className="flex gap-3 text-xs">
              <form action={toggleVisible.bind(null, "achievements", r.id, !r.visible)}>
                <button className={r.visible ? "text-sunset-3" : "text-ink-dim"}>{r.visible ? "Visible" : "Hidden"}</button>
              </form>
              <form action={deleteRow.bind(null, "achievements", r.id)}>
                <button className="text-ink-dim hover:text-sunset-1">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
