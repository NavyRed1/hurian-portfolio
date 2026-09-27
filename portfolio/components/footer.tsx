import type { Profile } from "@/lib/schemas/profile";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t py-11" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex max-w-content justify-between px-5 text-[13px] font-semibold md:px-8" style={{ color: "var(--ink-soft)" }}>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
