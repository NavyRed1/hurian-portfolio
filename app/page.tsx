import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Achievements } from "@/components/achievements";
import { Activities } from "@/components/activities";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getProfile } from "@/lib/content/profile";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getSkillsByCategory } from "@/lib/content/skills";
import { getExperiences } from "@/lib/content/experience";
import { getAchievements } from "@/lib/content/achievements";
import { getActivities } from "@/lib/content/activities";

export default async function HomePage() {
  const [profile, projects, skills, experiences, achievements, activities] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getSkillsByCategory(),
    getExperiences(),
    getAchievements(),
    getActivities(),
  ]);

  return (
    <>
      <Navbar profile={profile} />
      <main className="mx-auto max-w-content px-5 md:px-8">
        <Hero profile={profile} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Skills categories={skills} />
        <Achievements achievements={achievements} />
        <Activities activities={activities} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
