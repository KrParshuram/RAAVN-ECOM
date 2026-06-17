import { notFound } from "next/navigation";
import Link from "next/link";
import  {supabaseServer}  from "@/lib/supabaseServer";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DropPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await supabaseServer();

  const { data: drop } = await supabase
    .from("drops")
    .select(`
      *,
      products (*)
    `)
    .eq("slug", slug)
    .single();

  if (!drop) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}

      <section className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-28">

          <p className="mb-6 text-xs uppercase tracking-[0.6em] text-zinc-500">
            RAAVN DROP
          </p>

          <h1 className="text-6xl font-black uppercase md:text-8xl">
            {drop.title}
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-zinc-300">
            {drop.manifesto}
          </p>

          <div className="mt-12 flex flex-wrap gap-4">

            <span className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.35em]">
              {drop.status}
            </span>

            <span className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-zinc-400">
              {drop.products.length} Products
            </span>

          </div>

        </div>

      </section>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-16 flex items-center justify-between">

          <h2 className="text-4xl font-black uppercase">
            Collection
          </h2>

          <span className="text-zinc-500">
            {drop.products.length} Pieces
          </span>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {drop.products.map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl bg-zinc-900">

                <img
                  src={product.image_paths[0]}
                  alt={product.title}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="mt-5">

                <h3 className="text-2xl font-bold">
                  {product.title}
                </h3>

                <p className="mt-2 text-zinc-500">
                  {product.statement}
                </p>

                <p className="mt-5 text-lg font-semibold">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}