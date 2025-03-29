import { Button } from "./Button";
import { BackgroundBeams } from "./background-beams";
import { TracingBeam } from "./tracing-beam";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundBeams />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Secure Your Digital Assets with ZenVault
          </h1>

          <p className="text-xl md:text-2xl text-foreground/80 mb-8">
            The most secure and peaceful way to store, manage, and protect your
            valuable digital assets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          <div className="mt-16">
            <p className="text-foreground/60 mb-4">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              <div className="w-24 h-8 bg-foreground/20 rounded"></div>
              <div className="w-24 h-8 bg-foreground/20 rounded"></div>
              <div className="w-24 h-8 bg-foreground/20 rounded"></div>
              <div className="w-24 h-8 bg-foreground/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
