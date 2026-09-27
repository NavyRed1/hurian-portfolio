import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/schemas/project";

export function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <section id="projects" className="border-t border-line py-20">
      <div className="mb-9 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-bold text-ink">Selected work</h2>
        <span className="font-sans text-[13px] text-ink-dim">{projects.length} case studies</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
