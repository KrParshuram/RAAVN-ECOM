// components/HoverMessageBlock.tsx
export default function HoverMessageBlock() {
  return (
    <section className="relative bg-black text-white text-center py-32 px-4 group overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold z-10 relative transition-opacity duration-300 group-hover:opacity-0">
        What they fear, you wear.
      </h2>
      <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-xl opacity-0 group-hover:opacity-100 transition duration-500">
        Our fabric speaks louder than their silence.
      </p>
    </section>
  );
}
