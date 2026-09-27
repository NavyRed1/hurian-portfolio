# Portfolio — Hurian Yahya Tebe

A personal portfolio (programming, design, language, leadership) built with
Next.js (App Router) and Supabase (Postgres, Auth, Storage). Design system:
pure black/white with a single yellow (`#FFD60A`) hover glow, frosted-glass
surfaces on buttons/cards/inputs, and a day/night theme toggle.

The homepage sections are: Hero, About, Skills (click a card to expand its
detail panel), a scrolling language/tool strip, Activities, Experiences
(tabbed, not a carousel), and Contact (info + a UI-only message form — wire
the form to a real Server Action before relying on it).

The original scaffold also ships a full project case-study system (MDX +
`/admin/projects` CRUD) from an earlier direction of this project. It's not
linked in the current nav but is still there and working if you want to add
a projects section back later — see `content/projects/` and `app/projects/`.

## 1. Overview

Public pages are server-rendered from Supabase (profile, skills, experience,
achievements, activities, project metadata) merged with MDX case-study
content stored in Git. A private `/admin` dashboard, gated by Supabase Auth,
lets you edit everything except the long-form case-study narrative, which
stays version-controlled as MDX.

## 2. Tech stack

- Next.js (App Router), React, TypeScript, Tailwind CSS
- Supabase: Postgres, Auth, Storage, Row Level Security
- MDX for project case studies, Zod for runtime validation
- Deployed on Vercel

## 3. Architecture

```
GitHub MDX + Supabase DB + Storage
        ↓
  Content service (lib/content/*)
        ↓
  Zod validation (lib/schemas/*)
        ↓
      Next.js UI
        ↓
       Vercel
```

Admin writes go through Server Actions (`lib/actions/*`) using the
RLS-scoped Supabase server client — never the service-role key from the
browser.

## 4. Repository structure

See the `app/`, `components/`, `lib/`, `content/`, `supabase/`, and `types/`
directories. UI components never hardcode content — everything flows
through `lib/content/*`.

## 5. Local installation

```bash
npm install
cp .env.example .env.local
# fill in .env.local with your Supabase project's values
```

## 6. Environment variables

See `.env.example`. `SUPABASE_SERVICE_ROLE_KEY` must never be prefixed
with `NEXT_PUBLIC_` and must never be committed.

## 7. Supabase setup

See `supabase/README.md` for full steps: create a project, run the three
migrations in order, create your admin user.

## 8. Database migrations

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

## 9. Seed database

Replace every placeholder value in `supabase/seed.sql` with your real,
verified content first, then:

```bash
supabase db execute -f supabase/seed.sql
```

## 10. Adding a project

1. In `/admin/projects/new`, create the structured record (title, slug,
   links, technologies, visibility).
2. Add `content/projects/<slug>.mdx` with the matching frontmatter for the
   long-form case study (see `content/projects/student-performance.mdx`
   as a template).
3. Commit the MDX file to Git — it is not stored in the database.

## 11. Creating an MDX case study

Follow the section order: Problem, Data, Method, Modeling, Evaluation,
Results, Lessons. Use `<ProjectMetric />`, `<DatasetTable />`,
`<ModelComparison />`, `<ProjectChart />` — always with real values, never
fabricated numbers.

## 12. Uploading assets

Use Supabase Storage for images referenced by the database (avatar, project
covers). Public URLs come back from Storage and are stored in the relevant
`*_url` / `cover_image` columns.

## 13. Running locally

```bash
npm run dev
```

## 14. Production build

```bash
npm run build
npm run start
```

## 15. GitHub workflow

Use conventional commits (`feat:`, `fix:`, `style:`, `chore:`). Never commit
`.env.local` or any real credentials — `.gitignore` already excludes them.

## 16. Vercel deployment

Connect the GitHub repo to Vercel. Use Vercel's native Supabase integration
to sync `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
`SUPABASE_SERVICE_ROLE_KEY` as environment variables, or set them manually
under Project Settings → Environment Variables.

## 17. Admin dashboard access

Visit `/admin`. Unauthenticated visitors are redirected to `/admin/login`
by `middleware.ts`. Create your admin user in the Supabase dashboard under
Authentication → Users — this project assumes a single owner/admin.

---

**Before this is a real, deployed site:** replace every placeholder value
(name, bio, seed data, MDX case-study content, real project metrics) with
your own verified information. Nothing here should ship as-is.
