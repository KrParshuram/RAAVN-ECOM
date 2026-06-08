import { supabaseServer } from "@/lib/supabaseServer";

export async function getRecentlyViewed(
  userId: string
) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("recently_viewed")
    .select(`
      viewed_at,

      products (
        id,
        slug,
        title,
        price,
        statement,
        image_paths
      )
    `)
    .eq("user_id", userId)
    .order("viewed_at", {
      ascending: false,
    })
    .limit(24);

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}