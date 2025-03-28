import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import "./Hero.css";

export const Hero = () => {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Secure File Storage for Everyone
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl animate-fade-in animate-delay-100">
            ZenVault provides a secure, easy-to-use platform for storing,
            sharing, and managing your files. Like Google Drive, but with
            enhanced privacy and security features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-200">
            <Button size="lg" className="text-base px-8 py-6">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6">
              Learn More
            </Button>
          </div>
          <div className="mt-16 relative w-full max-w-5xl animate-fade-in animate-delay-300">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-medium text-muted-foreground">
                  Dashboard Preview
                </span>
              </div>
            </div>
            <div className="absolute -z-10 -inset-1 blur-3xl bg-primary/20 opacity-50 rounded-[40px]"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};
