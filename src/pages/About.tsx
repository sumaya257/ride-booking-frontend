import { UserIcon, CarIcon, LayoutDashboardIcon } from "lucide-react";

const About = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Ride Platform</h1>
        <p className="text-[var(--muted-foreground)] text-lg md:text-xl">
          We connect Riders, Drivers, and Admins seamlessly to create a fast, safe, and reliable ride experience.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
        <div className="p-8 bg-[var(--card)] rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-[var(--muted-foreground)]">
            To make urban transportation fast, safe, and accessible for everyone while providing flexible earning opportunities for drivers.
          </p>
        </div>
        <div className="p-8 bg-[var(--card)] rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-[var(--muted-foreground)]">
            To become the most trusted ride platform in every city, leveraging technology to improve the commuting experience for riders and drivers alike.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-12">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg">
            <UserIcon className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rider App</h3>
            <p className="text-[var(--primary-foreground)/80]">Book rides quickly and track drivers in real-time.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg">
            <CarIcon className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Driver App</h3>
            <p className="text-[var(--primary-foreground)/80]">Accept ride requests and earn flexibly with real-time updates.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg">
            <LayoutDashboardIcon className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
            <p className="text-[var(--primary-foreground)/80]">Manage rides, users, and analytics efficiently from one dashboard.</p>
          </div>
        </div>
      </div>

      {/* Team / Optional */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
        <p className="text-[var(--muted-foreground)]">
          Our dedicated team of developers, designers, and support staff work tirelessly to ensure a smooth and safe experience for all users.
        </p>
      </div>
    </section>
  );
};

export default About;
