/**
 * Walks content/projects/*.mdx and validates frontmatter against the Zod
 * schema, printing a clear file/field/expected/received error for anything
 * invalid. Run with: npm run validate-content
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projectFrontmatterSchema } from "../lib/schemas/project";

const dir = path.join(process.cwd(), "content", "projects");
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")) : [];

let hasErrors = false;

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf-8");
  const { data } = matter(raw);
  const result = projectFrontmatterSchema.safeParse(data);

  if (!result.success) {
    hasErrors = true;
    console.error(`\nInvalid frontmatter in content/projects/${file}:`);
    for (const issue of result.error.issues) {
      console.error(
        `  field: ${issue.path.join(".")}, expected: ${issue.message}, received: ${JSON.stringify(
          (data as any)[issue.path[0]]
        )}`
      );
    }
  }
}

if (hasErrors) {
  console.error(`\n${files.length} file(s) checked, errors found.`);
  process.exit(1);
} else {
  console.log(`${files.length} file(s) checked, all valid.`);
}
