"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/schemas/profile";

export function Contact({ profile }: { profile: Profile }) {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="border-t py-24" style={{ borderColor: "var(--line)" }}>
      <div className="mb-11 text-center">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>Get in touch</p>
        <h2 className="text-3xl font-extrabold tracking-tight">Let&rsquo;s work together</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          {profile.phone && <InfoRow icon="✆" label="Call" value={profile.phone} />}
          {profile.email_public && <InfoRow icon="✉" label="Email" value={profile.email_public} />}
          {profile.location && <InfoRow icon="◎" label="Location" value={profile.location} />}
          <div className="mt-5 flex gap-3">
            {profile.linkedin_url && <Button href={profile.linkedin_url} variant="glass" className="!px-5 !py-2.5 !text-[13px]">LinkedIn</Button>}
            {profile.github_url && <Button href={profile.github_url} variant="glass" className="!px-5 !py-2.5 !text-[13px]">GitHub</Button>}
          </div>
        </div>

        {/*
          UI-only in this scaffold: wire this to a Server Action (e.g. an email
          provider or a Supabase table insert) before relying on it in production.
        */}
        <form
          className="glass flex flex-col gap-3.5 rounded-panel p-7"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input className="glass-input" type="text" placeholder="Your name" required />
          <input className="glass-input" type="email" placeholder="Your email" required />
          <textarea className="glass-input min-h-[90px] resize-y" placeholder="Message" required />
          <button type="submit" className="btn btn-fill justify-center">
            {sent ? "Sent ✓" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 border-b py-4 font-semibold" style={{ borderColor: "var(--line)" }}>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border text-xs" style={{ borderColor: "var(--line)" }}>
        {icon}
      </div>
      <div>
        <div className="mb-0.5 text-[11px] font-medium uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>{label}</div>
        {value}
      </div>
    </div>
  );
}
