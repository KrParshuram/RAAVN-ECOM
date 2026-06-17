import  {supabaseServer}  from "@/lib/supabaseServer";
import DropSection from "../../components/drops/DropSection";

export default async function DropsPage() {
  const supabase = await supabaseServer();

  const { data: drops } = await supabase
    .from("drops")
    .select("*")
    .order("launch_date", { ascending: true });

  return (
    <main className="h-screen snap-y w-screen snap-mandatory overflow-y-scroll overflow-x-hidden bg-black text-white">
      {/* Hero */}
            <section className="snap-start relative flex h-screen items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <p className="mb-6 text-sm uppercase tracking-[0.6em] text-zinc-400">
                RAAVN
                </p>

                <h1 className="text-7xl font-black uppercase md:text-9xl">
                THE DROPS
                </h1>

                <p className="mx-auto mt-8 max-w-xl text-zinc-400">
                Every collection begins with an idea.
                Every idea becomes a statement.
                </p>

                <div className="mt-20 animate-bounce text-zinc-500">
                ↓ Scroll
                </div>
            </div>
            </section>

      {drops?.map((drop: any, index: number) => (
        <DropSection key={drop.id} drop={drop} index={index} />
      ))}
    </main>
  );
}