
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "How secure is ZenVault?",
    answer: "ZenVault uses military-grade encryption to protect your files. We employ end-to-end encryption, which means your files are encrypted before they leave your device and can only be decrypted by you or your authorized recipients. Additionally, we use two-factor authentication and other security measures to ensure your data remains private and secure."
  },
  {
    question: "Can I access my files offline?",
    answer: "Yes, you can mark files for offline access in our mobile and desktop applications. These files will be available even when you don't have an internet connection. Any changes you make while offline will be synchronized once you're back online."
  },
  {
    question: "How does file sharing work?",
    answer: "ZenVault makes sharing easy and secure. You can share files or folders with specific people via email, or create shareable links with optional password protection and expiration dates. You can also set permissions to control whether recipients can view, comment, or edit your files."
  },
  {
    question: "What happens if I exceed my storage limit?",
    answer: "If you approach your storage limit, we'll notify you so you can either upgrade your plan or free up space. If you exceed your limit, you'll still have access to all your files, but you won't be able to upload new files until you have sufficient space available."
  },
  {
    question: "Can I recover deleted files?",
    answer: "Yes, ZenVault keeps deleted files in a trash folder for 30 days (or longer for premium plans). You can restore these files at any time during this period. After the retention period, files are permanently deleted from our servers."
  },
  {
    question: "Is there a limit to file size uploads?",
    answer: "Basic accounts have a 2GB file size limit for individual uploads. Pro accounts can upload files up to 10GB, and Enterprise accounts have no file size limitations."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">FAQ</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Find answers to common questions about ZenVault.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <dl>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`mt-6 border-b border-gray-200 pb-6 ${index === 0 ? 'border-t pt-6' : ''}`}
              >
                <dt className="text-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-start justify-between text-left text-gray-900 focus:outline-none"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUp className="h-6 w-6 text-indigo-600" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-indigo-600" />
                      )}
                    </span>
                  </button>
                </dt>
                {openIndex === index && (
                  <dd className="mt-4 pr-12">
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;