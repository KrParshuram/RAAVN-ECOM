// components/product/ProductDetails.tsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shirt, Sparkles, ShieldCheck, Leaf } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               DATA + TYPES                                 */
/* -------------------------------------------------------------------------- */

const details = [
  {
    icon: Shirt,
    title: "Material",
    desc: "100% pure cotton. Soft, breathable, and lightweight — designed for all‑day comfort in any season.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Check",
    desc: "Triple‑stitched seams and lab‑tested color fastness ensure durability and long‑term colour retention.",
  },
  {
    icon: Shirt,
    title: "Wash Care",
    desc: "Machine wash cold. Use mild detergent. Do not bleach. Tumble dry low. Iron inside out.",
  },
  {
    icon: Sparkles,
    title: "Fit Type",
    desc: "Regular fit — not too tight, not too loose. Perfect for all body types.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "Responsibly sourced materials. Manufactured with low water usage and minimal waste packaging.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */

export function ProductDetails() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-white">
        Product Details
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {details.map(({ icon: Icon, title, desc }) => (
          <Card
            key={title}
            className="border-zinc-800 bg-zinc-900/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/40
                       transition-transform duration-300 ease-out
                       hover:scale-[1.04] hover:-rotate-[1deg] hover:bg-zinc-800/50"
            
          >
            <CardHeader className="flex items-center gap-2 ">
              <Icon className="h-5 w-5 text-white " />
              <span className="text-lg font-medium text-white">{title}</span>
            </CardHeader>

            <CardContent className="text-sm text-zinc-400">{desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
