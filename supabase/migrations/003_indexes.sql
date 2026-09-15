-- 003_indexes.sql
-- Indexes for the query patterns the content layer actually uses:
-- public listing pages filtered by visibility/published + sort_order,
-- and slug lookups for project detail pages.

create index if not exists idx_projects_published_sort on projects (published, sort_order);
create index if not exists idx_projects_slug on projects (slug);
create index if not exists idx_projects_featured on projects (featured) where featured = true;

create index if not exists idx_skills_visible_category_sort on skills (visible, category, sort_order);

create index if not exists idx_experiences_visible_sort on experiences (visible, sort_order);
create index if not exists idx_achievements_visible_sort on achievements (visible, sort_order);
create index if not exists idx_activities_visible_sort on activities (visible, sort_order);

create index if not exists idx_project_technologies_project_id on project_technologies (project_id);
