"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabaseBrowser";

interface Address {
  id: string;
  user_id: string;
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

interface AddressFormProps {
  onSuccess: (newAddress: Address) => void;
}

export default function AddressForm({ onSuccess }: AddressFormProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const { data, error } = await supabase
  .from("addresses")
  .insert([
    {
      user_id: user.id,                    // Clerk ID (string)
      name: form.name,
      phone: form.phone,
      address_line_1: form.address_line_1,
      address_line_2: form.address_line_2,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      country: form.country,
    }
  ])
  .select();

    setLoading(false);

    if (error) {
      console.error("Address insert error:", error.message);
      alert("Something went wrong while saving the address.");
      return;
    }

    if (data && data.length > 0) {
      onSuccess(data[0]);
    }
  };

  return (
<form
  onSubmit={handleSubmit}
  className="space-y-12"
>
  {/* Header */}

  <div>
    <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-4">
      Delivery
    </p>

    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
      DELIVERY
      <br />
      DETAILS.
    </h2>
  </div>

  {/* Form */}

  <div className="grid md:grid-cols-2 gap-10">

    <div>
      <label className="block text-sm text-zinc-500 mb-3">
        Full Name
      </label>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        className="
          w-full
          bg-transparent
          border-b
          border-zinc-700
          pb-3
          text-white
          outline-none
          focus:border-white
        "
      />
    </div>

    <div>
      <label className="block text-sm text-zinc-500 mb-3">
        Phone
      </label>

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        required
        className="
          w-full
          bg-transparent
          border-b
          border-zinc-700
          pb-3
          text-white
          outline-none
          focus:border-white
        "
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-sm text-zinc-500 mb-3">
        Address Line 1
      </label>

      <input
        name="address_line_1"
        value={form.address_line_1}
        onChange={handleChange}
        required
        className="
          w-full
          bg-transparent
          border-b
          border-zinc-700
          pb-3
          text-white
          outline-none
          focus:border-white
        "
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-sm text-zinc-500 mb-3">
        Address Line 2
      </label>

      <input
        name="address_line_2"
        value={form.address_line_2}
        onChange={handleChange}
        className="
          w-full
          bg-transparent
          border-b
          border-zinc-700
          pb-3
          text-white
          outline-none
          focus:border-white
        "
      />
    </div>

    <div>
      <label className="block text-sm text-zinc-500 mb-3">
        City
      </label>

      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        required
        className="
          w-full
          bg-transparent
          border-b
          border-zinc-700
          pb-3
          text-white
          outline-none
          focus:border-white
        "
      />
    </div>

    <div>
      <label className="block text-sm text-zinc-500 mb-3">
        State
      </label>

      <input
        name="state"
        value={form.state}
        onChange={handleChange}
        required
        className="
          w-full
          bg-transparent
          border-b
          border-zinc-700
          pb-3
          text-white
          outline-none
          focus:border-white
        "
      />
    </div>

    <div>
      <label className="block text-sm text-zinc-500 mb-3">
        Pincode
      </label>

      <input
        name="pincode"
        value={form.pincode}
        onChange={handleChange}
        required
        className="
          w-full
          bg-transparent
          border-b
          border-zinc-700
          pb-3
          text-white
          outline-none
          focus:border-white
        "
      />
    </div>

    <div>
      <label className="block text-sm text-zinc-500 mb-3">
        Country
      </label>

      <input
        name="country"
        value={form.country}
        onChange={handleChange}
        required
        className="
          w-full
          bg-transparent
          border-b
          border-zinc-700
          pb-3
          text-white
          outline-none
          focus:border-white
        "
      />
    </div>

  </div>

  {/* CTA */}

  <button
    type="submit"
    disabled={loading}
    className="
      w-full
      h-14
      bg-white
      text-black
      font-medium
      hover:bg-zinc-200
      transition
    "
  >
    {loading
      ? "SAVING..."
      : "SAVE DELIVERY DETAILS"}
  </button>
</form>
  );
}
