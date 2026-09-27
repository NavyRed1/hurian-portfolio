-- 004_content_updates.sql
-- Follow-up changes once real content replaced the placeholder DS/ML persona:
-- skill categories became free-text (UI/UX, Web Dev, Competitive Programming,
-- Leadership...) instead of a fixed DS/ML enum, and skills gained a "tags"
-- list used by the homepage skill-detail panel.

alter table skills drop constraint if exists skills_category_check;
alter table skills add column if not exists tags text[] not null default '{}';
