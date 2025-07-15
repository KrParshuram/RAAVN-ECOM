// components/product/SizeSelector.tsx
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export type Size = "S" | "M" | "L";

interface SizeSelectorProps {
  /** Currently‑selected size (controlled) */
  value?: Size;
  /** Callback when the user picks a new size */
  onChange?: (size: Size) => void;
  /** Initial size in uncontrolled mode */
  defaultValue?: Size;
  /** Extra Tailwind classes */
  className?: string;
}

export function SizeSelector({
  value,
  onChange,
  defaultValue = "M",
  className,
}: SizeSelectorProps) {
  /* ---------------------------------------------------------------------- */
  /*                               STATE                                    */
  /* ---------------------------------------------------------------------- */
  const [internal, setInternal] = useState<Size>(defaultValue);
  const selected = value ?? internal;

  const handleSelect = (size: Size) => {
    if (!value) setInternal(size); // uncontrolled
    onChange?.(size);              // notify parent
  };

  /* ---------------------------------------------------------------------- */
  /*                                UI                                      */
  /* ---------------------------------------------------------------------- */
  return (
    <div
      className={cn(
        "inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-1",
        className,
      )}
    >
      {(["S", "M", "L"] as Size[]).map((size) => {
        const active = selected === size;
        return (
          <button
            key={size}
            type="button"
            onClick={() => handleSelect(size)}
            aria-pressed={active}
            className={cn(
              "min-w-[48px] select-none rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              active
                ? "bg-primary text-white-100 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50",
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
