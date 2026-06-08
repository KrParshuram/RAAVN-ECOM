"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import supabase from "@/lib/supabaseBrowser";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({
  productId,
}: ReviewFormProps) {
  const { user, isSignedIn } = useUser();

  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);

  const [reviewText, setReviewText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submitReview = async () => {
    if (!isSignedIn) {
      toast.warning(
        "Sign in to leave a review"
      );
      return;
    }

    if (!reviewText.trim()) {
      toast.error(
        "Please write a review"
      );
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("reviews")
        .upsert(
          {
            user_id: user!.id,
            product_id: productId,
            rating,
            review_text: reviewText,
          },
          {
            onConflict:
              "user_id,product_id",
          }
        );

      if (error) {
        throw error;
      }

      toast.success(
        "Review submitted successfully"
      );

      setReviewText("");
      setRating(5);

      window.location.reload();
    } catch (error) {
      console.error(error);

      toast.error(
        "Couldn't submit review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">

      <div className="border-t border-zinc-800 pt-16">

        <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-4">
          Community
        </p>

        <h2 className="text-4xl font-black mb-10">
          Write A Review
        </h2>

        <div
          className="
            border
            border-zinc-800
            rounded-2xl
            p-8
            bg-zinc-950
          "
        >
          {/* Stars */}

          <div className="flex gap-2 mb-8">

            {[1, 2, 3, 4, 5].map(
              (star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setRating(star)
                  }
                  onMouseEnter={() =>
                    setHovered(star)
                  }
                  onMouseLeave={() =>
                    setHovered(0)
                  }
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-all",

                      (hovered
                        ? star <= hovered
                        : star <= rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-600"
                    )}
                  />
                </button>
              )
            )}

          </div>

          {/* Review */}

          <Textarea
            value={reviewText}
            onChange={(e) =>
              setReviewText(
                e.target.value
              )
            }
            placeholder="Tell others about the fit, quality, comfort, or overall experience..."
            className="
              min-h-[140px]
              bg-zinc-900
              border-zinc-800
              resize-none
            "
          />

          <Button
            onClick={submitReview}
            disabled={loading}
            className="
              mt-6
              w-full
              h-12
            "
          >
            {loading
              ? "Submitting..."
              : "Submit Review"}
          </Button>

        </div>

      </div>

    </section>
  );
}