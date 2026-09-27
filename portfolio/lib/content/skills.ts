import { createClient } from "@/lib/supabase/server";
import { skillSchema, type Skill } from "@/lib/schemas/skill";

/** Flat, ordered list of visible skills — each renders as one card on the homepage. */
export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`[content/skills] Failed to load skills. table: skills, cause: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const result = skillSchema.safeParse(row);
    if (!result.success) {
      throw new Error(
        `[content/skills] Invalid skill row.\n` +
          result.error.issues.map((i) => `field: ${i.path.join(".")}, expected: ${i.message}`).join("\n")
      );
    }
    return result.data;
  });
}
