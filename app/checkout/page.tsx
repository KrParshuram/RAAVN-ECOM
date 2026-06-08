"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabaseBrowser";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import type { CartItemProps } from "@/components/cart/CartList";

interface Address {
  id: string;
  // user_id: string;
  name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  created_at: string;
}

export default function CheckoutPage() {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setAddresses(data || []);
    };

    const fetchCart = async () => {
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

      if (!error) {
        const items: CartItemProps[] = (data || []).map((item: any) => ({
          id: item.id,
          title: item.product?.title ?? "Unknown",
          image: item.product?.image_paths?.[0] ?? "/fallback.png",
          price: item.product?.price ?? 0,
          size: item.size,
          quantity: item.quantity,
        }));
        setCartItems(items);
      }
    };

    fetchAddresses();
    fetchCart();
  }, [user]);

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    // You can later add Supabase order saving logic here
    alert("Order placed successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white space-y-8">
      <div className="mb-16">
  <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-4">
    Final Review
  </p>

  <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
    COMPLETE
    <br />
    THE STORY.
  </h1>

  <p className="mt-6 text-zinc-400 max-w-xl">
    Review your delivery details and
    confirm your selection.
  </p>
</div>
      <div className="grid lg:grid-cols-[1fr_420px] gap-16">
        {/* Address Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Delivery Address</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-blue-400 hover:underline text-sm"
            >
              {showForm ? "Cancel" : "Add New Address"}
            </button>
          </div>

          {showForm ? (
            <AddressForm
              onSuccess={(newAddress) => {
                setAddresses((prev) => [newAddress, ...prev]);
                setShowForm(false);
              }}
            />
          ) : (
            <AddressList
              addresses={addresses}
              selectedId={selectedAddress?.id}
              onSelect={(address) => setSelectedAddress(address)}
            />
          )}
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <OrderSummary items={cartItems} />
        </div>

        <div className="text-right">
          <button
            onClick={handlePlaceOrder}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
