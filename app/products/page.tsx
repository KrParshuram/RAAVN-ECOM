

import { cache } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import ProductSearch
  from "@/components/ProductSearch";
import type { DBProduct } from "@/components/productCard";
// import PhilosophyGrid from '@/components/PhilosophyGrid'

export const revalidate = 600;

const getActiveDrop = cache(async () => {
  const supabase = supabaseServer();

  const { data } = await supabase
    .from("drops")
    .select("*")
    .eq("status", "live" )
    .single();

  return data;
});



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
  // const products = await getProducts();
  const activeDrop = await getActiveDrop();
  const products = await getProducts();


  return (
   <main className="min-h-screen bg-black text-white py-12 w-full">
  {/* ── Page Header ───────────────────────────────────────────────── */}
      <section className="px-6 pt-20 md:pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          
        <div className="flex items-center gap-2 uppercase tracking-[0.4em] text-zinc-300 text-xs mb-8">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
          <span>LIVE</span>
        </div>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-tight max-w-6xl">
            {activeDrop?.title}
          </h1>

          <div className="mt-12 grid lg:grid-cols-12 gap-10">

            <div className="lg:col-span-7">
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
                {activeDrop?.description}
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="text-zinc-500 leading-relaxed">
                Designed for people who stopped asking for permission.
                Limited garments. Permanent statements.
              </p>

              <p className="mt-6 text-sm uppercase tracking-[0.25em] text-zinc-600">
                {products.length} Pieces In This Release
              </p>
            </div>

          </div>

        </div>
      </section>

  {/* ── Product List or Empty ────────────────────────────────────── */}
  <div className="w-full">
    {products.length > 0 ? (
      <section className="border-t border-zinc-800">
        <ProductSearch products={products} />
      </section>
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
  {/* <PhilosophyGrid /> */}
    

</main>

  );
}
 