import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const projects = await getAllProjects();

  return [
    { url: base, lastModified: new Date() },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date(p.updated_at) })),
  ];
}
