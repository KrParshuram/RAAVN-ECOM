// components/product/ProductStory.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ProductStoryProps = {
  imageUrls?: string[]; // optional images array
};

export function ProductStory({ imageUrls }: ProductStoryProps) {
  const fallbackImages = [
    "https://picsum.photos/id/11/600/400",
    "https://picsum.photos/id/13/600/400",
  ];

  const images = imageUrls?.length === 2 ? imageUrls : fallbackImages;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-8">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-center text-white"
      >
        The Story Behind This Product
      </motion.h2>

      {/* Images side by side */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg hover:scale-[1.015] transition-transform"
          >
            <Image
              src={src}
              alt={`Lifestyle shot ${i + 1}`}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* Story Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-zinc-400 text-center max-w-3xl mx-auto text-base leading-relaxed"
      >
        Born out of the desire to combine comfort with effortless style,
        this piece is inspired by the calm of twilight skies and the vibrance
        of urban life. Designed for creators, wanderers, and thinkers — wear it
        your way, wherever you go.
      </motion.p>
    </section>
  );
}
