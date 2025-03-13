import { ChevronDown, ChevronUp, HelpCircle, Mail } from 'lucide-react';
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
    <div id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-60"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent mb-6 text-sm font-medium">
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Common <span className="text-gradient">questions</span> answered
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about ZenVault. Can't find the answer you're looking for? Feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border shadow-sm p-6 sm:p-8">
            <dl className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 overflow-hidden ${
                    index !== faqs.length - 1 ? 'border-b border-border pb-6' : ''
                  }`}
                >
                  <dt>
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-start justify-between text-left transition-all duration-200 group"
                      aria-expanded={openIndex === index}
                    >
                      <span className="text-lg font-semibold group-hover:text-accent transition-colors duration-200">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                          openIndex === index ? 'bg-accent text-white' : 'bg-secondary text-foreground group-hover:bg-accent/10'
                        }`}>
                          {openIndex === index ? (
                            <ChevronUp className="h-5 w-5 transition-transform duration-200" />
                          ) : (
                            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
                          )}
                        </div>
                      </span>
                    </button>
                  </dt>
                  <dd className={`mt-2 text-muted-foreground ${openIndex === index ? 'block' : 'hidden'}`}>
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16 bg-gradient-accent rounded-2xl p-8 text-white shadow-accent-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                <p className="text-white/80">
                  Can't find the answer you're looking for? Please contact our friendly support team.
                </p>
              </div>
              <a
                href="mailto:support@zenvault.com"
                className="inline-flex items-center px-6 py-3 bg-white text-accent font-medium rounded-lg hover:bg-white/90 transition-all duration-200 whitespace-nowrap"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;