// app/api/products/[id]/like/route.ts
import { supabaseRoute } from "@/lib/supabaseRoute";
import { ok, fail } from "@/lib/jsonResponse";
import { auth } from "@clerk/nextjs/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return fail("Login required", 401);

  const db = supabaseRoute();
  const product_id = params.id;

  // check if already liked
  const { data: existing, error: fetchErr } = await db
    .from("product_likes")
    .select("user_id")
    .eq("user_id", userId)
    .eq("product_id", product_id)
    .maybeSingle();

  if (fetchErr) return fail(fetchErr.message, 500);

  if (existing) {
    // user has already liked → remove like
    const { error: delErr } = await db
      .from("product_likes")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", product_id);

    if (delErr) return fail(delErr.message, 500);
    return ok({ liked: false });
  } else {
    // user hasn’t liked → insert like
    const { error: insertErr } = await db.from("product_likes").insert({
      user_id: userId,
      product_id,
    });

    if (insertErr) return fail(insertErr.message, 500);
    return ok({ liked: true });
  }
}
