import { createClient } from "@/lib/supabase/server";
import { createRow, deleteRow, toggleVisible } from "@/lib/actions/collections";

export default async function AdminActivitiesPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from("activities").select("*").order("sort_order");

  async function addActivity(formData: FormData) {
    "use server";
    await createRow("activities", {
      title: formData.get("title"),
      category: formData.get("category"),
      description: formData.get("description") || null,
      external_url: formData.get("external_url") || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
      visible: true,
    });
  }

  const inputClass = "rounded-btn border border-line bg-panel px-3 py-2 text-sm text-ink";

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink">Activities</h1>
      <form action={addActivity} className="mb-6 grid max-w-lg gap-2">
        <input name="title" placeholder="Title" required className={inputClass} />
        <input name="category" placeholder="Category" required className={inputClass} />
        <textarea name="description" placeholder="Description" rows={2} className={inputClass} />
        <input name="external_url" placeholder="External URL" className={inputClass} />
        <button className="btn btn-fill !text-[13px] justify-center">Add</button>
      </form>
      <div className="divide-y divide-line rounded-card border border-line bg-panel">
        {(rows ?? []).map((r) => (
          <div key={r.id} className="flex items-center justify-between p-3 text-sm">
            <span className="text-ink">{r.title} <span className="text-ink-dim">— {r.category}</span></span>
            <div className="flex gap-3 text-xs">
              <form action={toggleVisible.bind(null, "activities", r.id, !r.visible)}>
                <button className={r.visible ? "text-sunset-3" : "text-ink-dim"}>{r.visible ? "Visible" : "Hidden"}</button>
              </form>
              <form action={deleteRow.bind(null, "activities", r.id)}>
                <button className="text-ink-dim hover:text-sunset-1">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
