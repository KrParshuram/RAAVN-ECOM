// components/PhilosophyGrid.tsx

const quotes = [
  "WE ARE NOT HEROES. WE ARE NOT VILLAINS.",
  "WE DON'T FOLLOW TRENDS. WE DOCUMENT SCARS.",
  "WE DON'T SEEK APPROVAL. WE SEEK TRUTH.",
  "WEAR STORIES. NOT LABELS.",
  "SCARS ARE NOT DAMAGE. THEY ARE SIGNATURES.",
];

export default function PhilosophyGrid() {
  return (
    <section className="bg-black text-white py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-24">
          <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-6">
            Philosophy
          </p>

          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
            BUILT FROM
            <br />
            CONVICTION.
          </h2>
        </div>

        <div className="border-t border-zinc-800">

          {quotes.map((quote, index) => (
            <div
              key={index}
              className="py-12 md:py-16 border-b border-zinc-800"
            >
              <div className="grid md:grid-cols-12 gap-6">

                <div className="md:col-span-2">
                  <p className="text-zinc-600 text-sm">
                    0{index + 1}
                  </p>
                </div>

                <div className="md:col-span-10">
                  <p className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] max-w-5xl">
                    {quote}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}