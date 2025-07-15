"use client";

import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  total: number;
  onCheckout?: () => void; // optional callback
}

export default function CartSummary({ total, onCheckout }: CartSummaryProps) {
  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const isEmpty = total === 0;

  return (
    <aside className="md:sticky md:top-24">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-white">Order Summary</h2>

        {/* Subtotal (ready for tax / shipping rows later) */}
        <div className="mb-6 flex items-center justify-between text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="font-medium text-white">{formatINR(total)}</span>
        </div>

        <Button
          className="w-full"
          disabled={isEmpty}
          onClick={onCheckout}
          variant="default"
        >
          Proceed to Checkout
        </Button>
      </div>
    </aside>
  );
}
