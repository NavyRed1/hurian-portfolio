import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/schemas/profile";

export function Navbar({ profile }: { profile: Profile }) {
  const firstName = profile.name.split(" ")[0].toLowerCase();
  return (
    <header className="border-b border-line py-6">
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 md:px-8">
        <Link href="/" className="font-display text-[17px] font-bold text-ink">
          {firstName}.
        </Link>
        <div className="hidden gap-7 md:flex">
          <Link href="#projects" className="font-sans text-sm font-medium text-ink-dim hover:text-ink">Projects</Link>
          <Link href="#experience" className="font-sans text-sm font-medium text-ink-dim hover:text-ink">Experience</Link>
          <Link href="#skills" className="font-sans text-sm font-medium text-ink-dim hover:text-ink">Skills</Link>
          <Link href="#contact" className="font-sans text-sm font-medium text-ink-dim hover:text-ink">Contact</Link>
        </div>
        {profile.resume_url && (
          <Button href={profile.resume_url} className="!px-4 !py-2 !text-[13px]">Resume</Button>
        )}
      </nav>
    </header>
  );
}
