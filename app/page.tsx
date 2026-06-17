import { cache } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import ProductCard, { DBProduct } from "@/components/productCard";

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

type Drop = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  manifesto: string | null;
  hero_image: string | null;
  status: string;
};


/* -------------------------------------------------------------------------- */
/* DATA */
/* -------------------------------------------------------------------------- */

const getActiveDrop = cache(async (): Promise<Drop | null> => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("drops")
    .select("*")
    .eq("status", "live")
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
});

const getDropProducts = cache(
  async (dropId: string): Promise<DBProduct[]> => {
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("drop_id", dropId)
      .order("created_at");

    if (error) {
      console.error(error);
      return [];
    }

    return (data ?? []) as DBProduct[];
  }
);

/* -------------------------------------------------------------------------- */
/* HERO */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 h-screen flex flex-col justify-between py-10">
        <div>
          <p className="uppercase tracking-[0.45em] text-zinc-500 text-xs">
            RAAVN
          </p>
        </div>

          <div className="space-y-4">
            <h1 className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-black leading-[0.88] tracking-tight">
              I'M NOT
              <br />
              YOUR GOD.
            </h1>

            <h1 className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-black leading-[0.88] tracking-tight text-white/20">
              I'M NOT
              <br />
              YOUR VILLAIN.
            </h1>

            <p className="max-w-md pt-8 text-zinc-400 text-lg">
              Statement pieces for people who stopped asking for permission.
            </p>
          </div>

        <div>
          <p className="uppercase tracking-[0.35em] text-zinc-600 text-xs">
            Scroll to enter
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* MANIFESTO */
/* -------------------------------------------------------------------------- */

function ManifestoSection({
  manifesto,
}: {
  manifesto: string | null;
}) {
  return (
    <section className="bg-black text-white py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs">
              Manifesto
            </p>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] max-w-5xl">
              {manifesto}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* DROP INTRO */
/* -------------------------------------------------------------------------- */

function DropIntro({ drop }: { drop: Drop }) {
  return (
    <section className="bg-black text-white py-32 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-8">
          Current Drop
        </p>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-10">
          {drop.title}
        </h2>

        <p className="max-w-2xl text-zinc-400 text-lg leading-relaxed">
          {drop.description}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PRODUCTS */
/* -------------------------------------------------------------------------- */

function ProductsSection({
  products,
}: {
  products: DBProduct[];
}) {
  return (
    <section className="bg-black text-white pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* COMMUNITY */
/* -------------------------------------------------------------------------- */

function CommunitySection() {
  return (
    <section className="border-t border-zinc-900 bg-black text-white py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-6">
          Community
        </p>

        <h2 className="text-4xl md:text-6xl font-black mb-8">
          ENTER THE CIRCLE
        </h2>

        <p className="text-zinc-400 mb-12">
          Early access to drops. Behind-the-scenes releases.
          Collection previews. No noise.
        </p>

        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 border border-zinc-800 bg-transparent px-5 py-4 text-white outline-none"
          />

          <button
            type="submit"
            className="px-8 py-4 bg-white text-black font-medium"
          >
            Join
          </button>
        </form>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE */
/* -------------------------------------------------------------------------- */

export default async function HomePage() {

  const activeDrop = await getActiveDrop();

  // only call when we have a userId


  if (!activeDrop) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        No active drop found.
      </main>
    );
  }

  const products = await getDropProducts(
    activeDrop.id
  );

  return (
    <main className="bg-black min-h-screen">
      <HeroSection />

      <ManifestoSection
        manifesto={activeDrop.manifesto}
      />

      <DropIntro drop={activeDrop} />

      <ProductsSection products={products} />


      <CommunitySection />
    </main>
  );
}