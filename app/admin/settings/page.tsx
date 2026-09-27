import { createClient } from "@/lib/supabase/server";
import { updateSettings } from "@/lib/actions/settings";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").limit(1).single();
  const action = updateSettings.bind(null, settings?.id);
  const inputClass = "rounded-btn border border-line bg-panel px-4 py-2.5 text-sm text-ink";

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink">Settings</h1>
      <form action={action} className="flex max-w-lg flex-col gap-4">
        <input name="site_title" defaultValue={settings?.site_title} placeholder="Site title" className={inputClass} />
        <textarea name="site_description" defaultValue={settings?.site_description} placeholder="Site description" rows={3} className={inputClass} />
        <input name="accent_color" defaultValue={settings?.accent_color} placeholder="Accent color" className={inputClass} />
        <button type="submit" className="btn btn-fill justify-center">Save settings</button>
      </form>
    </div>
  );
}
