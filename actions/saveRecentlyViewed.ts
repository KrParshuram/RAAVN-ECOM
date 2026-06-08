"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export async function saveRecentlyViewed(
  userId: string,
  productId: string
) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("recently_viewed")
    .upsert(
      {
        user_id: userId,
        product_id: productId,
        viewed_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,product_id",
      }
    )
    .select();

//   console.log("Recently Viewed Data:", data);
//   console.log("Recently Viewed Error:", error);
}