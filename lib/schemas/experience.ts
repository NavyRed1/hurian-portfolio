import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string().uuid(),
  organization: z.string().min(1),
  role: z.string().min(1),
  description: z.string().min(1),
  start_date: z.string(),
  end_date: z.string().nullable(),
  location: z.string().nullable(),
  sort_order: z.number().int(),
  visible: z.boolean(),
});

export type Experience = z.infer<typeof experienceSchema>;

export const achievementSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  organization: z.string().nullable(),
  date: z.string(),
  description: z.string().min(1),
  evidence_url: z.string().url().nullable(),
  sort_order: z.number().int(),
  visible: z.boolean(),
});

export type Achievement = z.infer<typeof achievementSchema>;

export const activitySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().nullable(),
  image: z.string().url().nullable(),
  external_url: z.string().url().nullable(),
  date: z.string().nullable(),
  sort_order: z.number().int(),
  visible: z.boolean(),
});

export type Activity = z.infer<typeof activitySchema>;
