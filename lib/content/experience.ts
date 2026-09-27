import { createClient } from "@/lib/supabase/server";
import { experienceSchema, type Experience } from "@/lib/schemas/experience";

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`[content/experience] Failed to load experiences. table: experiences, cause: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const result = experienceSchema.safeParse(row);
    if (!result.success) {
      throw new Error(
        `[content/experience] Invalid experience row.\n` +
          result.error.issues.map((i) => `field: ${i.path.join(".")}, expected: ${i.message}`).join("\n")
      );
    }
    return result.data;
  });
}
