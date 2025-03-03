import { Menu, X, HardDrive } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "Features", "Pricing", "Creator", "FAQ"];

  return (
    <nav className="bg-black border-b border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <HardDrive className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">ZenVault</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="border border-white hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium mr-2">
                Login
              </button>
              <button className="bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-md text-sm font-medium">
                Sign Up
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
                {link}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-white">
            <div className="flex items-center px-5">
              <button className="border border-white hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium mr-2 w-full">
                Login
              </button>
            </div>
            <div className="mt-3 px-5">
              <button className="bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-md text-sm font-medium w-full">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;