import Link from "next/link";
import { signOut } from "@/lib/actions/auth";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/activities", label: "Activities" },
  { href: "/admin/settings", label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-56 flex-col justify-between border-r border-line bg-panel p-5">
      <div>
        <div className="mb-6 font-display text-sm font-bold text-ink">Admin</div>
        <nav className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 font-sans text-sm text-ink-dim hover:bg-white/[0.04] hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <form action={signOut}>
        <button type="submit" className="font-sans text-sm text-ink-dim hover:text-ink">
          Sign out
        </button>
      </form>
    </aside>
  );
}
