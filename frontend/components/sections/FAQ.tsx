"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "How secure is ZenVault?",
      answer:
        "ZenVault uses end-to-end encryption, which means your data is encrypted before it leaves your device and can only be decrypted by you. We employ industry-standard AES-256 encryption, and even our team cannot access your files.",
    },
    {
      question: "Can I access my files offline?",
      answer:
        "Yes, ZenVault allows you to mark files for offline access. These files will be securely stored on your device and will be available even without an internet connection.",
    },
    {
      question: "What happens if I forget my password?",
      answer:
        "For security reasons, we cannot recover your password. However, you can set up recovery options like a recovery key or security questions when you create your account. We strongly recommend saving your recovery key in a safe place.",
    },
    {
      question: "Is there a limit to how much I can store?",
      answer:
        "Each plan comes with different storage limits. The Free plan includes 5GB, the Pro plan includes 100GB, and the Enterprise plan includes 1TB. You can upgrade your plan at any time if you need more storage.",
    },
    {
      question: "How does file sharing work?",
      answer:
        "ZenVault allows you to share files securely with others by generating encrypted links. You can set permissions, expiration dates, and password protection for shared files. Recipients don't need a ZenVault account to access shared files.",
    },
    {
      question: "Can I use ZenVault for my business?",
      answer:
        "Absolutely! Our Pro and Enterprise plans are designed for businesses of all sizes. The Enterprise plan includes additional features like user management, admin controls, and custom branding.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Find answers to common questions about ZenVault.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 glass rounded-xl overflow-hidden">
              <button
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-foreground/70">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
