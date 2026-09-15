import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getAllProjects } from "@/lib/content/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ProjectMetric } from "@/components/mdx/ProjectMetric";
import { DatasetTable } from "@/components/mdx/DatasetTable";
import { ModelComparison } from "@/components/mdx/ModelComparison";
import { ProjectChart } from "@/components/mdx/ProjectChart";

const mdxComponents = { ProjectMetric, DatasetTable, ModelComparison, ProjectChart };

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short_description,
    openGraph: { title: project.title, description: project.short_description },
  };
}

const SECTIONS = ["Problem", "Data", "Method", "Modeling", "Evaluation", "Results", "Lessons"];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-content px-5 py-20 md:px-8">
      <p className="mb-3 font-sans text-xs text-sunset-3">{project.category}</p>
      <h1 className="mb-4 font-display text-3xl font-extrabold text-ink md:text-4xl">{project.title}</h1>
      <p className="mb-8 max-w-2xl text-ink-dim">{project.short_description}</p>
      <div className="mb-10 flex gap-4 font-sans text-sm font-medium">
        {project.github_url && <a href={project.github_url} className="text-sunset-3">GitHub</a>}
        {project.demo_url && <a href={project.demo_url} className="text-sunset-3">Live demo</a>}
      </div>

      {project.caseStudy ? (
        <article className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink-dim prose-a:text-sunset-3">
          <MDXRemote source={project.caseStudy.content} components={mdxComponents} />
        </article>
      ) : (
        <div className="rounded-panel border border-line bg-panel p-6 text-sm text-ink-dim">
          No case study written yet. Expected sections once added:{" "}
          {SECTIONS.map((s, i) => (
            <span key={s}>
              {i + 1}. {s}
              {i < SECTIONS.length - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
