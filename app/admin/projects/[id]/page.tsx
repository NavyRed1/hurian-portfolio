import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/project-form";
import { updateProject } from "@/lib/actions/projects";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*, project_technologies(technology)")
    .eq("id", id)
    .single();

  if (!project) notFound();

  const updateAction = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink">Edit project</h1>
      {error && <p className="mb-4 text-sm text-sunset-1">{error}</p>}
      <ProjectForm
        action={updateAction}
        submitLabel="Save changes"
        initial={{
          ...project,
          technologies: (project.project_technologies ?? []).map((t: any) => t.technology),
        }}
      />
    </div>
  );
}
