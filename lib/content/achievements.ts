import { createClient } from "@/lib/supabase/server";
import { achievementSchema, type Achievement } from "@/lib/schemas/experience";

export async function getAchievements(): Promise<Achievement[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`[content/achievements] Failed to load achievements. table: achievements, cause: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const result = achievementSchema.safeParse(row);
    if (!result.success) {
      throw new Error(
        `[content/achievements] Invalid achievement row.\n` +
          result.error.issues.map((i) => `field: ${i.path.join(".")}, expected: ${i.message}`).join("\n")
      );
    }
    return result.data;
  });
}
