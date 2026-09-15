"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSettings(id: string, formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("site_settings")
    .update({
      site_title: String(formData.get("site_title") ?? ""),
      site_description: String(formData.get("site_description") ?? ""),
      accent_color: String(formData.get("accent_color") ?? "#EA6113"),
    })
    .eq("id", id);

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
