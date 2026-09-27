import { createClient } from "@/lib/supabase/server";
import { createRow, deleteRow, toggleVisible } from "@/lib/actions/collections";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data: skills } = await supabase.from("skills").select("*").order("category").order("sort_order");

  async function addSkill(formData: FormData) {
    "use server";
    await createRow("skills", {
      category: formData.get("category"),
      name: formData.get("name"),
      sort_order: Number(formData.get("sort_order") ?? 0),
      visible: true,
    });
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink">Skills</h1>
      <form action={addSkill} className="mb-6 flex flex-wrap gap-2">
        <select name="category" className="rounded-btn border border-line bg-panel px-3 py-2 text-sm text-ink">
          {["Data Science", "Machine Learning", "AI", "Software Engineering", "Visualization"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input name="name" placeholder="Skill name" required className="rounded-btn border border-line bg-panel px-3 py-2 text-sm text-ink" />
        <input name="sort_order" type="number" placeholder="Order" defaultValue={0} className="w-20 rounded-btn border border-line bg-panel px-3 py-2 text-sm text-ink" />
        <button className="glass-btn glass-btn-primary !text-[13px]">Add</button>
      </form>
      <div className="divide-y divide-line rounded-card border border-line bg-panel">
        {(skills ?? []).map((s) => (
          <div key={s.id} className="flex items-center justify-between p-3 text-sm">
            <span className="text-ink">{s.name} <span className="text-ink-dim">— {s.category}</span></span>
            <div className="flex gap-3 text-xs">
              <form action={toggleVisible.bind(null, "skills", s.id, !s.visible)}>
                <button className={s.visible ? "text-sunset-3" : "text-ink-dim"}>{s.visible ? "Visible" : "Hidden"}</button>
              </form>
              <form action={deleteRow.bind(null, "skills", s.id)}>
                <button className="text-ink-dim hover:text-sunset-1">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
