import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/lib/actions/profile";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("*").limit(1).single();

  const action = updateProfile.bind(null, profile?.id);
  const inputClass = "rounded-btn border border-line bg-panel px-4 py-2.5 text-sm text-ink outline-none focus:border-sunset-3";

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink">Profile</h1>
      <form action={action} className="flex max-w-lg flex-col gap-4">
        <input name="name" defaultValue={profile?.name} placeholder="Name" className={inputClass} />
        <input name="headline" defaultValue={profile?.headline} placeholder="Headline" className={inputClass} />
        <textarea name="bio" defaultValue={profile?.bio} placeholder="Bio" rows={4} className={inputClass} />
        <input name="location" defaultValue={profile?.location ?? ""} placeholder="Location" className={inputClass} />
        <input name="email_public" defaultValue={profile?.email_public ?? ""} placeholder="Public email" className={inputClass} />
        <input name="github_url" defaultValue={profile?.github_url ?? ""} placeholder="GitHub URL" className={inputClass} />
        <input name="linkedin_url" defaultValue={profile?.linkedin_url ?? ""} placeholder="LinkedIn URL" className={inputClass} />
        <input name="resume_url" defaultValue={profile?.resume_url ?? ""} placeholder="Resume URL" className={inputClass} />
        <button type="submit" className="glass-btn glass-btn-primary justify-center">Save profile</button>
      </form>
    </div>
  );
}
