"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client. Uses only the public URL + anon key.
 * Respects Row Level Security — never has service-role access.
 *
 * Not parameterized with a Database generic: the placeholder in
 * types/database.ts uses index-signature Row shapes that make Supabase's
 * typed query builder collapse to `never`. Once you run
 * `supabase gen types typescript --project-id <ref> > types/database.ts`,
 * swap this back to `createBrowserClient<Database>(...)`.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
