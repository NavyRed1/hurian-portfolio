"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { projectRecordSchema } from "@/lib/schemas/project";

function parseTechnologies(raw: string): string[] {
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  const technologies = parseTechnologies(String(formData.get("technologies") ?? ""));
  const payload = {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    short_description: String(formData.get("short_description") ?? ""),
    category: String(formData.get("category") ?? ""),
    github_url: String(formData.get("github_url") ?? "") || null,
    demo_url: String(formData.get("demo_url") ?? "") || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    status: (formData.get("published") === "on" ? "published" : "draft") as "draft" | "published",
    sort_order: Number(formData.get("sort_order") ?? 0),
    cover_image: null,
  };

  const { data: project, error } = await supabase
    .from("projects")
    .insert(payload)
    .select()
    .single();

  if (error) {
    redirect(`/admin/projects/new?error=${encodeURIComponent(error.message)}`);
  }

  if (technologies.length > 0) {
    await supabase
      .from("project_technologies")
      .insert(technologies.map((technology) => ({ project_id: project.id, technology })));
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  const technologies = parseTechnologies(String(formData.get("technologies") ?? ""));

  const payload = {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    short_description: String(formData.get("short_description") ?? ""),
    category: String(formData.get("category") ?? ""),
    github_url: String(formData.get("github_url") ?? "") || null,
    demo_url: String(formData.get("demo_url") ?? "") || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    status: (formData.get("published") === "on" ? "published" : "draft") as "draft" | "published",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  const { error } = await supabase.from("projects").update(payload).eq("id", id);
  if (error) {
    redirect(`/admin/projects/${id}?error=${encodeURIComponent(error.message)}`);
  }

  await supabase.from("project_technologies").delete().eq("project_id", id);
  if (technologies.length > 0) {
    await supabase
      .from("project_technologies")
      .insert(technologies.map((technology) => ({ project_id: id, technology })));
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/projects/${payload.slug}`);
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function toggleProjectField(id: string, field: "published" | "featured", value: boolean) {
  const supabase = await createClient();
  await supabase.from("projects").update({ [field]: value }).eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
