import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const Header = () => {
  return (
    <header className="w-full py-4 border-b border-border/40 bg-background/80 backdrop-blur-md fixed top-0 z-50">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
              Z
            </div>
            <span className="font-semibold text-xl">ZenVault</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Log In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
