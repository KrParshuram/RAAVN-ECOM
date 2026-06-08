"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import LikeButton from "@/components/product/LikeButton";
import AddToCartButton from "@/components/addtocart";
import { SizeSelector, Size } from "@/components/product/SizeSelector";

interface ProductHeroProps {
product: {
id: string;
title: string;
slug: string;
price: number;


statement?: string | null;

image_paths?: string[];

sizes?: string[];

likes?: number;

drop_id: string;


};

drop?: {
title: string;
manifesto?: string | null;
};

reviewStats?: {
averageRating: number;
totalReviews: number;
};
}

export default function ProductHero({
product,
drop,
reviewStats,
}: ProductHeroProps) {
const images = product.image_paths ?? [];

const [activeImg, setActiveImg] = useState(
images[0] ?? "/placeholder.jpg"
);

const [selectedSize, setSelectedSize] =
  useState(product.sizes?.[0] ?? "");

return ( <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">

  <div className="grid lg:grid-cols-2 gap-16">

    {/* IMAGE GALLERY */}

    <div className="space-y-4">

      <motion.div
        key={activeImg}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="
          group
          relative
          aspect-square
          overflow-hidden
          rounded-2xl
          bg-zinc-900
          cursor-zoom-in
        "
      >
        <Image
          src={activeImg}
          alt={product.title}
          fill
          priority
          sizes="(max-width:768px) 100vw, 50vw"
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />
      </motion.div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">

          {images.map((src) => (
            <button
              key={src}
              onClick={() => setActiveImg(src)}
              className={cn(
                "relative h-24 w-24 shrink-0 overflow-hidden rounded-xl ring-1 transition",
                activeImg === src
                  ? "ring-white"
                  : "ring-zinc-800 opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt="Product thumbnail"
                fill
                className="object-cover"
              />
            </button>
          ))}

        </div>
      )}
    </div>

    {/* PRODUCT INFO */}

      <div className="flex flex-col justify-center">

        {drop?.title && (
          <p className="mb-8 uppercase tracking-[0.35em] text-xs text-zinc-500">
            {drop.title}
          </p>
        )}

        <div className="space-y-8">

          <div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
              {product.title}
            </h1>

          </div>

          {product.statement && (
            <p className="max-w-lg text-xl md:text-2xl text-zinc-400 italic leading-relaxed">
              {product.statement}
            </p>
          )}

          <div className="flex items-end justify-between border-b border-zinc-800 pb-8">

            <div>
              <p className="text-4xl md:text-5xl font-bold">
                ₹{product.price.toLocaleString()}
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Inclusive of all taxes
              </p>
            </div>

            <LikeButton
              productId={product.id}
              initialCount={product.likes ?? 0}
            />

          </div>

          {reviewStats && (
            <div className="text-sm text-zinc-500">
              ★ {reviewStats.averageRating} ·{" "}
              {reviewStats.totalReviews} Reviews
            </div>
          )}

          <div className="space-y-4">

            <p className="uppercase tracking-[0.2em] text-xs text-zinc-500">
              Select Size
            </p>

            <SizeSelector
              sizes={product.sizes ?? []}
              value={selectedSize}
              onChange={setSelectedSize}
            />

          </div>

          <div className="grid gap-3 pt-4">

            <Button
              className="h-14 bg-white text-black hover:bg-zinc-200 text-base font-medium"
            >
              Buy Now
            </Button>

            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: activeImg,
                size: selectedSize,
              }}
            />

          </div>

          <div className="pt-10 border-t border-zinc-800">

            <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">

              <p>
                100% heavyweight cotton.
              </p>

              <p>
                Relaxed oversized silhouette.
              </p>

              <p>
                Produced exclusively for this drop.
              </p>

              <p>
                Designed to age with wear.
              </p>

            </div>

          </div>

        </div>

      </div>

  </div>

</section>


);
}
