import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/schemas/profile";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="border-t border-line py-20">
      <h2 className="mb-9 font-display text-2xl font-bold text-ink">Contact</h2>
      <div className="flex flex-wrap gap-3">
        {profile.email_public && (
          <Button href={`mailto:${profile.email_public}`} variant="primary">Email</Button>
        )}
        {profile.github_url && <Button href={profile.github_url}>GitHub</Button>}
        {profile.linkedin_url && <Button href={profile.linkedin_url}>LinkedIn</Button>}
      </div>
    </section>
  );
}
