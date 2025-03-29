import { Button } from "../ui/Button";
import { BackgroundBeams } from "../ui/background-beams";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundBeams />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
              Secure Your Digital Assets with ZenVault
            </h1>

            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto lg:mx-0">
              The most secure and peaceful way to store, manage, and protect
              your valuable digital assets with end-to-end encryption.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                Get Started for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:border-primary"
              >
                Learn More
              </Button>
            </div>

            <div className="mt-12">
              <p className="text-foreground/60 mb-4">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="glass h-12 px-6 rounded-lg flex items-center justify-center">
                  <span className="text-foreground/80 font-semibold">
                    TechCorp
                  </span>
                </div>
                <div className="glass h-12 px-6 rounded-lg flex items-center justify-center">
                  <span className="text-foreground/80 font-semibold">
                    SecureData
                  </span>
                </div>
                <div className="glass h-12 px-6 rounded-lg flex items-center justify-center">
                  <span className="text-foreground/80 font-semibold">
                    CryptoSafe
                  </span>
                </div>
                <div className="glass h-12 px-6 rounded-lg flex items-center justify-center">
                  <span className="text-foreground/80 font-semibold">
                    VaultGuard
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[400px] md:h-[500px] animate-float">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl -z-10"></div>
              <div className="glass w-full h-full rounded-2xl p-6 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute top-4 left-4 glass rounded-lg p-4 animate-float-slow">
                    <div className="w-8 h-8 rounded-full bg-primary mb-2"></div>
                    <div className="w-32 h-3 bg-foreground/20 rounded-full mb-2"></div>
                    <div className="w-24 h-3 bg-foreground/20 rounded-full"></div>
                  </div>

                  <div className="absolute bottom-4 right-4 glass rounded-lg p-4 animate-float-fast">
                    <div className="w-8 h-8 rounded-full bg-secondary mb-2"></div>
                    <div className="w-32 h-3 bg-foreground/20 rounded-full mb-2"></div>
                    <div className="w-24 h-3 bg-foreground/20 rounded-full"></div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass rounded-lg p-6 w-48 h-48">
                    <div className="w-12 h-12 rounded-full bg-accent mx-auto mb-4"></div>
                    <div className="w-full h-3 bg-foreground/20 rounded-full mb-3"></div>
                    <div className="w-full h-3 bg-foreground/20 rounded-full mb-3"></div>
                    <div className="w-3/4 h-3 bg-foreground/20 rounded-full mx-auto"></div>
                    <div className="mt-6 w-full h-8 bg-gradient-to-r from-primary to-secondary rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
