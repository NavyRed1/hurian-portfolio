-- seed.sql
-- Real content for Hurian Yahya Tebe's portfolio, as supplied directly by
-- the site owner. Nothing here is invented — update it as your real
-- profile, skills, activities, and experience change.

insert into profiles (name, headline, bio, location, phone, education, email_public, github_url, linkedin_url, visibility)
values (
  'Hurian Yahya Tebe',
  'Siswa Programmer Andalan',
  'A passionate developer and leader recognized with a Gold Medal at OSN Informatika. My journey spans programming, design, language, and organizational leadership.',
  'Makassar, Indonesia',
  '+62 821 3773 7621',
  'SMAN 9 Makassar',
  'fullcompetitive7@gmail.com',
  null,
  'https://linkedin.com',
  'public'
);

insert into skills (category, name, description, tags, sort_order, visible) values
  ('Visual Systems', 'UI/UX Design', 'Human-centered design using Figma and Adobe XD, building design systems including typography scales, color palettes, and reusable components.', array['Design systems','Interface architecture','Interaction design','Responsive layouts'], 1, true),
  ('Full-Stack Architecture', 'Web Development', 'Modern JavaScript frameworks and utility-first CSS, focused on building fast, responsive single-page applications.', array['Tailwind CSS','Modern JavaScript','Responsive engineering','Performance'], 2, true),
  ('Algorithms', 'Competitive Programming', 'Gold Medalist, OSN Informatika. Deep understanding of time and space complexity using C++ and Python.', array['Data structures','Dynamic programming','Graph theory','Mathematical modeling'], 3, true),
  ('Organizational Growth', 'Leadership', 'President Director of Asselena Student Company — financial planning, marketing strategy, and operational workflows.', array['Project management','Strategic planning','Public speaking','Team mentorship'], 4, true);

-- Languages/tools shown in the scrolling strip come from these tags —
-- add a small "Languages" skill row if you want it to include more.
insert into skills (category, name, description, tags, sort_order, visible) values
  ('Languages', 'Programming Languages', null, array['Python','CSS','JavaScript','HTML','C++','Flutter'], 5, true);

insert into achievements (title, organization, date, description, evidence_url, sort_order, visible) values
  ('Gold Medal, OSN Informatika', 'Dinas Pendidikan Provinsi Sulawesi Selatan', '2024-01-01', 'National-level recognition in competitive programming.', null, 1, true),
  ('Siswa Programmer Andalan', 'SMAN 9 Makassar', '2024-01-01', 'Acknowledged for significant contributions to the regional tech community.', 'https://sites.google.com/view/hurianportfolio/youth-coding', 2, true);

insert into activities (title, category, description, external_url, sort_order, visible) values
  ('Student Company', 'Organization', 'President Director of Asselena Student Company, leading the group to win regionals and represent South Sulawesi nationally.', 'https://sites.google.com/view/hurianportfolio/student-company', 1, true),
  ('English Camp', 'Event', 'Speech performer and mentor for over 500 students, building communication skills through a week-long program.', 'https://sites.google.com/view/hurianportfolio/english-camp', 2, true),
  ('Youth Coding', 'Achievement', 'Recognized by Dinas Pendidikan Provinsi Sulawesi Selatan as Siswa Programmer Andalan SMAN 9 Makassar.', 'https://sites.google.com/view/hurianportfolio/youth-coding', 3, true);

insert into experiences (organization, role, description, start_date, sort_order, visible) values
  ('English', 'Global Communications', 'Delivered speeches and facilitated discussions across international platforms, mastering the art of engaging diverse audiences through structured, confident communication.', '2023-01-01', 1, true),
  ('Sastra', 'Literature & Arts', 'Wrote poetry and prose, and directed theatrical performances blending traditional Indonesian narratives with contemporary creative expression.', '2023-01-01', 2, true),
  ('Company', 'Corporate Leadership', 'Spearheaded strategy as President Director, optimizing operations and guiding a team of young professionals to regional milestones.', '2024-01-01', 3, true);

insert into site_settings (site_title, site_description, accent_color, theme)
values ('Hurian Yahya Tebe', 'Portfolio of Hurian Yahya Tebe — programming, design, language, and leadership.', '#FFD60A', 'light');
