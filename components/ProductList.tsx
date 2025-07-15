"use client";

import ProductCard, { DBProduct } from "@/components/productCard";

export default function ProductList({ products }: { products?: DBProduct[] }) {
  if (!Array.isArray(products)) {
    return (
      <section className="p-6 md:p-10 lg:px-20 text-center text-gray-500">
        No products found.
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-20">
  <div className="max-w-7xl mx-auto">
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
</section>
  );
}
