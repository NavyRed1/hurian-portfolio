import { ProjectForm } from "@/components/admin/project-form";
import { createProject } from "@/lib/actions/projects";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink">New project</h1>
      {error && <p className="mb-4 text-sm text-sunset-1">{error}</p>}
      <ProjectForm action={createProject} submitLabel="Create project" />
    </div>
  );
}
