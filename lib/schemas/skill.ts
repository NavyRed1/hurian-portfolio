import { z } from "zod";

export const skillSchema = z.object({
  id: z.string().uuid(),
  category: z.enum(["Data Science", "Machine Learning", "AI", "Software Engineering", "Visualization"]),
  name: z.string().min(1),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  sort_order: z.number().int(),
  visible: z.boolean(),
});

export type Skill = z.infer<typeof skillSchema>;

export const skillCategorySchema = z.object({
  category: skillSchema.shape.category,
  skills: z.array(skillSchema),
});

export type SkillCategoryGroup = z.infer<typeof skillCategorySchema>;
