interface DropBreakdownProps {
  drops: Record<string, number>;
}

export default function DropBreakdown({
  drops,
}: DropBreakdownProps) {
  return (
    <div className="mb-16">

      <h2 className="text-2xl font-bold mb-6">
        Drop Breakdown
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {Object.entries(drops).map(
          ([drop, count]) => (
            <div
              key={drop}
              className="
                border
                border-zinc-800
                rounded-xl
                p-5
                bg-zinc-950
              "
            >
              <p className="text-zinc-500 text-sm">
                {drop}
              </p>

              <p className="text-2xl font-bold mt-2">
                {count}
              </p>

              <p className="text-zinc-500 text-sm">
                saved pieces
              </p>
            </div>
          )
        )}

      </div>

    </div>
  );
}