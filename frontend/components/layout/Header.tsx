"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";
import { Logo } from "../icons/Logo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              ZenVault
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/50 hover:border-primary"
            >
              Log In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 glass rounded-lg mt-2 mb-2">
            <nav className="flex flex-col space-y-4 p-4">
              <Link
                href="#features"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                FAQ
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-center border-primary/50 hover:border-primary"
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  className="justify-center bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
