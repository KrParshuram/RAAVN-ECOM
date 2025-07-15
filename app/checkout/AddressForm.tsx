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
      className="bg-neutral-900 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md"
    >
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="bg-neutral-800 text-white p-3 rounded-md placeholder:text-gray-400"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        pattern="[0-9]{10}"
        title="Enter 10-digit phone number"
        required
        className="bg-neutral-800 text-white p-3 rounded-md placeholder:text-gray-400"
      />
      <input
        name="address_line_1"
        placeholder="Address Line 1"
        value={form.address_line_1}
        onChange={handleChange}
        required
        className="col-span-full bg-neutral-800 text-white p-3 rounded-md placeholder:text-gray-400"
      />
      <input
        name="address_line_2"
        placeholder="Address Line 2"
        value={form.address_line_2}
        onChange={handleChange}
        className="col-span-full bg-neutral-800 text-white p-3 rounded-md placeholder:text-gray-400"
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
        className="bg-neutral-800 text-white p-3 rounded-md placeholder:text-gray-400"
      />
      <input
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        required
        className="bg-neutral-800 text-white p-3 rounded-md placeholder:text-gray-400"
      />
      <input
        name="pincode"
        placeholder="Pincode"
        value={form.pincode}
        onChange={handleChange}
        pattern="[0-9]{6}"
        title="Enter 6-digit pincode"
        required
        className="bg-neutral-800 text-white p-3 rounded-md placeholder:text-gray-400"
      />
      <input
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
        className="bg-neutral-800 text-white p-3 rounded-md placeholder:text-gray-400"
      />

      <div className="col-span-full">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </div>
    </form>
  );
}
