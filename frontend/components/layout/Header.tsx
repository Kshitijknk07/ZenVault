"use client";

import Link from "next/link";
import { Logo } from "../icons/Logo";
import { Button } from "../ui/Button";
import React, { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl shadow-md"
          : "bg-gradient-to-r from-background/70 via-background/80 to-background/70 backdrop-blur-md"
      } border-b border-border/30`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            ZenVault
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How it Works" },
            { href: "#pricing", label: "Pricing" },
            { href: "#faq", label: "FAQ" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-foreground/80 hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-accent/10 font-medium text-sm group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="hover:bg-accent/10 hover:text-primary transition-all duration-300"
          >
            Log in
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md">
            Get Started
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <Button
            variant="ghost"
            className="p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-full bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300"
          >
            Get Started
          </Button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-64 opacity-100 border-t border-border/30 bg-background/95 backdrop-blur-xl"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-2">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How it Works" },
            { href: "#pricing", label: "Pricing" },
            { href: "#faq", label: "FAQ" },
            { href: "/login", label: "Log in" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 px-2 border-b border-border/10 last:border-0 text-foreground/90 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
