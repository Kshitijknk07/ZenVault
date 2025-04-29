import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-[#2c2c2e] border-t border-[#3b82f6]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#3b82f6] mr-2">Zen</span>Vault
            </div>
            <p className="text-white/70 mb-4">
              Secure, fast, and reliable file storage for individuals and teams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Enterprise
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#3b82f6]">
                  Legal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#3b82f6]/10 text-center text-white/60 text-sm">
          <p>© {currentYear} ZenVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
