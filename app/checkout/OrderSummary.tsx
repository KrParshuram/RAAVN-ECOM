"use client";

import Image from "next/image";

export interface OrderSummaryItem {
  id: string;
  title: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderSummaryItem[];
}

export default function OrderSummary({
  items,
}: OrderSummaryProps) {
  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN").format(
      value
    );

  return (
    <aside className="lg:sticky lg:top-32">

      {/* Header */}

      <div className="mb-12">
        <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-4">
          Final Review
        </p>

        <h2 className="text-4xl font-black tracking-tight">
          YOUR
          <br />
          SELECTION.
        </h2>
      </div>

      {/* Products */}

      <div className="border-t border-zinc-800">

        {items.map((item) => (
          <div
            key={item.id}
            className="
              py-8
              border-b
              border-zinc-800
            "
          >
            <div className="grid grid-cols-[80px_1fr] gap-5">

              <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-white font-medium leading-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-zinc-500">
                  Size {item.size}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Qty {item.quantity}
                </p>

                <p className="mt-4 text-white">
                  ₹
                  {formatINR(
                    item.price * item.quantity
                  )}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Total */}

      <div className="pt-10">

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Total
          </span>

          <span className="text-3xl font-medium text-white">
            ₹{formatINR(total)}
          </span>
        </div>

        <div className="mt-8 space-y-2 text-sm text-zinc-500">
          <p>Limited production run.</p>
          <p>Secure checkout.</p>
          <p>Ships across India.</p>
        </div>

      </div>

    </aside>
  );
}