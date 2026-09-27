/**
 * Applies supabase/seed.sql to the database pointed at by your environment
 * variables. Requires SUPABASE_SERVICE_ROLE_KEY (server-only) to be set.
 * Run with: npm run seed
 *
 * This intentionally does not run automatically on build/deploy — seeding
 * is a manual, explicit action.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment.");
    process.exit(1);
  }

  const sql = fs.readFileSync(path.join(process.cwd(), "supabase", "seed.sql"), "utf-8");
  const supabase = createClient(url, serviceKey);

  // Supabase JS has no raw SQL executor by default; running seed.sql requires
  // either the Supabase CLI (`supabase db execute -f supabase/seed.sql`)
  // or a Postgres function/RPC set up to accept raw SQL. This script is a
  // placeholder that documents the intent — prefer the CLI in practice.
  console.log("Use the Supabase CLI to run seed.sql:");
  console.log("  supabase db execute -f supabase/seed.sql");
}

main();
