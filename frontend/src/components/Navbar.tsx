import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Lock, Menu, X } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/50 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Sparkles effect */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <SparklesCore
          id="navSparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleColor="#ffffff"
          particleDensity={30}
          speed={0.3}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2">
          <Lock className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold">ZenVault</span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            Features
          </a>
          <a
            href="#security"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            Security
          </a>
          <a
            href="#testimonials"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            Pricing
          </a>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-md border-t p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-foreground/80 hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#security"
              className="text-foreground/80 hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Security
            </a>
            <a
              href="#testimonials"
              className="text-foreground/80 hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-foreground/80 hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
