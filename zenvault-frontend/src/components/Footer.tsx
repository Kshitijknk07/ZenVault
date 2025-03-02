import { HardDrive, Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <HardDrive className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold text-white">ZenVault</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Secure, intuitive, and powerful cloud storage for your digital life.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Integrations</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">API Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Legal</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ZenVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;