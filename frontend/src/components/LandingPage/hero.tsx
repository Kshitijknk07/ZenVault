import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 md:py-32 bg-[#2c2c2e] flex items-center relative overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#3b82f6]/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#3b82f6]/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center bg-[#3b82f6]/10 px-4 py-2 rounded-full mb-6 border border-[#3b82f6]/20">
          <Shield className="h-4 w-4 text-[#3b82f6] mr-2" />
          <span className="text-sm text-white">
            Enterprise-grade security for everyone
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
          Your files, <span className="text-[#3b82f6]">secured</span> and{" "}
          <span className="text-[#3b82f6]">accessible</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Store, access, and share your files from anywhere with military-grade
          encryption and a seamless user experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white px-8 py-6 h-auto transition-colors w-full sm:w-auto"
            onClick={() => navigate("/auth")}
          >
            Get Started Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-[#3b82f6]/30 text-white hover:bg-[#3b82f6]/10 px-8 py-6 h-auto transition-colors flex items-center w-full sm:w-auto"
          >
            See How It Works <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-12 text-white/60 text-sm">
          <p>No credit card required • Free 10GB storage • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
