import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createClient } from "@/lib/supabase/server";
import {
  projectRecordSchema,
  projectFrontmatterSchema,
  projectSchema,
  type Project,
  type ProjectRecord,
} from "@/lib/schemas/project";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

/** Reads and validates the MDX case study for a slug, if one exists on disk. */
function readCaseStudy(slug: string): Project["caseStudy"] {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `[content/projects] Invalid MDX frontmatter.\n` +
        `file: content/projects/${slug}.mdx\n` +
        parsed.error.issues
          .map((i) => `field: ${i.path.join(".")}, expected: ${i.message}, received: ${JSON.stringify((data as any)[i.path[0]])}`)
          .join("\n")
    );
  }

  return { frontmatter: parsed.data, content };
}

async function fetchRecords(filter: (q: any) => any): Promise<ProjectRecord[]> {
  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*, project_technologies(technology)")
    .order("sort_order", { ascending: true });
  query = filter(query);

  const { data, error } = await query;
  if (error) {
    throw new Error(`[content/projects] Failed to load projects. table: projects, cause: ${error.message}`);
  }

  return (data ?? []).map((row: any) => {
    const shaped = {
      ...row,
      technologies: (row.project_technologies ?? []).map((t: any) => t.technology),
    };
    const result = projectRecordSchema.safeParse(shaped);
    if (!result.success) {
      throw new Error(
        `[content/projects] Invalid project row.\n` +
          `table: projects, slug: ${row.slug}\n` +
          result.error.issues.map((i) => `field: ${i.path.join(".")}, expected: ${i.message}`).join("\n")
      );
    }
    return result.data;
  });
}

function merge(record: ProjectRecord): Project {
  const merged = { ...record, caseStudy: readCaseStudy(record.slug) };
  const result = projectSchema.safeParse(merged);
  if (!result.success) {
    throw new Error(
      `[content/projects] Merged project failed validation. slug: ${record.slug}\n` +
        result.error.issues.map((i) => `field: ${i.path.join(".")}, expected: ${i.message}`).join("\n")
    );
  }
  return result.data;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const records = await fetchRecords((q) => q.eq("published", true).eq("featured", true));
  return records.map(merge);
}

export async function getAllProjects(): Promise<Project[]> {
  const records = await fetchRecords((q) => q.eq("published", true));
  return records.map(merge);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const records = await fetchRecords((q) => q.eq("published", true).eq("slug", slug).limit(1));
  if (records.length === 0) return null;
  return merge(records[0]);
}
