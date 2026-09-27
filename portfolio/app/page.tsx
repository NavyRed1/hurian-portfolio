import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { LangStrip } from "@/components/lang-strip";
import { Activities } from "@/components/activities";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getProfile } from "@/lib/content/profile";
import { getSkills } from "@/lib/content/skills";
import { getExperiences } from "@/lib/content/experience";
import { getAchievements } from "@/lib/content/achievements";
import { getActivities } from "@/lib/content/activities";

export default async function HomePage() {
  const [profile, skills, experiences, achievements, activities] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperiences(),
    getAchievements(),
    getActivities(),
  ]);

  // Feeds the scrolling strip beneath Skills — every tag across every skill, deduped.
  const languageTags = Array.from(new Set(skills.flatMap((s) => s.tags)));
  const topAchievement = achievements[0] ?? null;

  return (
    <>
      <Navbar profile={profile} />
      <main className="mx-auto max-w-content px-5 md:px-8">
        <Hero profile={profile} />
      </main>
      <div className="mx-auto max-w-content px-5 md:px-8">
        <About profile={profile} topAchievement={topAchievement} />
        <Skills skills={skills} />
      </div>
      <LangStrip items={languageTags} />
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Activities activities={activities} />
        <Experience experiences={experiences} />
        <Contact profile={profile} />
      </div>
      <Footer profile={profile} />
    </>
  );
}
