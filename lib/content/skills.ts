import { createClient } from "@/lib/supabase/server";
import { skillSchema, type SkillCategoryGroup } from "@/lib/schemas/skill";

export async function getSkillsByCategory(): Promise<SkillCategoryGroup[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("visible", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`[content/skills] Failed to load skills. table: skills, cause: ${error.message}`);
  }

  const parsed = (data ?? []).map((row) => {
    const result = skillSchema.safeParse(row);
    if (!result.success) {
      throw new Error(
        `[content/skills] Invalid skill row.\n` +
          result.error.issues.map((i) => `field: ${i.path.join(".")}, expected: ${i.message}`).join("\n")
      );
    }
    return result.data;
  });

  const grouped = new Map<string, typeof parsed>();
  for (const skill of parsed) {
    const list = grouped.get(skill.category) ?? [];
    list.push(skill);
    grouped.set(skill.category, list as any);
  }

  return Array.from(grouped.entries()).map(([category, skills]) => ({
    category: category as SkillCategoryGroup["category"],
    skills,
  }));
}
