interface CollectionStatsProps {
  totalItems: number;
  totalValue: number;
  totalDrops: number;
}

export default function CollectionStats({
  totalItems,
  totalValue,
  totalDrops,
}: CollectionStatsProps) {
  const stats = [
    {
      label: "Saved Pieces",
      value: totalItems,
    },
    {
      label: "Collection Value",
      value: `₹${totalValue.toLocaleString()}`,
    },
    {
      label: "Drops",
      value: totalDrops,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-16">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            border
            border-zinc-800
            rounded-2xl
            p-6
            bg-zinc-950
          "
        >
          <p className="text-zinc-500 text-sm">
            {stat.label}
          </p>

          <p className="text-3xl font-black mt-3">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}