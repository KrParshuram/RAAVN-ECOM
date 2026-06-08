"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Review = {
id: string;

userName: string;

avatarUrl?: string;

rating: number;

comment: string;

verified?: boolean;

createdAt?: string;
};

interface SocialProofProps {
averageRating?: number;

totalReviews?: number;

reviews?: Review[];
}

function Stars({ rating }: { rating: number }) {
return ( <div className="flex gap-1">
{Array.from({ length: 5 }).map((_, i) => (
<Star
key={i}
className={
i < rating
? "h-4 w-4 fill-yellow-400 text-yellow-400"
: "h-4 w-4 text-zinc-600"
}
/>
))} </div>
);
}

export function SocialProof({
averageRating = 4.8,
totalReviews = 128,
reviews = [],
}: SocialProofProps) {
return ( <section className="max-w-7xl mx-auto px-6 py-24">
        
  <div className="border-t border-zinc-800 pt-16">

    <div className="mb-12">

      <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-4">
        Community
      </p>

      <h2 className="text-4xl md:text-5xl font-black">
        What People Are Saying
      </h2>

    </div>

    <div className="grid lg:grid-cols-4 gap-6">

      {/* Rating Summary */}

      <div
        className="
          border
          border-zinc-800
          rounded-2xl
          p-8
          bg-zinc-950
          flex
          flex-col
          justify-center
        "
      >
        <div className="text-5xl font-black">
          {averageRating.toFixed(1)}
        </div>

        <div className="mt-4">
          <Stars rating={Math.round(averageRating)} />
        </div>

        <p className="text-zinc-500 mt-3">
          {totalReviews} reviews
        </p>
      </div>

      {/* Reviews */}

      {reviews.length === 0 && (
  <div
    className="
      lg:col-span-3
      border
      border-zinc-800
      rounded-2xl
      p-10
      bg-zinc-950
      text-center
    "
  >
    <p className="text-zinc-400">
      No reviews yet.
    </p>

    <p className="text-zinc-600 mt-2 text-sm">
      Be the first to share your thoughts.
    </p>
  </div>
)}

      {reviews.slice(0, 3).map((review) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="
            border
            border-zinc-800
            rounded-2xl
            p-6
            bg-zinc-950
          "
        >
          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="font-medium">
                {review.userName}
              </p>

              {review.createdAt && (
                <p className="text-xs text-zinc-500">
                  {review.createdAt}
                </p>
              )}
            </div>


          </div>

          <Stars rating={review.rating} />

          <p className="mt-4 text-zinc-400 leading-relaxed">
            "{review.comment}"
          </p>
        </motion.div>
      ))}

    </div>

  </div>

</section>


);
}
