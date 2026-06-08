"use client";

import ProductCard, {
  DBProduct,
} from "@/components/productCard";

export default function ProductList({
  products,
}: {
  products?: DBProduct[];
}) {
  if (!products || products.length === 0) {
    return (
      <section className="py-40 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-xs text-zinc-600 mb-6">
            Collection
          </p>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            NOTHING HERE YET.
          </h2>

          <p className="mt-8 text-zinc-500">
            New pieces will appear when the
            next story is ready to be told.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Collection Meta */}

        <div className="flex items-center justify-between mb-16">
          <p className="uppercase tracking-[0.35em] text-xs text-zinc-500">
            Collection
          </p>

          <p className="text-zinc-500 text-sm">
            {products.length} Pieces
          </p>
        </div>

        {/* Products */}

        <div className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
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