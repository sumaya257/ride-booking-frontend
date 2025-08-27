import { Mail, Phone, MapPin, Facebook, Instagram, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="text-[var(--muted-foreground)] text-lg md:text-xl max-w-2xl mx-auto">
          Have questions or need support? Reach out to us anytime — we’re here to help!
        </p>
      </div>

      {/* Contact Info */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16 text-center">
        <div className="p-8 rounded-2xl bg-[var(--card)] shadow-lg">
          <MapPin className="w-8 h-8 mx-auto mb-2 text-[var(--primary)]" />
          <h3 className="font-semibold mb-1">Our Office</h3>
          <p className="text-[var(--muted-foreground)]">123 Main Street, Dhaka, Bangladesh</p>
        </div>
        <div className="p-8 rounded-2xl bg-[var(--card)] shadow-lg">
          <Phone className="w-8 h-8 mx-auto mb-2 text-[var(--primary)]" />
          <h3 className="font-semibold mb-1">Call Us</h3>
          <p className="text-[var(--muted-foreground)]">+880 1234 567890</p>
        </div>
        <div className="p-8 rounded-2xl bg-[var(--card)] shadow-lg">
          <Mail className="w-8 h-8 mx-auto mb-2 text-[var(--primary)]" />
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-[var(--muted-foreground)]">support@rideplatform.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-[var(--card)] p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center">Send a Message</h3>
        <form className="grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            rows={5}
          />
          <button
            type="submit"
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Social Links */}
      <div className="max-w-6xl mx-auto text-center mt-12 flex justify-center gap-6">
        <a href="#" className="hover:text-blue-600 transition"><Facebook className="w-6 h-6" /></a>
        <a href="#" className="hover:text-pink-500 transition"><Instagram className="w-6 h-6" /></a>
        <a href="#" className="hover:text-green-500 transition"><MessageSquare className="w-6 h-6" /></a>
      </div>
    </section>
  );
};

export default Contact;
