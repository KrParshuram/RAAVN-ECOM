// app/products/page.tsx

import { cache } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import ProductList from "@/components/ProductList";
import type { DBProduct } from "@/components/productCard";
import PhilosophyGrid from '@/components/PhilosophyGrid'

export const revalidate = 600;

const getProducts = cache(async (): Promise<DBProduct[]> => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return (data ?? []).map((p: any) => ({
    ...p,
    image_paths: p.image_paths ?? [],
    sizes: p.sizes ?? [],
  })) as DBProduct[];
});

export const metadata = {
  title: "Drops | Raavn",
  description:
    "Statement pieces forged in limited runs. Wear stories, not just colours.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
   <main className="min-h-screen bg-black text-white py-12 w-full">
  {/* ── Page Header ───────────────────────────────────────────────── */}
  <div className="max-w-4xl mx-auto px-4 text-center mb-12">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
      The Drop Wall
    </h1>
    <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
      “<span className="italic text-zinc-300">Wear stories, not just colours.</span>” <br />
      Limited-run pieces crafted for rebels — stand out, stay raw.
    </p>
  </div>

  {/* ── Product List or Empty ────────────────────────────────────── */}
  <div className="w-full">
    {products.length > 0 ? (
      <div className="border-t border-b border-zinc-800 bg-zinc-900">
        <ProductList products={products} />
      </div>
    ) : (
      <div className="py-32 text-center text-zinc-500">
        <div className="text-7xl mb-4">🕊️</div>
        <h2 className="text-xl font-semibold">Nothing here yet.</h2>
        <p className="text-sm mt-2">
          The ravens are still stitching. Check back soon.
        </p>
      </div>
    )}
  </div>
    
  <PhilosophyGrid />
</main>

  );
}
 