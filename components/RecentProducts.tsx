import Link from "next/link";
import Image from "next/image";

export type ProductPreview = {
  id: string;
  slug: string;
  title: string;
  price: number;
  statement?: string | null;
  image_paths: string[];
};

export type RecentlyViewedItem = {
  viewed_at: string;
  products: ProductPreview;
};

interface RecentProductsProps {
  recentProducts: RecentlyViewedItem[];
}

export default function RecentProducts({
  recentProducts,
}: RecentProductsProps) {
  if (recentProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="uppercase tracking-[0.35em] text-xs text-zinc-500">
            Continue Exploring
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-3">
            Recently Viewed
          </h2>
        </div>

        <Link
          href="/recently-viewed"
          className="text-sm uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition"
        >
          View All →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map(({ viewed_at, products }) => (
          <Link
            key={products.id}
            href={`/products/${products.slug}`}
            className="group"
          >
            <div className="overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={
                    products.image_paths[0] ??
                    "/placeholder.jpg"
                  }
                  alt={products.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg">
                  {products.title}
                </h3>

                {products.statement && (
                  <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
                    {products.statement}
                  </p>
                )}

                <div className="mt-5 flex justify-between items-center">
                  <span className="font-bold">
                    ₹{products.price}
                  </span>

                  <span className="text-xs text-zinc-500">
                    {new Date(viewed_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}