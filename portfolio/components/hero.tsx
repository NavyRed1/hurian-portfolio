import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/schemas/profile";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="py-28 text-center md:py-32">
      <p className="mb-4 text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
        {profile.headline}
      </p>
      <h1 className="mx-auto mb-5 max-w-3xl text-[36px] font-extrabold leading-[1.06] tracking-tight md:text-[64px]">
        I&rsquo;m {profile.name}.
      </h1>
      <p className="mx-auto mb-8 max-w-md text-lg italic" style={{ color: "var(--ink-soft)" }}>
        {profile.bio}
      </p>
      <div className="flex justify-center gap-5">
        <Button href="#skills" variant="fill">Explore my work</Button>
        <Button href="#contact" variant="glass">Get in touch</Button>
      </div>
    </section>
  );
}
