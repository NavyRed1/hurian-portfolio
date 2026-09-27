// Minimal hand-written Supabase Database type.
// Regenerate with the Supabase CLI once your schema is live:
//   supabase gen types typescript --project-id <ref> > types/database.ts

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      skills: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      projects: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      project_technologies: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      experiences: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      achievements: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      activities: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      site_settings: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
    };
  };
};
