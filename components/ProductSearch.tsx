"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import ProductList from "@/components/ProductList";
import type { DBProduct } from "@/components/productCard";

interface ProductSearchProps {
  products: DBProduct[];
}

export default function ProductSearch({
  products,
}: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] =
    useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return products;
    }

    const search =
      debouncedQuery.toLowerCase();

    return products.filter((product) => {
      const title =
        product.title?.toLowerCase() ?? "";

      const statement =
        product.statement?.toLowerCase() ??
        "";

      const description =
        product.description?.toLowerCase() ??
        "";

      return (
        title.includes(search) ||
        statement.includes(search) ||
        description.includes(search)
      );
    });
  }, [products, debouncedQuery]);

  return (
    <>
      {/* SEARCH */}

      <section className="max-w-3xl mx-auto px-4 mb-12">

        <div className="relative">

          <Search
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              h-5
              w-5
              text-zinc-500
            "
          />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search stories, statements, drops..."
            className="
              w-full
              h-14
              rounded-2xl
              bg-zinc-900
              border
              border-zinc-800
              pl-12
              pr-12
              outline-none
              focus:border-white
              transition
            "
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
                hover:text-white
              "
            >
              <X className="h-5 w-5" />
            </button>
          )}

        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">

          <span>
            {filteredProducts.length} pieces
          </span>

          {debouncedQuery && (
            <span>
              Searching "{debouncedQuery}"
            </span>
          )}

        </div>

      </section>

      {/* RESULTS */}

      {filteredProducts.length > 0 ? (
        <ProductList
          products={filteredProducts}
        />
      ) : (
        <section className="py-32 text-center">

          <div className="text-6xl mb-4">
            🔍
          </div>

          <h2 className="text-3xl font-bold">
            Nothing Found
          </h2>

          <p className="text-zinc-500 mt-4">
            Try another statement,
            story, or keyword.
          </p>

        </section>
      )}
    </>
  );
}