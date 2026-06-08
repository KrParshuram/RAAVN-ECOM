export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Manifesto */}

        <div className="mb-24">
          <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-6">
            Raavn
          </p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] max-w-5xl">
            WE DON'T FOLLOW TRENDS.
            <br />
            WE DOCUMENT SCARS.
          </h2>
        </div>

        {/* Footer Grid */}

        <div className="grid md:grid-cols-3 gap-12 border-t border-zinc-800 pt-12">

          {/* Brand */}

          <div>
            <h3 className="text-sm tracking-[0.55em] uppercase font-semibold">
              RAAVN
            </h3>
          </div>

          {/* Navigation */}

          <div className="space-y-3">
            <a
              href="/products"
              className="block text-zinc-400 hover:text-white transition-colors"
            >
              Drop
            </a>

            <a
              href="/account"
              className="block text-zinc-400 hover:text-white transition-colors"
            >
              Account
            </a>

            <a
              href="/account/wishlist"
              className="block text-zinc-400 hover:text-white transition-colors"
            >
              Saved Pieces
            </a>
          </div>

          {/* Brand Statement */}

          <div>
            <p className="text-zinc-500 leading-relaxed">
              Statement pieces for people who
              stopped asking for permission.
            </p>
          </div>

        </div>

        {/* Bottom */}

        <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-4">

          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} RAAVN
          </p>

          <p className="text-zinc-700 text-sm uppercase tracking-[0.25em]">
            Scars Are My Signature
          </p>

        </div>

      </div>
    </footer>
  );
}