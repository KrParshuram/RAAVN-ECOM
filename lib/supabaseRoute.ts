import { createClient } from "@supabase/supabase-js";

export function supabaseRoute() {
  console.log(
    "URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );

  console.log(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}