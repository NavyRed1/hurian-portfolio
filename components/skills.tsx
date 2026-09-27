import type { SkillCategoryGroup } from "@/lib/schemas/skill";

/** Plain category rows, not chip-soup — restrained per the brief, no fake proficiency bars. */
export function Skills({ categories }: { categories: SkillCategoryGroup[] }) {
  if (categories.length === 0) return null;
  return (
    <section id="skills" className="border-t border-line py-20">
      <h2 className="mb-9 font-display text-2xl font-bold text-ink">Skills</h2>
      <div>
        {categories.map((group) => (
          <div key={group.category} className="grid grid-cols-1 gap-2 border-b border-line py-4 last:border-none sm:grid-cols-[160px_1fr] sm:gap-5">
            <div className="font-sans text-[13px] font-semibold text-sunset-3">{group.category}</div>
            <div className="text-sm leading-loose text-ink-dim">
              {group.skills.map((s) => s.name).join(" · ")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
