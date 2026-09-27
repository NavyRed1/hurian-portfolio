import { createClient } from "@/lib/supabase/server";
import { profileSchema, type Profile } from "@/lib/schemas/profile";

export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("visibility", "public")
    .limit(1)
    .single();

  if (error || !data) {
    throw new Error(
      `[content/profile] Failed to load profile from Supabase. ` +
        `table: profiles, cause: ${error?.message ?? "no row returned"}`
    );
  }

  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `[content/profile] Invalid profile row.\n` +
        parsed.error.issues
          .map((i) => `field: ${i.path.join(".")}, expected: ${i.message}, received: ${JSON.stringify((data as any)[i.path[0]])}`)
          .join("\n")
    );
  }

  return parsed.data;
}
