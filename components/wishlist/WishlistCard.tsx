"use client";

import Image from "next/image";
import Link from "next/link";

import LikeButton from "@/components/product/LikeButton";
import AddToCartButton from "@/components/addtocart";

interface WishlistCardProps {
  product: any;
  likedAt: string;
}

export default function WishlistCard({
  product,
  likedAt,
}: WishlistCardProps) {
  const savedDate = new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  ).format(new Date(likedAt));

  return (
    <div
      className="
        group
        border
        border-zinc-800
        rounded-2xl
        overflow-hidden
        bg-zinc-950
      "
    >
      <div className="relative">

        <Link href={`/products/${product.slug}`}>

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

        </Link>

        <div className="absolute top-3 right-3">
          <LikeButton
            productId={product.id}
            initialLiked
            initialCount={0}
          />
        </div>
      </div>

      <div className="p-5">

        <p className="uppercase text-xs tracking-[0.25em] text-zinc-500">
          {product.drops?.title ?? "DROP"}
        </p>

        <h3 className="text-xl font-semibold mt-3">
          {product.title}
        </h3>

        {product.statement && (
          <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
            {product.statement}
          </p>
        )}

        <p className="text-xs text-zinc-600 mt-3">
          Saved {savedDate}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <p className="text-lg font-bold">
            ₹{product.price}
          </p>

        </div>

        <div className="mt-4">

          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              image:
                product.image_paths?.[0] ??
                "/placeholder.jpg",
              size: product.sizes?.[0] ?? "",
            }}
          />

        </div>

      </div>
    </div>
  );
}