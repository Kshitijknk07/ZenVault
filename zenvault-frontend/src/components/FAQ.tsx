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
    <div id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center animate-fade-in">
          <h2 className="text-sm text-indigo-600 font-bold tracking-widest uppercase">FAQ</h2>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
            Common questions<br className="hidden sm:block" /> answered
          </p>
          <p className="mt-6 max-w-2xl text-xl text-gray-600 lg:mx-auto leading-relaxed">
            Everything you need to know about ZenVault. Can't find the answer you're looking for? Feel free to contact our support team.
          </p>
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <dl className="space-y-8">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`transition-all duration-300 animate-fade-in bg-white rounded-2xl border border-gray-100 overflow-hidden ${openIndex === index ? 'shadow-md' : 'hover:shadow-sm'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <dt>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-start justify-between px-6 py-5 text-left transition-all duration-200 hover:bg-gray-50"
                  >
                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {openIndex === index ? (
                        <ChevronUp className="h-6 w-6 text-indigo-600 transition-transform duration-200 transform rotate-0" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400 transition-transform duration-200 transform rotate-0" />
                      )}
                    </span>
                  </button>
                </dt>
                <dd 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;