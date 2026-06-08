import PhilosophyGrid from "@/components/PhilosophyGrid";

export const metadata = {
  title: "Philosophy | Raavn",
  description:
    "We are not heroes. We are not villains. We are the stories they tried to hide.",
};  

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen bg-black text-white py-12 w-full">
      <PhilosophyGrid />
    </main>
  );
}