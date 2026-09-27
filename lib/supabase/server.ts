import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client for Server Components, Server Actions,
 * and Route Handlers. Reads the session from cookies.
 * Still subject to RLS — this is NOT the service-role client.
 *
 * Not parameterized with a Database generic: the placeholder in
 * types/database.ts uses index-signature Row shapes that make Supabase's
 * typed query builder collapse to `never` (this is exactly what broke the
 * build). Once you run
 * `supabase gen types typescript --project-id <ref> > types/database.ts`,
 * swap this back to `createServerClient<Database>(...)`.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component with no mutable cookie store.
            // Safe to ignore when middleware refreshes the session.
          }
        },
      },
    }
  );
}

/**
 * Service-role client. SERVER-ONLY. Bypasses RLS.
 * Never import this file into a Client Component or expose it to the browser.
 * Use only inside protected Server Actions / Route Handlers for admin writes
 * that legitimately need to bypass RLS (rare — prefer the RLS-scoped client above).
 */
export function createServiceRoleClient() {
  if (typeof window !== "undefined") {
    throw new Error("createServiceRoleClient must never run in the browser.");
  }
  const { createClient: createSupabaseClient } = require("@supabase/supabase-js");
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
