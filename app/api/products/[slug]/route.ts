// app/api/products/[slug]/route.ts
import { supabaseRoute } from "@/lib/supabaseRoute";
import { ok, fail } from "@/lib/jsonResponse";

export const revalidate = 60;

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const db = supabaseRoute();

  const { data, error } = await db
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error) return fail(error.message, 404);
  return ok(data);
}
