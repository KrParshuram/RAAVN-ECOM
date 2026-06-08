import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import { getRecentlyViewed }
  from "@/lib/recentlyViewed";

export default async function RecentlyViewedPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const products =
    await getRecentlyViewed(userId);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <p className="uppercase tracking-[0.35em] text-xs text-zinc-500">
          History
        </p>

        <h1 className="text-5xl md:text-7xl font-black mt-4">
          Continue Exploring
        </h1>

        <p className="text-zinc-500 mt-4">
          Pieces you've recently viewed.
        </p>

      </section>

      {/* EMPTY STATE */}

      {products.length === 0 ? (
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">

          <h2 className="text-3xl font-bold">
            No viewing history yet
          </h2>

          <p className="text-zinc-500 mt-4">
            Explore products and they'll
            appear here.
          </p>

          <Link
            href="/products"
            className="
              inline-flex
              mt-8
              px-6
              py-3
              border
              border-zinc-700
              rounded-lg
              hover:border-white
              transition
            "
          >
            Browse Collection
          </Link>

        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-6 pb-24">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map((item: any) => {
              const product =
                item.products;

              if (!product) {
                return null;
              }

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <div
                    className="
                      border
                      border-zinc-800
                      rounded-2xl
                      overflow-hidden
                      bg-zinc-950
                    "
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-square overflow-hidden">

                      <Image
                        src={
                          product.image_paths?.[0] ??
                          "/placeholder.jpg"
                        }
                        alt={product.title}
                        fill
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-110
                        "
                      />

                    </div>

                    {/* CONTENT */}

                    <div className="p-5">

                      <h3 className="text-xl font-semibold">
                        {product.title}
                      </h3>

                      {product.statement && (
                        <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
                          {product.statement}
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between">

                        <p className="font-bold text-lg">
                          ₹{product.price}
                        </p>

                        <p className="text-xs text-zinc-500">
                            {new Date(
                                item.viewed_at
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                day: "numeric",
                                month: "short",
                                }
                            )}
                            </p>

                      </div>

                    </div>

                  </div>
                </Link>
              );
            })}

          </div>

        </section>
      )}

    </main>
  );
}