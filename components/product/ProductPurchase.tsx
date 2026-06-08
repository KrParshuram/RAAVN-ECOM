"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/addtocart";
import LikeButton from "@/components/product/LikeButton";

type ProductPurchaseProps = {
  productId: string;
  title: string;
  price: number;
  image: string;

  likes?: number;
  likedByUser?: boolean;

  sizes?: string[];
};

export default function ProductPurchase({
  productId,
  title,
  price,
  image,
  likes = 0,
  likedByUser = false,
  sizes = [],
}: ProductPurchaseProps) {
  const [selectedSize, setSelectedSize] = useState(
    sizes[0] ?? "M"
  );

  return (
    <section className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">

      {/* Price + Likes */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          ₹{price}
        </h2>

        <LikeButton
          productId={productId}
          initialLiked={likedByUser}
          initialCount={likes}
        />
      </div>

      {/* Sizes */}
      {sizes.length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-zinc-500 mb-3">
            Select Size
          </p>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  px-4 py-2 rounded-lg border transition
                  ${
                    selectedSize === size
                      ? "border-white bg-white text-black"
                      : "border-zinc-700 hover:border-zinc-500"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 space-y-3">

        <Button
          className="w-full h-12 text-base"
        >
          Buy Now
        </Button>

        <AddToCartButton
          product={{
            id: productId,
            title,
            price,
            image,
            size: selectedSize,
          }}
        />
      </div>
    </section>
  );
}