"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({
      name: String(formData.get("name") ?? ""),
      headline: String(formData.get("headline") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      location: String(formData.get("location") ?? "") || null,
      email_public: String(formData.get("email_public") ?? "") || null,
      github_url: String(formData.get("github_url") ?? "") || null,
      linkedin_url: String(formData.get("linkedin_url") ?? "") || null,
      resume_url: String(formData.get("resume_url") ?? "") || null,
    })
    .eq("id", id);

  revalidatePath("/admin/profile");
  revalidatePath("/");
}
