import { createClient } from "@/lib/supabase/server";
import { createRow, deleteRow, toggleVisible } from "@/lib/actions/collections";

export default async function AdminExperiencePage() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from("experiences").select("*").order("sort_order");

  async function addExperience(formData: FormData) {
    "use server";
    await createRow("experiences", {
      organization: formData.get("organization"),
      role: formData.get("role"),
      description: formData.get("description"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date") || null,
      sort_order: Number(formData.get("sort_order") ?? 0),
      visible: true,
    });
  }

  const inputClass = "rounded-btn border border-line bg-panel px-3 py-2 text-sm text-ink";

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink">Experience</h1>
      <form action={addExperience} className="mb-6 grid max-w-lg gap-2">
        <input name="role" placeholder="Role" required className={inputClass} />
        <input name="organization" placeholder="Organization" required className={inputClass} />
        <textarea name="description" placeholder="Description" required rows={2} className={inputClass} />
        <div className="flex gap-2">
          <input name="start_date" type="date" required className={inputClass} />
          <input name="end_date" type="date" className={inputClass} />
        </div>
        <button className="glass-btn glass-btn-primary !text-[13px] justify-center">Add</button>
      </form>
      <div className="divide-y divide-line rounded-card border border-line bg-panel">
        {(rows ?? []).map((r) => (
          <div key={r.id} className="flex items-center justify-between p-3 text-sm">
            <span className="text-ink">{r.role} <span className="text-ink-dim">— {r.organization}</span></span>
            <div className="flex gap-3 text-xs">
              <form action={toggleVisible.bind(null, "experiences", r.id, !r.visible)}>
                <button className={r.visible ? "text-sunset-3" : "text-ink-dim"}>{r.visible ? "Visible" : "Hidden"}</button>
              </form>
              <form action={deleteRow.bind(null, "experiences", r.id)}>
                <button className="text-ink-dim hover:text-sunset-1">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
