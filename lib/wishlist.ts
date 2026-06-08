import { supabaseServer } from "@/lib/supabaseServer";

export async function getWishlist(userId: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("product_likes")
    .select(`
      liked_at,

      products (
        id,
        slug,
        title,
        statement,
        price,
        sizes,
        image_paths,

        drops (
          title
        )
      )
    `)
    .eq("user_id", userId)
    .order("liked_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}