import { supabaseRoute } from "@/lib/supabaseRoute";
import { auth } from "@clerk/nextjs/server";
import { fail, ok } from "assert";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }  // ✅ Treat as Promise
) {
  const resolvedParams = await context.params;
  const { slug } = resolvedParams;

  const { userId } = await auth();
  if (!userId) return fail("Login required", 401);

  const db = supabaseRoute();

  const { data: existing, error: fetchErr } = await db
    .from("product_likes")
    .select("user_id")
    .eq("user_id", userId)
    .eq("product_id", slug)
    .maybeSingle();

  if (fetchErr) return fail(fetchErr.message, 500);

  if (existing) {
    const { error: delErr } = await db
      .from("product_likes")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", slug);

    if (delErr) return fail(delErr.message, 500);
    return ok({ liked: false });
  } else {
    const { error: insertErr } = await db.from("product_likes").insert({
      user_id: userId,
      product_id: slug,
    });

    if (insertErr) return fail(insertErr.message, 500);
    return ok({ liked: true });
  }
}
