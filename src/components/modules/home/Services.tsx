import { UserIcon, CarIcon, LayoutDashboardIcon } from "lucide-react";

const services = [
  { title: "Rider App", description: "Book rides easily and track drivers.", icon: <UserIcon className="w-8 h-8 text-[var(--primary-foreground)]" /> },
  { title: "Driver App", description: "Accept ride requests & earn flexibly.", icon: <CarIcon className="w-8 h-8 text-[var(--primary-foreground)]" /> },
  { title: "Admin Panel", description: "Manage users, rides, and analytics.", icon: <LayoutDashboardIcon className="w-8 h-8 text-[var(--primary-foreground)]" /> },
];

const Services = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[var(--primary-foreground)/20] rounded-full">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-[var(--primary-foreground)/80]">{service.description}</p>
              <div className="absolute -bottom-4 right-4 w-16 h-16 bg-[var(--primary-foreground)/10] rounded-full blur-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
