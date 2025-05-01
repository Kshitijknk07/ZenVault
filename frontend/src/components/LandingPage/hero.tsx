import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 md:py-40 bg-gradient-to-b from-[#23232a] to-[#2c2c2e] flex items-center relative overflow-hidden min-h-[70vh]">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-60 h-60 rounded-full bg-[#3b82f6]/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#3b82f6]/20 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center bg-[#3b82f6]/10 px-5 py-2 rounded-full mb-8 border border-[#3b82f6]/20 shadow">
          <Shield className="h-5 w-5 text-[#3b82f6] mr-2" />
          <span className="text-base text-white font-semibold tracking-wide">
            Enterprise-grade security for everyone
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-white drop-shadow-lg">
          Your files, <span className="text-[#3b82f6]">secured</span> and{" "}
          <span className="text-[#3b82f6]">accessible</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-medium">
          Store, access, and share your files from anywhere with military-grade
          encryption and a seamless user experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            size="lg"
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-10 py-6 h-auto text-lg font-bold rounded-full shadow-xl transition-all w-full sm:w-auto"
            onClick={() => navigate("/auth")}
          >
            Get Started Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-[#3b82f6]/40 text-white hover:bg-[#3b82f6]/10 px-10 py-6 h-auto text-lg font-semibold rounded-full flex items-center w-full sm:w-auto shadow-xl transition-all"
          >
            See How It Works <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="mt-14 text-white/70 text-base font-medium">
          <p>No credit card required • Free 10GB storage • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
