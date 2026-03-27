const cards = [
  {
    title: 'One Equation, Any Domain',
    body: 'F = dp/dt — force equals rate of change of momentum — works for physics. Epimechanics shows it works for anything with a state: biology, economics, institutions, consciousness. State, mass, energy, force — all derived from a single primitive: the causal event.',
  },
  {
    title: 'Derived, Not Postulated',
    body: 'Spacetime, quantum mechanics, the imaginary unit i — all derived from causal structure alone. No assumed physics. Just events with inputs and outputs, and the mathematics that follows.',
  },
  {
    title: 'Falsifiable Predictions',
    body: 'The core claim — that optimal representations have Lagrangian structure — is a conjecture, not a given. Experiments are designed and protocols are ready. The framework makes specific predictions.',
  },
];

export default function WhatsThis() {
  return (
    <section className="w-full bg-white dark:bg-gray-950 py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">What is this?</h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Epimechanics is a generalized mechanics framework built from causal events.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/70 p-5 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
