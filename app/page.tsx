

import React from "react";
import MarqueeStrip from "@/components/MarqueeStrip";
import ShadowTestimonial from "@/components/ShadowTestimonial";
import HoverMessageBlock from "@/components/HoverMessageBlock";
import PhilosophyGrid from "@/components/PhilosophyGrid";
import {NewsletterSection} from "@/components/NewsletterSection";
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

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-gray-800 p-4 rounded-xl hover:scale-105 transition-transform">
      <img
        src={product.image}
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

function DropShowcase({ products }: { products: Product[] }) {
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

export default function HomePage() {
  // Fake data – replace with Supabase / API later
  const products: Product[] = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    quote: "Silence is a language. We wear it well.",
    image: `https://picsum.photos/400/400?random=${i + 1}`,
  }));

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
