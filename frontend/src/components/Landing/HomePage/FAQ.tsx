import { useState } from "react";

function FAQ() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes! Get your first 25 minutes completely free. No credit card required to start.",
    },
    {
      question: "How much does Jasmin cost?",
      answer:
        "Jasmin is 10x cheaper than traditional answering services, starting at just $49/month.",
    },
    {
      question: "How long does it take to set up?",
      answer:
        "You can get started in just minutes. Simply train Jasmin on your business information and forward your calls.",
    },
    {
      question: "Can you help us get set up?",
      answer: "Absolutely! Our team is here to help you every step of the way.",
    },
  ];
  return (
    <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                onClick={() =>
                  setFaqOpenIndex(faqOpenIndex === idx ? null : idx)
                }
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span>{faqOpenIndex === idx ? "−" : "+"}</span>
              </button>
              {faqOpenIndex === idx && (
                <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
