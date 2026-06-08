import { supabaseServer } from "@/lib/supabaseServer";

export async function getProductReviews(
  productId: string
) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    };
  }

  const totalReviews = data.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : Number(
          (
            data.reduce(
              (sum, review) =>
                sum + review.rating,
              0
            ) / totalReviews
          ).toFixed(1)
        );

  return {
    reviews: data,
    averageRating,
    totalReviews,
  };
}