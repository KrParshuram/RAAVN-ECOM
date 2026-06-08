"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export interface CartItemProps {
  id: string;
  title: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  onIncrement?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function CartItem({
  id,
  title,
  image,
  price,
  size,
  quantity,
  onIncrement,
  onRemove,
}: CartItemProps) {
  return (
    <article className="border-b border-zinc-800 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8">

        {/* Image */}

        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}

        <div className="flex flex-col justify-between">

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              {title}
            </h2>

            <div className="mt-6 space-y-2 text-sm text-zinc-500">
              <p>Size {size}</p>

              <p>
                ₹{price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8 mt-10">

            {/* Quantity */}

            <div className="flex items-center gap-4">
              <button
                onClick={() => onRemove?.(id)}
                className="
                  text-zinc-500
                  hover:text-white
                  transition-colors
                "
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="text-white min-w-[24px] text-center">
                {quantity}
              </span>

              <button
                onClick={() => onIncrement?.(id)}
                className="
                  text-zinc-500
                  hover:text-white
                  transition-colors
                "
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total */}

            <p className="text-white text-lg font-medium">
              ₹{(
                price * quantity
              ).toLocaleString()}
            </p>

            {/* Remove */}

            <button
              onClick={() => onRemove?.(id)}
              className="
                text-sm
                uppercase
                tracking-[0.2em]
                text-zinc-500
                hover:text-white
                transition-colors
              "
            >
              Remove
            </button>

          </div>
        </div>

      </div>
    </article>
  );
}