import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className={`w-full py-4 fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/20"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 relative z-10">
            <div
              className={`w-10 h-10 rounded-xl bg-primary/90 flex items-center justify-center text-primary-foreground font-bold transition-all duration-300 ${
                scrolled ? "shadow-sm" : "shadow-md"
              }`}
            >
              <span className="text-lg">Z</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">
              ZenVault
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium hover:bg-primary/5"
            >
              Log In
            </Button>
            <Button
              size="sm"
              className="text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              Sign Up Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 p-2 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end justify-center gap-1.5">
              <span
                className={`block h-0.5 bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "w-4 opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-5"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-md z-40 transition-all duration-300 flex flex-col md:hidden pt-20 px-6 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 py-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-lg font-medium py-2 border-b border-border/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto mb-8 flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full justify-center py-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log In
          </Button>
          <Button
            className="w-full justify-center py-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign Up Free
          </Button>
        </div>
      </div>
    </header>
  );
};
