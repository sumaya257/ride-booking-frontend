import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router"; 

const HeroBanner = () => {
  return (
    <section className="bg-[var(--primary)] text-[var(--primary-foreground)] py-28 px-6 md:px-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Ride Anywhere, Anytime
        </h1>
        <p className="text-lg md:text-xl text-[var(--primary-foreground)/90] max-w-3xl">
          Experience a new level of convenience with our ride platform. Whether you’re a Rider, Driver, or Admin, enjoy seamless booking, real-time tracking, and secure payments — all in one place.
        </p>
        <div className="flex justify-center md:justify-start gap-4 mt-6">
          <Link
            to="/features"
            className="flex items-center gap-2 border border-[var(--card-foreground)] px-6 py-3 rounded-lg hover:bg-[var(--card-foreground)] hover:text-[var(--card)] transition"
          >
            Learn More <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--secondary)] rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"></div>
    </section>
  );
};

export default HeroBanner;
