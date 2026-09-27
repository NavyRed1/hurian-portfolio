-- 002_rls_policies.sql
-- Public read of published/visible rows only. All writes require an
-- authenticated admin. Adjust the admin check to your own auth model
-- (e.g. a specific user id, or a custom `is_admin` claim on the JWT).

alter table profiles enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table project_technologies enable row level security;
alter table experiences enable row level security;
alter table achievements enable row level security;
alter table activities enable row level security;
alter table site_settings enable row level security;

-- Helper: treat any authenticated user as admin for this single-owner
-- portfolio. Replace with an allow-list check if you add more users.
create or replace function is_admin()
returns boolean as $$
  select auth.uid() is not null;
$$ language sql stable;

-- profiles: public can read only visibility = 'public'
create policy "public read visible profile" on profiles
  for select using (visibility = 'public');
create policy "admin full access profiles" on profiles
  for all using (is_admin()) with check (is_admin());

-- skills
create policy "public read visible skills" on skills
  for select using (visible = true);
create policy "admin full access skills" on skills
  for all using (is_admin()) with check (is_admin());

-- projects
create policy "public read published projects" on projects
  for select using (published = true);
create policy "admin full access projects" on projects
  for all using (is_admin()) with check (is_admin());

-- project_technologies (readable if parent project is published)
create policy "public read tech of published projects" on project_technologies
  for select using (
    exists (select 1 from projects p where p.id = project_id and p.published = true)
  );
create policy "admin full access project_technologies" on project_technologies
  for all using (is_admin()) with check (is_admin());

-- experiences
create policy "public read visible experiences" on experiences
  for select using (visible = true);
create policy "admin full access experiences" on experiences
  for all using (is_admin()) with check (is_admin());

-- achievements
create policy "public read visible achievements" on achievements
  for select using (visible = true);
create policy "admin full access achievements" on achievements
  for all using (is_admin()) with check (is_admin());

-- activities
create policy "public read visible activities" on activities
  for select using (visible = true);
create policy "admin full access activities" on activities
  for all using (is_admin()) with check (is_admin());

-- site_settings: public read, admin write
create policy "public read site_settings" on site_settings
  for select using (true);
create policy "admin write site_settings" on site_settings
  for insert with check (is_admin());
create policy "admin update site_settings" on site_settings
  for update using (is_admin()) with check (is_admin());
