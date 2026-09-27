import { createClient } from "@/lib/supabase/server";
import { activitySchema, type Activity } from "@/lib/schemas/experience";

export async function getActivities(): Promise<Activity[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`[content/activities] Failed to load activities. table: activities, cause: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const result = activitySchema.safeParse(row);
    if (!result.success) {
      throw new Error(
        `[content/activities] Invalid activity row.\n` +
          result.error.issues.map((i) => `field: ${i.path.join(".")}, expected: ${i.message}`).join("\n")
      );
    }
    return result.data;
  });
}
