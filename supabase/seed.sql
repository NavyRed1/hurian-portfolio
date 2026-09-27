-- seed.sql
-- Placeholder seed data. Replace every value with your own verified content
-- before running against a real database — nothing here should ship as-is.

insert into profiles (name, headline, bio, location, email_public, github_url, linkedin_url, visibility)
values (
  'Your Name',
  'Data Scientist & Machine Learning Engineer',
  'Replace with your real bio.',
  'Your City, Country',
  'you@example.com',
  'https://github.com/yourname',
  'https://linkedin.com/in/yourname',
  'public'
);

insert into skills (category, name, sort_order, visible) values
  ('Data Science', 'Python', 1, true),
  ('Data Science', 'Pandas', 2, true),
  ('Machine Learning', 'scikit-learn', 1, true),
  ('Software Engineering', 'TypeScript', 1, true),
  ('Visualization', 'Recharts', 1, true);

insert into site_settings (site_title, site_description, accent_color, theme)
values ('Your Name', 'Data science and machine learning portfolio.', '#EA6113', 'dark');
