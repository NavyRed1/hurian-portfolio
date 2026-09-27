import Link from "next/link";
import type { Project } from "@/lib/schemas/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-card border border-line bg-panel p-6 transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-sunset-3/40">
      <div className="mb-2.5 font-sans text-xs text-sunset-3">{project.category}</div>
      <h3 className="mb-2 font-display text-[17px] font-semibold text-ink">{project.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-ink-dim">{project.short_description}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span key={tech} className="rounded-[7px] border border-line bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-ink-dim">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4 font-sans text-[13px] font-medium">
        {project.caseStudy && (
          <Link href={`/projects/${project.slug}`} className="text-sunset-3">
            Case study →
          </Link>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" className="text-sunset-3">
            GitHub
          </a>
        )}
        {project.demo_url && (
          <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-sunset-3">
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
