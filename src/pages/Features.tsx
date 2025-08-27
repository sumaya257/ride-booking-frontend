import { UserIcon, CarIcon, LayoutDashboardIcon, MapPinIcon, ClockIcon, ShieldIcon } from "lucide-react";

const features = [
  {
    title: "Real-Time Tracking",
    description: "Track your rides and drivers in real-time for a safer, smoother experience.",
    icon: <MapPinIcon className="w-8 h-8 text-[var(--primary-foreground)]" />,
  },
  {
    title: "Flexible Earnings",
    description: "Drivers can accept rides anytime and earn according to their schedule.",
    icon: <ClockIcon className="w-8 h-8 text-[var(--primary-foreground)]" />,
  },
  {
    title: "Secure Payments",
    description: "All payments are encrypted and processed securely through our platform.",
    icon: <ShieldIcon className="w-8 h-8 text-[var(--primary-foreground)]" />,
  },
  {
    title: "Rider App",
    description: "Book rides easily, see driver details, and get instant updates.",
    icon: <UserIcon className="w-8 h-8 text-[var(--primary-foreground)]" />,
  },
  {
    title: "Driver App",
    description: "Accept ride requests, track earnings, and get driver support.",
    icon: <CarIcon className="w-8 h-8 text-[var(--primary-foreground)]" />,
  },
  {
    title: "Admin Panel",
    description: "Manage users, rides, and analytics efficiently from one dashboard.",
    icon: <LayoutDashboardIcon className="w-8 h-8 text-[var(--primary-foreground)]" />,
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">
          Platform Features
        </h2>
        <p className="text-[var(--muted-foreground)] text-lg md:text-xl max-w-2xl mx-auto">
          Our platform offers a comprehensive suite of tools for Riders, Drivers, and Admins to ensure smooth and reliable operations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-[var(--primary-foreground)/20] rounded-full mb-4 mx-auto">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-[var(--primary-foreground)/80]">{feature.description}</p>
            <div className="absolute -bottom-4 right-4 w-16 h-16 bg-[var(--primary-foreground)/10] rounded-full blur-2xl pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
