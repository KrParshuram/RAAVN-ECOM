import Link from "next/link";

export default function AccountPage() {
  return (
    <section>
      <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-6">
        Personal Archive
      </p>

      <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
        MY ACCOUNT
      </h1>

      <p className="text-zinc-400 mt-6 max-w-xl">
        Your saved pieces, recently viewed
        garments and future drops.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-20">
        <Link
          href="/account/wishlist"
          className="
          border border-zinc-800
          p-8
          hover:border-zinc-600
          transition
        "
        >
          <p className="text-zinc-500 text-sm mb-3">
            SAVED
          </p>

          <h2 className="text-3xl font-black">
            Wishlist
          </h2>
        </Link>

        <Link
          href="/account/recently-viewed"
          className="
          border border-zinc-800
          p-8
          hover:border-zinc-600
          transition
        "
        >
          <p className="text-zinc-500 text-sm mb-3">
            HISTORY
          </p>

          <h2 className="text-3xl font-black">
            Recently Viewed
          </h2>
        </Link>
      </div>

      <div className="mt-24 border-t border-zinc-800 pt-12">
        <h3 className="text-2xl font-black mb-6">
          RAAVN PHILOSOPHY
        </h3>

        <div className="space-y-4 text-zinc-400">
          <p>
            WE ARE NOT HEROES.
            WE ARE NOT VILLAINS.
          </p>

          <p>
            WE DON'T FOLLOW TRENDS.
            WE DOCUMENT SCARS.
          </p>

          <p>
            SCARS ARE NOT DAMAGE.
            THEY ARE SIGNATURES.
          </p>
        </div>
      </div>
    </section>
  );
}