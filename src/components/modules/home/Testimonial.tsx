import { Facebook, Instagram, MessageSquare } from "lucide-react"; // WhatsApp alternative icon

const testimonials = [
  { name: "Alice", text: "Fast and reliable rides. Highly recommended!", socials: { facebook: "#", whatsapp: "#", instagram: "#" } },
  { name: "Bob", text: "As a driver, the platform makes earning easy.", socials: { facebook: "#", whatsapp: "#", instagram: "#" } },
  { name: "Cathy", text: "Admin panel is intuitive and powerful for maintaining everything.", socials: { facebook: "#", whatsapp: "#", instagram: "#" } },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-[var(--foreground)]">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow-lg bg-[var(--card)] text-[var(--card-foreground)] hover:shadow-2xl transition"
            >
              <p className="mb-4 text-[var(--muted-foreground)]">"{t.text}"</p>
              <h4 className="font-semibold mb-4">{t.name}</h4>

              {/* Social links */}
              <div className="flex justify-center gap-4">
                {t.socials.facebook && (
                  <a href={t.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {t.socials.whatsapp && (
                  <a href={t.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
                    <MessageSquare className="w-5 h-5" />
                  </a>
                )}
                {t.socials.instagram && (
                  <a href={t.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
