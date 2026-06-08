"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export type DBProduct = {
  id: string;
  drop_id?: string | null;

  title: string;
  slug: string;

  price: number;

  sizes: string[];
  image_paths: string[];

  description?: string | null;

  statement?: string | null;
  product_story?: string | null;

  likes?: number | null;

  created_at: string;
};

export default function ProductCard({
  product,
}: {
  product: DBProduct;
}) {
  const imgSrc =
    product.image_paths?.[0] ??
    "/placeholder.jpg";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.3,
      }}
      className="group"
    >
      <Link
        href={`/products/${product.slug}`}
        className="block"
      >
        {/* IMAGE */}

        <div className="relative overflow-hidden bg-zinc-950 aspect-[4/5]">
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* INFO */}

        <div className="pt-6 space-y-3">
          <h3
            className="
            text-xl
            md:text-2xl
            font-semibold
            tracking-tight
            text-white
          "
          >
            {product.title}
          </h3>

          {product.statement && (
            <p
              className="
              text-zinc-500
              italic
              leading-relaxed
              max-w-sm
            "
            >
              {product.statement}
            </p>
          )}

          <p
            className="
            text-sm
            tracking-wide
            text-zinc-300
          "
          >
            ₹{product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}