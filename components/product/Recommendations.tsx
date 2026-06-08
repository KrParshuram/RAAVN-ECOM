import Link from "next/link";
import Image from "next/image";

export default function Recommendations({
  products,
}: {
  products: any[];
}) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="border-t border-zinc-800 pt-16">

        <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-4">
          For You
        </p>

        <h2 className="text-4xl font-black mb-12">
          Recommended
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl">

                <Image
                  src={
                    product.image_paths?.[0]
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

              <h3 className="mt-4 font-semibold">
                {product.title}
              </h3>

              <p className="text-zinc-500 mt-1">
                ₹{product.price}
              </p>
            </Link>
          ))}
        </div>

      </div>

    </section>
  );
}