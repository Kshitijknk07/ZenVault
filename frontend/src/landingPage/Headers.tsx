import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "About Us", href: "#about" },
];

const Headers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-zinc-800 sticky top-0 z-50">
      {/* Mobile Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger className="md:hidden">
          <Menu className="h-6 w-6 text-white hover:text-[#A855F7] transition-colors duration-300" />
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-black text-white border-r border-zinc-800 p-0">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6 text-gray-400 hover:text-[#A855F7] transition-colors duration-300" />
            </button>
          </div>
          <div className="flex flex-col gap-6 p-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xl font-medium text-gray-200 hover:text-[#A855F7] transition-all duration-300 transform hover:translate-x-1 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-6 pt-6 border-t border-zinc-700">
              <Button className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white font-medium py-2 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20">
                Login
              </Button>
              <Button variant="outline" className="w-full mt-3 border-[#A855F7] text-[#A855F7] hover:bg-[#A855F7]/10 font-medium py-2 rounded-md transition-all duration-300">
                Sign Up
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <a
        href="/"
        className="text-2xl font-bold text-white flex items-center gap-3 group"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#A855F7]">
          ZenVault
        </span>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-300 hover:text-white transition-all duration-300 text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-zinc-800">
          Login
        </Button>
        <Button className="bg-white text-black hover:bg-gray-200 font-medium transition-all duration-300 hover:shadow-lg">
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Headers;
