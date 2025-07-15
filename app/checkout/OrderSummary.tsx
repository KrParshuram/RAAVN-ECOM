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

export default function OrderSummary({ items }: OrderSummaryProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-neutral-900 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white mb-2">Order Details</h3>

      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b border-neutral-800 pb-4">
          <div className="relative w-16 h-16 rounded overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-white text-sm font-medium">{item.title}</p>
            <p className="text-gray-400 text-xs">Size: {item.size}</p>
            <p className="text-gray-400 text-xs">
              ₹{item.price} × {item.quantity}
            </p>
          </div>

          <p className="text-white font-semibold text-sm">
            ₹{item.price * item.quantity}
          </p>
        </div>
      ))}

      <div className="pt-4 border-t border-neutral-800">
        <div className="flex justify-between text-sm text-white font-semibold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
}
