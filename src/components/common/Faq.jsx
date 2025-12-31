import React, { useState } from "react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders are processed within 24 hours and delivery usually takes 2–5 business days depending on your location.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Zenvia accepts debit cards, credit cards, bank transfers, PayPal, and other secure payment gateways.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes. Products can be returned within 7 days of delivery provided they are unused and in original packaging.",
  },
  {
    question: "Do you offer nationwide delivery?",
    answer:
      "Yes, we deliver to all states nationwide with trusted logistics partners.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking link via email or SMS.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-2">
            Everything you need to know about shopping on Zenvia
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
              >
                <span className="font-medium text-gray-800 text-sm sm:text-base">
                  {faq.question}
                </span>

                <span
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* ANSWER */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
