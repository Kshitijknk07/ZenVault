import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Lock, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// SVG for grid pattern
const GridPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full bg-black py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background grid pattern */}
      <GridPattern />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div 
        className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
          variants={itemVariants}
        >
          <span className="block mb-3">Secure. Simple. Powerful.</span>
          <span>Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#D8B4FE]">ZenVault</span></span>
        </motion.h1>

        <motion.p 
          className="mt-8 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
          variants={itemVariants}
        >
          Your modern, open-source file vault. Upload, manage, and share files
          effortlessly with full control and security.
        </motion.p>

        <motion.div 
          className="mt-12 flex flex-col sm:flex-row items-center gap-5"
          variants={itemVariants}
        >
          <Button
            size="lg"
            className="px-8 py-7 text-base font-medium bg-gradient-to-r from-[#A855F7] to-[#9333EA] hover:from-[#9333EA] hover:to-[#7928CA] text-white shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-7 text-base font-medium border-2 border-gray-700 text-white hover:border-[#A855F7] hover:text-[#A855F7] hover:bg-[#A855F7]/5 transition-all duration-300 flex items-center justify-center group w-full sm:w-auto mt-4 sm:mt-0"
          >
            Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Feature highlights with icons */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center group">
            <div className="p-3 bg-white/10 rounded-full mb-3 group-hover:bg-white/15 transition-all duration-300">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm">Enterprise-grade Security</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="p-3 bg-white/10 rounded-full mb-3 group-hover:bg-white/15 transition-all duration-300">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm">End-to-End Encryption</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="p-3 bg-white/10 rounded-full mb-3 group-hover:bg-white/15 transition-all duration-300">
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm">Secure File Sharing</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
