"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Generic CRUD actions shared by the simpler admin sections (skills,
 * experience, achievements, activities). Each table follows the same
 * visible + sort_order convention, so one implementation covers all four
 * rather than duplicating near-identical server actions per section.
 */

export async function createRow(table: string, payload: Record<string, unknown>) {
  const supabase = await createClient();
  await supabase.from(table).insert(payload);
  revalidatePath(`/admin/${table}`);
  revalidatePath("/");
}

export async function deleteRow(table: string, id: string) {
  const supabase = await createClient();
  await supabase.from(table).delete().eq("id", id);
  revalidatePath(`/admin/${table}`);
  revalidatePath("/");
}

export async function toggleVisible(table: string, id: string, value: boolean) {
  const supabase = await createClient();
  await supabase.from(table).update({ visible: value }).eq("id", id);
  revalidatePath(`/admin/${table}`);
  revalidatePath("/");
}
