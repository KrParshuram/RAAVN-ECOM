

import React from "react";
import MarqueeStrip from "@/components/MarqueeStrip";
import ShadowTestimonial from "@/components/ShadowTestimonial";
import HoverMessageBlock from "@/components/HoverMessageBlock";
import PhilosophyGrid from "@/components/PhilosophyGrid";
import type { DBProduct } from "@/components/productCard";
import { supabaseServer } from "@/lib/supabaseServer";
import {NewsletterSection} from "@/components/NewsletterSection";
import { cache } from 'react'; // Add this import if using React 18+
// If you are using Next.js App Router, use: import { cache } from 'react';
/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Product = {
  id: number;
  quote: string;
  image: string;
};

/* -------------------------------------------------------------------------- */
/*                               HERO SECTION                                 */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="h-screen w-full bg-black text-white flex items-center justify-center text-center px-4">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          I am not your god.<br />I am not your villain.
        </h1>
        <p className="text-sm md:text-lg text-gray-400">Drop 1 – Now Live</p>
        <a
          href="#drop1"
          className="inline-block px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Explore Drop 1
        </a>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            PRODUCT CARD (ATOM)                             */
/* -------------------------------------------------------------------------- */

function ProductCard({ product }: { product: DBProduct & { quote: string } }) {
  return (
    <div className="border border-gray-800 p-4 rounded-xl hover:scale-105 transition-transform">
      <img
        src={product.image_paths?.[0]}
        alt={`T‑Shirt ${product.id}`}
        className="w-full h-80 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">“{product.quote}”</h3>
      <a href="#" className="text-sm text-gray-400 hover:underline">
        View Product →
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           DROP SHOWCASE SECTION                             */
/* -------------------------------------------------------------------------- */

function DropShowcase({ products }: { products: (DBProduct & { quote: string })[] }) {
  return (
    <section id="drop1" className="py-16 px-4 bg-black text-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
        Drop 1 — Statement T‑Shirts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/*                           PHILOSOPHY SECTION                                */
/* -------------------------------------------------------------------------- */

function PhilosophySection() {
  return (
    <section className="py-24 px-6 text-center bg-gray-900 text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Raavn?</h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-400">
        Raavn is not a fashion brand. It is a reflection of what you never said out loud. Every
        piece is a mirror — sharp, raw, and personal.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FOOTER                                   */
/* -------------------------------------------------------------------------- */

function SiteFooter() {
  return (
    <footer className="py-10 text-center text-gray-500 text-sm bg-black border-t border-gray-800">
      <p>© {new Date().getFullYear()} Raavn. All rights reserved.</p>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                               PAGE WRAPPER                                 */
/* -------------------------------------------------------------------------- */

export default async function HomePage() {
  // Fake data – replace with Supabase / API later
  // const products: Product[] = Array.from({ length: 6 }).map((_, i) => ({
  //   id: i + 1,
  //   quote: "Silence is a language. We wear it well.",
  //   image: `https://picsum.photos/400/400?random=${i + 1}`,
  // }));

  const raavnQuotes = [
  // "Silence is a language. We wear it well.",
  "Not broken. Just written differently.",
  "Your chaos looks good on you.",
  "Truth wears black.",
  "I exist louder in shadows.",
  "No gods. No masters. Just me.",
  "Scars are my signature.",
  "This isn’t fashion. It’s confession.",
  "I am the question you don't ask.",
  "Pain. Printed."
];

const getProducts = cache(async (): Promise<(DBProduct & { quote: string })[]> => {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("homepage_products")
    .select("id, image_paths, sizes, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Supabase products unavailable:", error.message);
    return [];
  }

  return (data ?? []).map((p: any) => {
    const quote = raavnQuotes[p.id % raavnQuotes.length]; // Deterministic quote
    return {
      ...p,
      quote,
      image_paths: p.image_paths ?? [],
      sizes: p.sizes ?? [],
    };
  });
});



const products = await getProducts();




  return (
    <main className="bg-black min-h-screen">
      <HeroSection />
      <MarqueeStrip />
      <DropShowcase products={products} />
      <ShadowTestimonial />
      
      <PhilosophySection />
      <HoverMessageBlock />
      <PhilosophyGrid />
      <NewsletterSection />
      <SiteFooter />
    </main>
  );
}
