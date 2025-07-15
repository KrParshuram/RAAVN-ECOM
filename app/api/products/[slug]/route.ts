import { supabaseRoute } from "@/lib/supabaseRoute";
import { ok, fail } from "@/lib/jsonResponse";
import type { NextRequest } from "next/server";

// manually define `params` as a Promise
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const db = supabaseRoute();

  const { data, error } = await db
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return fail(error.message, 404);
  return ok(data);
}
