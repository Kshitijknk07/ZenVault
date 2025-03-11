import { Shield, Twitter, Facebook, Instagram, Linkedin, Github, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background border-t border-border relative">
      <div className="container mx-auto py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent text-white">
                <Shield className="h-5 w-5" />
              </div>
              <span className="ml-2 text-xl font-bold">ZenVault</span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Secure, intuitive, and powerful cloud storage for your digital life.
            </p>
            <div className="mt-6 flex space-x-3">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200 bg-secondary hover:bg-secondary/80 p-2 rounded-full"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Product</h3>
                <ul className="space-y-3">
                  {['Features', 'Pricing', 'Security', 'Integrations'].map((item, i) => (
                    <li key={i}>
                      <a href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-accent transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Support</h3>
                <ul className="space-y-3">
                  {['Help Center', 'Documentation', 'API Status', 'Contact Us'].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Company</h3>
                <ul className="space-y-3">
                  {['About', 'Blog', 'Careers', 'Legal'].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} ZenVault. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-accent text-white p-3 rounded-full shadow-accent-sm hover:shadow-accent-glow transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;