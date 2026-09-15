import type { Profile } from "@/lib/schemas/profile";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-content justify-between px-5 font-sans text-[13px] text-ink-dim md:px-8">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js + Supabase</span>
      </div>
    </footer>
  );
}
