import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().min(1),
  location: z.string().nullable(),
  email_public: z.string().email().nullable(),
  resume_url: z.string().url().nullable(),
  avatar_url: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  linkedin_url: z.string().url().nullable(),
  visibility: z.enum(["public", "private"]),
  updated_at: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
