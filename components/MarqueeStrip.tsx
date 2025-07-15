// components/MarqueeStrip.tsx
"use client";
import { useEffect, useState } from "react";

const words = ["UNAPOLOGETIC", "RAW", "BROKEN", "REBUILT", "UNREAL", "HIM", "HER", "YOU", "RAAVN"];

export default function MarqueeStrip() {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-white text-black py-4 border-y border-black">
      <div className="animate-marquee text-2xl font-bold uppercase">
        {Array(3)
          .fill(words)
          .flat()
          .map((word, i) => (
            <span key={i} className="mx-6 inline-block tracking-widest">
              {word}
            </span>
          ))}
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
