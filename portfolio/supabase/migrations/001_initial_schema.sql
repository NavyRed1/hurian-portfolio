-- 001_initial_schema.sql
-- Core portfolio schema: profiles, skills, projects, experience, achievements, activities, settings.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  headline text not null,
  bio text not null,
  location text,
  email_public text,
  resume_url text,
  avatar_url text,
  github_url text,
  linkedin_url text,
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  updated_at timestamptz not null default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Data Science', 'Machine Learning', 'AI', 'Software Engineering', 'Visualization')),
  name text not null,
  description text,
  icon text,
  sort_order integer not null default 0,
  visible boolean not null default true
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  category text not null,
  cover_image text,
  github_url text,
  demo_url text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_technologies (
  project_id uuid not null references projects(id) on delete cascade,
  technology text not null,
  primary key (project_id, technology)
);

create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  role text not null,
  description text not null,
  start_date date not null,
  end_date date,
  location text,
  sort_order integer not null default 0,
  visible boolean not null default true
);

create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text,
  date date not null,
  description text not null,
  evidence_url text,
  sort_order integer not null default 0,
  visible boolean not null default true
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  image text,
  external_url text,
  date date,
  sort_order integer not null default 0,
  visible boolean not null default true
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text not null,
  site_description text not null,
  accent_color text not null default '#EA6113',
  theme text not null default 'dark',
  updated_at timestamptz not null default now()
);

-- keep updated_at fresh on write
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger trg_projects_updated_at before update on projects
  for each row execute function set_updated_at();
create trigger trg_site_settings_updated_at before update on site_settings
  for each row execute function set_updated_at();

-- Added for the About section: phone + education display fields.
alter table profiles add column if not exists phone text;
alter table profiles add column if not exists education text;
