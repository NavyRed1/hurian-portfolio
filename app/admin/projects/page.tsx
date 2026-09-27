import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProject, toggleProjectField } from "@/lib/actions/projects";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-ink">Projects</h1>
        <Link href="/admin/projects/new" className="glass-btn glass-btn-primary !text-[13px]">
          New project
        </Link>
      </div>

      <p className="mb-6 rounded-card border border-line bg-panel p-4 text-xs text-ink-dim">
        <b className="text-ink">Project metadata</b> (title, links, visibility) lives in this database.{" "}
        <b className="text-ink">Case study</b> content stays in Git as MDX under{" "}
        <code className="font-mono">content/projects/&lt;slug&gt;.mdx</code>.
      </p>

      <div className="divide-y divide-line rounded-card border border-line bg-panel">
        {(projects ?? []).map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4">
            <div>
              <div className="font-display text-sm font-semibold text-ink">{project.title}</div>
              <div className="font-mono text-xs text-ink-dim">/{project.slug}</div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <form action={toggleProjectField.bind(null, project.id, "published", !project.published)}>
                <button className={`rounded-md px-2.5 py-1 ${project.published ? "bg-sunset-2/15 text-sunset-3" : "bg-white/5 text-ink-dim"}`}>
                  {project.published ? "Published" : "Draft"}
                </button>
              </form>
              <form action={toggleProjectField.bind(null, project.id, "featured", !project.featured)}>
                <button className={`rounded-md px-2.5 py-1 ${project.featured ? "bg-sunset-2/15 text-sunset-3" : "bg-white/5 text-ink-dim"}`}>
                  {project.featured ? "Featured" : "Not featured"}
                </button>
              </form>
              <Link href={`/admin/projects/${project.id}`} className="text-sunset-3">Edit</Link>
              <form action={deleteProject.bind(null, project.id)}>
                <button className="text-ink-dim hover:text-sunset-1">Delete</button>
              </form>
            </div>
          </div>
        ))}
        {(!projects || projects.length === 0) && (
          <p className="p-6 text-sm text-ink-dim">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
