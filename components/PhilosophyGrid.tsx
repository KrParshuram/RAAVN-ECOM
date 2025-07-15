// components/PhilosophyGrid.tsx
const quotes = [
  "Silence is a language. We wear it well.",
  "You are not too much. They were too little.",
  "This isn’t fashion. It’s defiance.",
];

export default function PhilosophyGrid() {
  return (
    <section className="bg-gray-900 text-white py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Fabric of Thought</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {quotes.map((quote, i) => (
          <div
            key={i}
            className="bg-black border border-gray-700 p-6 rounded-xl hover:rotate-[-1deg] hover:scale-105 transition-transform duration-300"
          >
            <p className="text-lg text-gray-300 italic">“{quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
