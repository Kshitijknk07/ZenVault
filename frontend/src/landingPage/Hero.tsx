import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full bg-[#0F172A] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Secure. Simple. Powerful. <br />
          Welcome to <span className="text-[#A855F7]">ZenVault</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl">
          Your modern, open-source file vault. Upload, manage, and share files
          effortlessly with full control and security.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button
            size="lg"
            className="px-8 py-6 text-base bg-[#A855F7] hover:bg-[#9333EA] text-white"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base border-gray-400 text-white hover:border-[#A855F7] hover:text-[#A855F7]"
          >
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
