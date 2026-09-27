# Supabase setup

1. Create a project at https://supabase.com.
2. Copy `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` into `.env.local` (never commit this file).
3. Run the migrations in order against your project, via the Supabase CLI:
   ```
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```
   or paste each file's contents into the SQL editor in order:
   `001_initial_schema.sql` → `002_rls_policies.sql` → `003_indexes.sql`.
4. Optionally run `seed.sql` after replacing its placeholder values.
5. Create your one admin user under Authentication → Users. `is_admin()`
   in `002_rls_policies.sql` currently treats any authenticated user as
   admin — tighten this (e.g. an explicit user id check) before inviting
   anyone else.
