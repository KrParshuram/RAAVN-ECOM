"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabaseBrowser"; // your client-side Supabase instance

export default function AddToCartButton({ product }: { product: any }) {
  const dispatch = useDispatch();
  const { user, isSignedIn } = useUser();

  const handleAdd = async () => {
    if (!isSignedIn) {
      toast.warning("Please sign in first");
      return;
    }

    // 1. Local Redux update
    dispatch(addToCart({ ...product, quantity: 1 }));

    // 2. Supabase DB update
    const { error } = await supabase.from("cart_items").upsert({
      user_id: user.id,
      product_id: product.id,
      size: product.size ?? "M", // adjust as needed
      quantity: 1,
    });

    if (error) {
      console.error("DB cart insert failed", error);
      toast.error("Couldn't save to cart");
    } else {
      toast.success("Added to cart", {
        description: product.title,
        duration: 2000,
      });
    }
  };

  return (
    <Button
      onClick={handleAdd}
      className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-white hover:bg-zinc-500 transition-colors"
    >
      <ShoppingCart size={16} />
      Add to Cart
    </Button>
  );
}
