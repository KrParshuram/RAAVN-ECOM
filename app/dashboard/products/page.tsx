"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseBrowser";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10 text-white">
        <h2 className="text-lg font-medium mb-2">Loading products...</h2>
        <p className="text-gray-400">Please wait.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-10 text-white">
        <h2 className="text-lg font-medium mb-2">No products found</h2>
        <p className="text-gray-400">Start by adding a new product.</p>
      </div>
    );
  }

  return (
    <>
      {/* Add Product Button */}
      <div className="flex justify-center p-4">
        <Link href="/dashboard/add-product">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            + Add Product
          </button>
        </Link>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Manage Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-neutral-900 text-white border border-neutral-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              {product.image_paths?.length > 0 && (
                <Image
                  src={product.image_paths[0]}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
              <p className="text-gray-400 mb-1 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-bold mb-3">₹{product.price}</p>

              <div className="flex gap-2">
                <Link href={`/dashboard/products/edit/${product.id}`}>
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => console.log("Delete product ID:", product.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
