"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row gap-6 border border-neutral-800 rounded-2xl p-4 sm:p-5 bg-[#121212] shadow hover:shadow-lg transition-all">
      {/* Image */}
      <div className="relative w-full sm:w-[120px] h-[120px] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
          <p className="text-sm text-gray-400 mt-1">Size: <span className="text-gray-200">{size}</span></p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-400 text-sm">
            ₹{price} × {quantity}{" "}
            <span className="text-white font-semibold text-base">= ₹{price * quantity}</span>
          </p>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-black"
              onClick={() => onIncrement?.(id)}
            >
              <Plus className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-red-600 hover:text-white text-gray-400"
              onClick={() => onRemove?.(id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
