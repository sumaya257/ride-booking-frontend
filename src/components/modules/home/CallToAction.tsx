const PlatformInfo = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--primary)] text-[var(--primary-foreground)] text-center relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
        Why Choose Our Platform?
      </h2>
      <p className="mb-12 text-[var(--primary-foreground)/90] max-w-3xl mx-auto">
        Safe, fast, and reliable rides for Riders, Drivers, and Admins. Our platform makes booking, managing, and monitoring rides effortless with real-time updates and advanced analytics.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="p-6 rounded-xl bg-[var(--card)] text-[var(--card-foreground)] shadow-lg">
          <h3 className="text-xl font-semibold mb-2">5000+ Daily Rides</h3>
          <p className="text-[var(--muted-foreground)]">Thousands of rides completed safely every day.</p>
        </div>
        <div className="p-6 rounded-xl bg-[var(--card)] text-[var(--card-foreground)] shadow-lg">
          <h3 className="text-xl font-semibold mb-2">1000+ Drivers</h3>
          <p className="text-[var(--muted-foreground)]">Trusted drivers earning flexibly on our platform.</p>
        </div>
        <div className="p-6 rounded-xl bg-[var(--card)] text-[var(--card-foreground)] shadow-lg">
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-[var(--muted-foreground)]">Always available to assist riders and drivers anytime.</p>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-[var(--secondary)] rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"></div>
    </section>
  );
};

export default PlatformInfo;
