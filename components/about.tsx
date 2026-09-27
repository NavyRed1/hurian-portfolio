import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/schemas/profile";
import type { Achievement } from "@/lib/schemas/experience";

export function About({ profile, topAchievement }: { profile: Profile; topAchievement: Achievement | null }) {
  const rows: [string, string | null][] = [
    ["Achievement", topAchievement?.title ?? null],
    ["Education", profile.education],
    ["Phone", profile.phone],
    ["Email", profile.email_public],
    ["Location", profile.location],
  ].filter(([, value]) => value !== null) as [string, string][];

  return (
    <section id="about" className="border-t py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mb-11 text-center">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>About</p>
        <h2 className="text-3xl font-extrabold tracking-tight">A bit about me</h2>
      </div>

      <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[340px_1fr]">
        <div className="aspect-[4/5] overflow-hidden rounded-panel border" style={{ borderColor: "var(--line)" }}>
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt={profile.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: "var(--ink-soft)" }}>
              Photo
            </div>
          )}
        </div>

        <div>
          <div className="mb-1 text-2xl font-extrabold">Hi there, I&rsquo;m {profile.name.split(" ")[0]}</div>
          <div className="mb-5 text-[13px] font-bold uppercase tracking-wide">{profile.headline}</div>
          <p className="mb-7 max-w-xl text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>{profile.bio}</p>

          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[110px_1fr] border-b py-2.5 text-sm font-semibold" style={{ borderColor: "var(--line)" }}>
              <span className="font-medium" style={{ color: "var(--ink-soft)" }}>{label}</span>
              <span>{value}</span>
            </div>
          ))}

          <Button href="#contact" variant="glass" className="mt-7">Let&rsquo;s get in touch</Button>
        </div>
      </div>
    </section>
  );
}
