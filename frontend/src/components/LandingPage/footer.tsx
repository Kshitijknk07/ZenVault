import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-16 bg-gradient-to-t from-[#23232a] to-[#2c2c2e] border-t border-[#3b82f6]/20 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div>
            <div className="text-3xl font-extrabold text-white mb-6 flex items-center tracking-tight">
              <span className="text-[#3b82f6] mr-2">Zen</span>Vault
            </div>
            <p className="text-white/70 mb-6 text-lg font-medium">
              Secure, fast, and reliable file storage for individuals and teams.
            </p>
            <div className="flex space-x-5">
              <a
                href="#"
                className="text-white/70 hover:text-[#3b82f6] transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-[#3b82f6] transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-[#3b82f6] transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Product</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Enterprise
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#3b82f6] transition-colors"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#3b82f6]/10 pt-8 text-center text-white/60 text-sm">
          &copy; {currentYear} ZenVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
