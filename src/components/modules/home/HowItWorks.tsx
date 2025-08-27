const steps = [
  { title: "Book a Ride", description: "Choose pickup & destination easily." },
  { title: "Get Matched", description: "Instantly connect with nearby drivers." },
  { title: "Enjoy Your Ride", description: "Safe and comfortable travel every time." },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-[var(--foreground)]">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow-md bg-[var(--card)] text-[var(--card-foreground)] hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-[var(--muted-foreground)]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
