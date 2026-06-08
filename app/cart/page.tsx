"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabaseBrowser";
import CartItem from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import type { CartItemProps } from "@/components/cart/CartList";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [items, setItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          size,
          quantity,
          product:product_id (
            title,
            price,
            image_paths
          )
        `)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching cart items:", error.message);
        return;
      }

      const cartItems: CartItemProps[] = (data || []).map((item: any) => ({
        id: item.id,
        title: item.product?.title ?? "Unknown Product",
        price: item.product?.price ?? 0,
        image: item.product?.image_paths?.[0] ?? "/fallback.png",
        size: item.size,
        quantity: item.quantity,
      }));

      setItems(cartItems);
      setLoading(false);
    };

    fetchCartItems();
  }, [user]);

  const onIncrement = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.quantity + 1;

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("id", id);

    if (!error) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const onRemove = async (id: string) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (!error) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-white">
        <p className="animate-pulse text-gray-400">Loading your cart...</p>
      </div>
    );
  }

return (
  <main className="min-h-screen bg-black text-white">
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

      {/* Header */}

      <div className="mb-20">
        <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-6">
          Cart
        </p>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
          YOUR
          <br />
          SELECTION.
        </h1>

        <p className="mt-8 text-zinc-400 max-w-xl text-lg">
          The pieces you've chosen to carry forward.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="py-32 border-t border-zinc-800">

          <h2 className="text-3xl md:text-5xl font-black mb-6">
            NOTHING HERE YET.
          </h2>

          <p className="text-zinc-500 max-w-md">
            The pieces that speak to you
            will appear here.
          </p>

        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-16">

          <div className="space-y-8">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                size={item.size}
                quantity={item.quantity}
                onIncrement={() =>
                  onIncrement(item.id)
                }
                onRemove={() =>
                  onRemove(item.id)
                }
              />
            ))}
          </div>

          <div className="lg:sticky lg:top-32 h-fit">
            <CartSummary
              total={total}
              onCheckout={() => router.push("/checkout")}
            />
          </div>

        </div>
      )}
    </div>
  </main>
);
}
