// components/product/LikeButton.tsx
"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import supabase from "@/lib/supabaseBrowser";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  productId: string;
  initialLiked?: boolean;
  initialCount?: number;
  className?: string;
}

export default function LikeButton({
  productId,
  initialLiked = false,
  initialCount = 0,
  className,
}: LikeButtonProps) {
  const { user, isSignedIn } = useUser();
  const userId = user?.id;

  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  /* ── check only if user liked ───────────────────────────── */
  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { data } = await supabase
        .from("product_likes")
        .select("id")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .maybeSingle();

      if (data) setLiked(true);
    })();
  }, [userId, productId]);

  /* ── like toggle ─────────────────────────────────────────── */
 const toggleLike = async () => {
  if (!isSignedIn) {
    toast.warning("Please sign in first");
    return;
  }
  if (!userId) {
    toast.error("User not loaded. Try again.");
    return;
  }

  /* ---------- optimistic UI ---------- */
  const prevLiked = liked;
  const prevCount = count;
  const nextLiked = !prevLiked;

  setLiked(nextLiked);
  setCount(prevCount + (nextLiked ? 1 : -1));

  /* ---------- DB write --------------- */
  try {
    if (nextLiked) {
      const { error } = await supabase
        .from("product_likes")
        .insert({ user_id: userId, product_id: productId }, )
        .select(); // ignore result
      if (error && error.code !== "23505") throw error; // ignore duplicate
    } else {
      const { error } = await supabase
        .from("product_likes")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);
      if (error) throw error;
    }
  } catch (err: any) {
    /* ---------- rollback on failure ---- */
    setLiked(prevLiked);
    setCount(prevCount);
    toast.error("Couldn’t update like. Try again.");
    console.error("toggleLike error", err.message || err);
  }
};


  /* ── render ─────────────────────────────────────────────── */
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={toggleLike}
        aria-pressed={liked}
        className={cn(
          "rounded-full p-2 transition",
          liked
            ? "bg-red-500/10 text-red-500"
            : "bg-zinc-800 hover:bg-zinc-700"
        )}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition",
            liked && "fill-red-500 text-red-500"
          )}
        />
      </button>
      <span className="text-sm text-zinc-400">{count} likes</span>
    </div>
  );
}
