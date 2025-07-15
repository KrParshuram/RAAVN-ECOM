// components/product/ProductHero.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SizeSelector, Size } from "@/components/product/SizeSelector";
import AddToCartButton from "@/components/addtocart";
import LikeButton from "@/components/product/LikeButton";
 // Import if you need tooltips
interface ProductHeroProps {
  productId: string;
  title: string;
  category?: string | null;
  imageUrl?: string | string[] | null; // single or array
  likes: number;
  likedByUser?: boolean;
  price?: number;
}

export default function ProductHero({
  productId,
  title,
  category,
  imageUrl,
  likes,
  likedByUser = false,
  price,
}: ProductHeroProps) {
  /* ------------------------------------------------------------------ */
  /*                              Setup                                 */
  /* ------------------------------------------------------------------ */
  const images = Array.isArray(imageUrl)
    ? imageUrl
    : imageUrl
    ? [imageUrl]
    : [];

  const [activeImg, setActiveImg] = useState(images[0]);
  const [liked, setLiked] = useState(likedByUser);
  const [size, setSize] = useState<Size>("M");

  const displayLikes = liked ? likes + 1 : likes;

  /* ------------------------------------------------------------------ */
  /*                               UI                                   */
  /* ------------------------------------------------------------------ */
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-20 flex flex-col gap-12 md:flex-row md:gap-10">
      {/* --------------------- Image Gallery --------------------- */}
      {activeImg && (
        <div className="w-full md:w-1/2 space-y-4">
          {/* main image */}
          <motion.div
            key={activeImg}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="group w-full aspect-square relative overflow-hidden rounded-xl bg-zinc-800"
          >
            <Image
              src={activeImg}
              alt={title}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>


          {/* thumbs */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((src) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(src)}
                  className={cn(
                    "relative h-16 w-16 shrink-0 rounded-lg overflow-hidden transition ring-1 ring-transparent",
                    activeImg === src
                      ? "ring-primary"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={src}
                    alt="thumbnail"
                    fill
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------ Info Block ------------------------ */}
      <div
        className={cn(
          "flex-1 space-y-6",
          !activeImg && "text-center mx-auto max-w-lg"
        )}
      >
        {category && (
          <p className="uppercase tracking-wide text-xs text-zinc-400">
            {category}
          </p>
        )}

        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          {title}
        </h1>

        {/* likes */}
        <LikeButton
      productId={productId}
      initialLiked={likedByUser}
      initialCount={likes}
    />

        {/* size */}
        <SizeSelector value={size} onChange={setSize} />

        {/* price */}
        {price !== undefined && (
          <div className="text-2xl font-semibold text-white">
            ₹{price.toLocaleString()}
          </div>
        )}

        {/* CTA */}
        <div className="grid gap-3 pt-3">
          <Button
            className="w-full bg-zinc-700 hover:bg-zinc-500 transition p-5 "
            onMouseEnter={(e) => (e.currentTarget.innerText = "Wear Now")}
            onMouseLeave={(e) => (e.currentTarget.innerText = "Buy Now")}
          >
            Buy Now
          </Button>

          <AddToCartButton
            product={{
              title,
              price: price ?? 0,
              image: activeImg ?? "",
              size,
              id: productId, // needed for Supabase insert
            }}
          />
        </div>
      </div>
    </section>
  );
}
