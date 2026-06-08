
// app/products/[slug]/page.tsx
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductHero from "@/components/product/ProductHero";
import { supabaseServer } from "@/lib/supabaseServer";
import { ProductDetails } from "@/components/product/ProductDetails";
import { SocialProof } from "@/components/product/SocialProof";
import { saveRecentlyViewed }
  from "@/actions/saveRecentlyViewed";
import { getProductReviews }
  from "@/lib/reviews";
import ReviewForm from "@/components/product/ReviewForm";
import {
  getRecommendations,
} from "@/lib/recommendations";
import Recommendations from "@/components/product/Recommendations";
async function getProduct(slug: string) {
  const supabase = supabaseServer();

  

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

  return data;
}

async function getDrop(dropId: string) {
  const supabase = supabaseServer();

  const { data } = await supabase
    .from("drops")
    .select("*")
    .eq("id", dropId)
    .single();

  return data;
}

async function getRelatedProducts(
  dropId: string,
  productId: string
) {
  const supabase = supabaseServer();

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("drop_id", dropId)
    .neq("id", productId)
    .limit(3);

  return data ?? [];
}




export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { userId } = await auth();
  // console.log("User ID:", userId);

  const product = await getProduct(slug);
    if (!product) {
    notFound();
  }



if (userId) {
  // console.log(
  //   "Saving recently viewed:",
  //   product.id
  // );

  await saveRecentlyViewed(
    userId,
    product.id
  );
}

const recommendations =
  userId
    ? await getRecommendations(
        userId,
        product.id
      )
    : [];

  const reviewData =
  await getProductReviews(product.id);

  const formattedReviews =
  reviewData.reviews.map(
    (review) => ({
      id: review.id,

      userName: "Raavn Member",

      rating: review.rating,

      comment:
        review.review_text ?? "",

      createdAt:
        new Date(
          review.created_at
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
          }
        ),

      verified: false,
    })
  );



  const drop = await getDrop(product.drop_id);

  const relatedProducts = await getRelatedProducts(
    product.drop_id,
    product.id
  );

  const heroImage =
    product.image_paths?.[0] ?? "/placeholder.jpg";

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}
<ProductHero
  product={product}
  drop={drop}
/>

      {/* STATEMENT */}
{product.statement && (
  <section className="max-w-4xl mx-auto px-6 py-10 text-center">
    <p className="text-2xl md:text-4xl italic text-zinc-300">
      "{product.statement}"
    </p>
  </section>
)}

      {/* STORY */}

      <section className="max-w-4xl mx-auto px-6 py-32">

        <div className="border-t border-zinc-800 pt-20">

          <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-8">
            The Story
          </p>

          <div className="text-2xl md:text-4xl leading-relaxed font-light">
            {product.product_story}
          </div>

        </div>

      </section>
<ProductDetails
  material={product.material ?? "280 GSM Cotton"}
  fit={product.fit ?? "Oversized Fit"}
  care={
    product.care ??
    "Machine wash cold. Iron inside out."
  }
  construction={
    product.construction ??
    "Double stitched seams."
  }
  dropType="Limited Release"
/>

      {/* DESCRIPTION */}

      {product.description && (
       <section className="max-w-4xl mx-auto px-6 py-24">

  <div className="border-t border-zinc-800 pt-16">

    <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-8">
      Details
    </p>

    <p className="text-zinc-300 leading-8 text-lg">
      {product.description}
    </p>

  </div>

</section>
      )}

      {/* RELATED */}

      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="border-t border-zinc-800 pt-16">

            <h2 className="text-4xl font-black mb-12">
              Continue The Collection
            </h2>

            <p className="text-zinc-500 mb-12">
              More pieces from {drop?.title}
            </p>

            <div className="grid md:grid-cols-3 gap-8">

              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={item.image_paths?.[0]}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">
                    {item.title}
                  </h3>
                  {item.statement && (
  <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
    {item.statement}
  </p>
)}

                  <p className="text-zinc-500 mt-1">
                    ₹{item.price}
                  </p>
                </Link>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* MANIFESTO */}

      {drop?.manifesto && (
        <section className="max-w-4xl mx-auto px-6 py-32 text-center">

          <div className="border-t border-zinc-800 pt-20">

            <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-8">
              Manifesto
            </p>

            <p className="text-2xl md:text-4xl leading-relaxed font-light">
              {drop.manifesto}
            </p>

          </div>

        </section>
        
      )}
<SocialProof
  averageRating={
    reviewData.averageRating
  }
  totalReviews={
    reviewData.totalReviews
  }
  reviews={formattedReviews}
/>
{/* review form  */}
<ReviewForm
  productId={product.id}
/>

      {/* RECOMMENDATIONS */}

      <Recommendations
        products={recommendations}
       />
    </main>
  );
}

