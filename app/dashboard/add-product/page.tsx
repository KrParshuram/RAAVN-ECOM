"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseBrowser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    sizes: "",
    category: "", // not used in schema, optional
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!form.title || !form.description || !form.price || !form.image) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title: form.title,
          slug: slugify(form.title),
          price: Number(form.price),
          sizes: form.sizes
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s), // convert CSV to array
          image_paths: [form.image],
          description: form.description,
          drop_id: null, // Optional, can be filled later
          likes: 0,
        },
      ])
      .select();

    setLoading(false);

    if (error) {
      console.error("Insert error:", error.message);
      setErrorMsg("Failed to add product. Check console.");
      return;
    }

    router.push("/dashboard/products");
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <div className="space-y-4">
        <Input
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          name="price"
          type="number"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
        />
        <Input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <Input
          name="sizes"
          placeholder="Sizes (comma-separated, e.g. S,M,L,XL)"
          value={form.sizes}
          onChange={handleChange}
        />

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-white text-black hover:bg-gray-100 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </div>
    </div>
  );
}
