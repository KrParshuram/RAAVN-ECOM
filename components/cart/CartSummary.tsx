"use client";

import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  total: number;
  onCheckout?: () => void;
}

export default function CartSummary({
  total,
  onCheckout,
}: CartSummaryProps) {
  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const isEmpty = total === 0;

  return (
    <aside className="lg:sticky lg:top-32">
      <div className="border-t border-zinc-800 pt-8">

        {/* Header */}

        <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-4">
          Final Review
        </p>

        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          YOUR
          <br />
          SELECTION.
        </h2>

        {/* Total */}

        <div className="mt-12 border-t border-zinc-800 pt-8">

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Total
            </span>

            <span className="text-2xl font-medium text-white">
              {formatINR(total)}
            </span>
          </div>

        </div>

        {/* Notes */}

        <div className="mt-10 space-y-3 text-sm text-zinc-500">
          <p>
            Limited production run.
          </p>

          <p>
            Secure checkout.
          </p>

          <p>
            Ships across India.
          </p>
        </div>

        {/* CTA */}

        <Button
          onClick={onCheckout}
          disabled={isEmpty}
          className="
            mt-12
            h-14
            w-full
            bg-white
            text-black
            hover:bg-zinc-200
            font-medium
          "
        >
          CONTINUE TO CHECKOUT
        </Button>

      </div>
    </aside>
  );
}