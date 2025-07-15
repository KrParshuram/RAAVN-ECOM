"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabaseBrowser";
import CartItem from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import type { CartItemProps } from "@/components/cart/CartList";

export default function CartPage() {
  const [items, setItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

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
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-10 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-10">
          Your cart is empty. Browse products and add something to it.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                size={item.size}
                quantity={item.quantity}
                onIncrement={() => onIncrement(item.id)}
                onRemove={() => onRemove(item.id)}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="md:col-span-1">
            <CartSummary total={total} />
          </div>
        </div>
      )}
    </div>
  );
}
