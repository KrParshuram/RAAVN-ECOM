// Supabase for Next-JS route.ts handlers
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";

export const supabaseRoute = (): SupabaseClient =>
  createRouteHandlerClient({ cookies });
