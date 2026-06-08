import { supabaseServer } from "@/lib/supabaseServer";

export async function getRecommendations(
  userId: string,
  currentProductId: string
) {
  const supabase = supabaseServer();

  const { data: likedProducts } =
    await supabase
      .from("product_likes")
      .select(`
        products (
          drop_id
        )
      `)
      .eq("user_id", userId);

  const dropIds =
    likedProducts
      ?.map(
        (item: any) =>
          item.products?.drop_id
      )
      .filter(Boolean) ?? [];

  if (dropIds.length > 0) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .in("drop_id", dropIds)
      .neq("id", currentProductId)
      .limit(4);

    if (data?.length) {
      return data;
    }
  }

  const { data: fallback } =
    await supabase
      .from("products")
      .select("*")
      .neq("id", currentProductId)
      .order("created_at", {
        ascending: false,
      })
      .limit(4);

  return fallback ?? [];
}