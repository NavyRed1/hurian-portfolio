import { z } from "zod";

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase, alphanumeric, hyphen-separated"),
  subtitle: z.string().min(1),
  category: z.string().min(1),
  technologies: z.array(z.string()).min(1),
  cover: z.string().min(1),
  featured: z.boolean().default(false),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const projectRecordSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string().min(1),
  short_description: z.string().min(1),
  category: z.string().min(1),
  cover_image: z.string().nullable(),
  github_url: z.string().url().nullable(),
  demo_url: z.string().url().nullable(),
  featured: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
  sort_order: z.number().int(),
  published: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  technologies: z.array(z.string()),
});

export type ProjectRecord = z.infer<typeof projectRecordSchema>;

// Merged shape the UI actually consumes: DB metadata + optional MDX case study.
export const projectSchema = projectRecordSchema.extend({
  caseStudy: z
    .object({
      frontmatter: projectFrontmatterSchema,
      content: z.string(), // raw MDX body, rendered by the case-study page
    })
    .nullable(),
});

export type Project = z.infer<typeof projectSchema>;
