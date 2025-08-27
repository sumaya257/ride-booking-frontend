import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const faqs = [
  {
    question: "How do I book a ride?",
    answer: "Open the Rider App, enter your pickup and destination, choose your ride type, and confirm. Your driver will be on the way immediately.",
  },
  {
    question: "How do drivers accept rides?",
    answer: "Drivers receive ride requests through the Driver App. They can accept, view route details, and start the trip once confirmed.",
  },
  {
    question: "How can I contact support?",
    answer: "You can contact support via the Contact page, email, or in-app chat. We offer 24/7 assistance for all users.",
  },
  {
    question: "How secure are the payments?",
    answer: "All payments are processed securely with encryption. You can pay via multiple trusted payment methods directly in the app.",
  },
  {
    question: "Can admins manage rides in real-time?",
    answer: "Yes, the Admin Panel provides full access to ride management, analytics, and user activity in real-time.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-[var(--muted-foreground)] text-lg md:text-xl max-w-2xl mx-auto">
          Answers to common questions for Riders, Drivers, and Admins.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[var(--card)] rounded-2xl shadow-lg overflow-hidden border border-[var(--border)]"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === idx ? (
                <ChevronUpIcon className="w-5 h-5 text-[var(--primary)]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[var(--primary)]" />
              )}
            </button>
            {openIndex === idx && (
              <div className="p-4 border-t border-[var(--border)] text-[var(--muted-foreground)]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
