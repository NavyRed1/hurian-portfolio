import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Profile } from "@/lib/schemas/profile";

export function Navbar({ profile }: { profile: Profile }) {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--bg) 78%, transparent)", backdropFilter: "blur(16px)" }}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="text-sm font-bold" style={{ color: "var(--ink)" }}>
          {profile.name}
        </Link>
        <div className="hidden gap-7 md:flex">
          {[
            ["About", "#about"],
            ["Skills", "#skills"],
            ["Activities", "#activities"],
            ["Experiences", "#experiences"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] font-semibold" style={{ color: "var(--ink-soft)" }}>
              {label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
