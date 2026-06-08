"use client";

import {
Shirt,
ShieldCheck,
Scissors,
Sparkles,
Package,
} from "lucide-react";

interface ProductDetailsProps {
material?: string;
fit?: string;
care?: string;
construction?: string;
dropType?: string;
}

const defaultData = {
material: "280 GSM Premium Cotton",
fit: "Oversized Fit",
care: "Machine wash cold. Iron inside out.",
construction:
"Double stitched seams built for everyday wear.",
dropType: "Limited Release",
};

export function ProductDetails({
material = defaultData.material,
fit = defaultData.fit,
care = defaultData.care,
construction = defaultData.construction,
dropType = defaultData.dropType,
}: ProductDetailsProps) {
const details = [
{
icon: Shirt,
title: "Material",
value: material,
},
{
icon: Sparkles,
title: "Fit",
value: fit,
},
{
icon: Scissors,
title: "Construction",
value: construction,
},
{
icon: Package,
title: "Drop",
value: dropType,
},
{
icon: ShieldCheck,
title: "Care",
value: care,
},
];

return ( <section className="max-w-7xl mx-auto px-6 py-24">


  <div className="border-t border-zinc-800 pt-16">

    <div className="mb-12">

      <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-4">
        Specifications
      </p>

      <h2 className="text-4xl md:text-5xl font-black">
        Product Details
      </h2>

    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {details.map(
        ({ icon: Icon, title, value }) => (
          <div
            key={title}
            className="
              group
              border
              border-zinc-800
              rounded-2xl
              p-6
              bg-zinc-950
              transition-all
              duration-300
              hover:border-zinc-600
            "
          >
            <div className="flex items-center gap-3 mb-5">

              <Icon className="h-5 w-5 text-zinc-400" />

              <h3 className="font-semibold text-white">
                {title}
              </h3>

            </div>

            <p className="text-zinc-400 leading-relaxed">
              {value}
            </p>
          </div>
        )
      )}

    </div>

  </div>

</section>

);
}
