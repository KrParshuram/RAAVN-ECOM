// components/product/SocialProof.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type Review = {
  id: number;
  name: string;
  avatarUrl?: string;
  rating: number; // 1–5
  comment: string;
};

type SocialProofProps = {
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
};

const Stars = ({ value }: { value: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={i < value ? "w-4 h-4 fill-yellow-400 text-yellow-400" : "w-4 h-4 text-zinc-500"}
      />
    ))}
  </div>
);

export function SocialProof({
  averageRating = 4.5,
  totalReviews = 24,
  reviews = [
    {
      id: 1,
      name: "Sneha",
      rating: 5,
      comment: "Softest tee I've ever owned! Colors stay bright after washing.",
      avatarUrl: "/avatars/1.png",
    },
    {
      id: 2,
      name: "Rajan",
      rating: 4,
      comment: "Great fit and breathable fabric. Perfect for Indian summers.",
      avatarUrl: "/avatars/2.png",
    },
    {
      id: 3,
      name: "Aisha",
      rating: 5,
      comment: "Stitching quality is top-notch. Definitely buying more!",
    },
  ],
}: SocialProofProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Rating Summary */}
        <Card className="bg-zinc-900 border border-zinc-800 text-white text-center hover:scale-105 transition-transform duration-300">
          <CardHeader className="space-y-2 flex flex-col items-center">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <Stars value={Math.round(averageRating)} />
            <p className="text-sm text-zinc-400">{totalReviews} verified reviews</p>
          </CardHeader>
        </Card>

        {/* First 2 Reviews */}
        {reviews.slice(0, 2).map((r) => (
          <Card
            key={r.id}
            className="bg-zinc-900 border border-zinc-800 hover:scale-105 transition-transform duration-300 text-white"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-zinc-700">
                  {r.avatarUrl && <AvatarImage src={r.avatarUrl} alt={r.name} />}
                  <AvatarFallback className="text-xs bg-zinc-700 text-white">
                    {r.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-white">{r.name}</span>
                  <Stars value={r.rating} />
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">“{r.comment}”</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
