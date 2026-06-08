import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CollectionStats from "@/components/wishlist/CollectionStats";
import DropBreakdown from "@/components/wishlist/DropBreakdown";
import WishlistCard from "@/components/wishlist/WishlistCard";
import { getWishlist } from "@/lib/wishlist";

export default async function WishlistPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const wishlist = await getWishlist(userId);

  const totalItems = wishlist.length;

const totalValue = wishlist.reduce(
  (sum, item: any) =>
    sum +
    Number(item.products?.price ?? 0),
  0
);

const dropMap: Record<string, number> = {};

wishlist.forEach((item: any) => {
  const dropTitle =
    item.products?.drops?.title ??
    "Unknown Drop";

  dropMap[dropTitle] =
    (dropMap[dropTitle] ?? 0) + 1;
});

const totalDrops =
  Object.keys(dropMap).length;

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <p className="uppercase tracking-[0.35em] text-xs text-zinc-500">
          Saved Pieces
        </p>

        <h1 className="text-5xl md:text-7xl font-black mt-4">
          Your Collection
        </h1>

        <p className="text-zinc-500 mt-4">
          {wishlist.length} saved pieces
        </p>

      </section>

      <CollectionStats
  totalItems={totalItems}
  totalValue={totalValue}
  totalDrops={totalDrops}
/>

<DropBreakdown
  drops={dropMap}
/>

      {wishlist.length === 0 ? (
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">

          <h2 className="text-3xl font-bold">
            Nothing saved yet
          </h2>

          <p className="text-zinc-500 mt-4">
            Explore the latest drop and start
            building your collection.
          </p>

        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-6 pb-24">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((item: any) => (
              <WishlistCard
                key={item.products.id}
                product={item.products}
                likedAt={item.liked_at}
              />
            ))}

          </div>

        </section>
      )}

    </main>
  );
}