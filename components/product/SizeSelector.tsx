"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type Size = string;

interface SizeSelectorProps {
sizes: string[];

value?: string;

onChange?: (size: string) => void;

defaultValue?: string;

className?: string;
}

export function SizeSelector({
sizes,
value,
onChange,
defaultValue,
className,
}: SizeSelectorProps) {
const [internal, setInternal] = useState(
defaultValue ?? sizes[0] ?? ""
);

const selected = value ?? internal;

const handleSelect = (size: string) => {
if (!value) {
setInternal(size);
}

onChange?.(size);


};

if (!sizes.length) {
return null;
}

return (
<div
className={cn(
"flex flex-wrap gap-2",
className
)}
>
{sizes.map((size) => {
const active = selected === size;


    return (
      <button
        key={size}
        type="button"
        onClick={() => handleSelect(size)}
        aria-pressed={active}
        className={cn(
          "min-w-[56px]",
          "rounded-lg border px-4 py-2",
          "text-sm font-medium",
          "transition-all duration-200",

          active
            ? "border-white bg-white text-black"
            : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
        )}
      >
        {size}
      </button>
    );
  })}
</div>


);
}
