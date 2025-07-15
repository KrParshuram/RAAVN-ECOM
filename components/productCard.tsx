"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/addtocart";

/* Supabase product row ---------------------------------------------------- */
export type DBProduct = {
  id: string;
  drop_id?: string | null;
  title: string;
  slug: string;
  price: number;
  sizes: string[];
  image_paths: string[];
  description?: string | null;
  likes?: number | null;
  created_at: string;
};

/* ------------------------------------------------------------------------ */
export default function ProductCard({ product }: { product: DBProduct }) {
  const imgSrc = product.image_paths?.[0] ?? "/placeholder.jpg";
  const likeCount = product.likes ?? 0;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Main shell ------------------------------------------------------- */}
      <Card
        /* ✨ Black + glass + glow */
        className={[
          "relative w-full max-w-xs flex flex-col overflow-hidden",
          "rounded-2xl border border-zinc-700/60 bg-gradient-to-b",
          "from-[#151515] via-[#0f0f0f] to-black/90",
          "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.7)]",
          "hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.85)]",
          "transition-shadow duration-300",
          /* subtle neon ring on hover */
          "before:pointer-events-none before:absolute before:inset-0",
          "before:rounded-[inherit] before:opacity-0 before:transition-opacity",
          "before:border before:border-primary before:blur-[6px]",
          "hover:before:opacity-30",
        ].join(" ")}
      >
        {/* ‑‑‑ Image + like badge --------------------------------------- */}
        <CardHeader className="p-3 relative group">
          <Link
            href={`/products/${product.slug}`}
            className="block rounded-xl overflow-hidden"
          >
            <Image
              src={imgSrc}
              alt={product.title}
              width={320}
              height={320}
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
            />
          </Link>

          {/* Likes ------------------------------------------------------ */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs rounded-full backdrop-blur-md bg-white/5 ring-1 ring-white/10">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 drop-shadow-[0_0_3px_rgba(255,0,0,0.6)]" />
            <Tooltip delayDuration={80}>
              <TooltipTrigger asChild>
                <span className="text-[18px] font-semibold text-white">
                  {likeCount}
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="text-sm backdrop-blur bg-black/80 text-white"
              >
                {likeCount} raavns like this
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>

        {/* ‑‑‑ Product info --------------------------------------------- */}
        <CardContent className="px-4 pb-3 space-y-1">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            <h2 className="text-lg font-semibold tracking-tight line-clamp-2 text-white">
              {product.title}
            </h2>
            <p className="text-xs text-zinc-400">Presented by</p>
            <p className="text-sm font-medium text-zinc-100">Drop 01</p>
          </Link>

          <p className="text-sm text-zinc-400 mt-2">
            ₹{product.price.toFixed(2)}
          </p>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.sizes.map((size) => (
                <Badge
                  key={size}
                  variant="outline"
                  className="text-xs border-zinc-600 text-zinc-300"
                >
                  {size}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        {/* ‑‑‑ CTA ------------------------------------------------------- */}
        <CardFooter className="px-4 pb-4 mt-auto flex flex-col gap-3">
          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              image: imgSrc,
            }}
          />

          <Link href={`/products/${product.slug}`} className="w-full">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-center gap-2 bg-zinc-800 text-primary-foreground hover:bg-zinc-500"
            >
              View
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
