// app/products/[slug]/page.tsx

import { supabaseServer } from "@/lib/supabaseServer";
import { ProductDetails } from "@/components/product/ProductDetails";
import ProductHero from "@/components/product/ProductHero";
import { ProductStory } from "@/components/product/ProductStory";
import { SocialProof } from "@/components/product/SocialProof";
import MarqueeStrip from "@/components/MarqueeStrip";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product, error } = await supabaseServer()
    .from("homepage_products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !product) {
    return <div className="p-6">Product not found.</div>;
  }

  const uniqueImages = Array.from(new Set(product.image_paths)) as string[];

  return (
    <main className="p-6">
      <ProductHero
        productId={product.id}
        title={product.title}
        category={product.drop_title}
        imageUrl={uniqueImages}
        price={product.price}
        likes={product.likes}
        likedByUser={false} // if you want to make it dynamic, handle with Clerk userId check
      />
      <ProductDetails />
      <MarqueeStrip />
      <ProductStory imageUrls={uniqueImages} />
      <SocialProof />
    </main>
  );
}
