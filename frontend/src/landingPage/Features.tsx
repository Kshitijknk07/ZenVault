import { ShieldCheck, Share2, FolderOpen, Lock, CloudUpload, Clock, Database, Server, Globe, Scale, Code, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// SVG for grid pattern - same as Hero component
const GridPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <pattern id="grid-pattern-features" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern-features)" />
  </svg>
);

// Core features of ZenVault
const features = [
  {
    title: "End-to-End Encryption",
    description:
      "Your files are encrypted before they leave your device and stored securely in ZenVault.",
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    iconBg: "bg-white/10",
  },
  {
    title: "Smart File Sharing",
    description:
      "Easily share files with secure links and fine-grained access control.",
    icon: <Share2 className="w-8 h-8 text-white" />,
    iconBg: "bg-white/10",
  },
  {
    title: "Instant File Access",
    description:
      "Access and manage your files from any device, anytime, anywhere.",
    icon: <FolderOpen className="w-8 h-8 text-white" />,
    iconBg: "bg-white/10",
  },
];

// S3 cloud capabilities
const s3Features = [
  {
    title: "S3 Compatible Storage",
    description:
      "Fully compatible with Amazon S3 API, making it easy to integrate with existing tools and workflows.",
    icon: <Database className="w-8 h-8 text-white" />,
    iconBg: "bg-white/10",
  },
  {
    title: "Multi-region Support",
    description:
      "Deploy across multiple geographic regions for improved performance and compliance requirements.",
    icon: <Globe className="w-8 h-8 text-white" />,
    iconBg: "bg-white/10",
  },
  {
    title: "Auto-scaling",
    description:
      "Automatically scale resources up or down based on demand, ensuring optimal performance at all times.",
    icon: <Scale className="w-8 h-8 text-white" />,
    iconBg: "bg-white/10",
  },
  {
    title: "Data Redundancy",
    description:
      "Built-in data redundancy and replication to protect against data loss and ensure high availability.",
    icon: <Server className="w-8 h-8 text-white" />,
    iconBg: "bg-white/10",
  },
  {
    title: "Easy Integration",
    description:
      "Simple API and SDK integration with your existing applications and workflows.",
    icon: <Code className="w-8 h-8 text-white" />,
    iconBg: "bg-white/10",
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="bg-black border border-white/10 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group h-full"
      >
        <CardContent className="p-8 flex flex-col items-center text-center space-y-6 h-full">
          <motion.div 
            className={`${feature.iconBg} p-5 rounded-2xl relative group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50 group-hover:opacity-80"></div>
            <div className="relative">
              {feature.icon}
            </div>
          </motion.div>
          
          <div className="space-y-3 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-grow">
              {feature.description}
            </p>
          </div>
          
          <div className="w-full pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-px w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// About section with developer information
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10"
    >
      <div className="max-w-4xl mx-auto text-center md:text-left">
        <div className="md:flex items-center gap-10">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <motion.div 
              className="relative w-40 h-40 mx-auto md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Developer image placeholder - replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-5xl text-white font-bold">KK</div>
            </motion.div>
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Kshitij Narayan Kulkarni</h3>
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full border border-white/20 text-white text-sm inline-block">
                Solo Developer from India
              </span>
            </div>
            <p className="text-gray-400 text-base mb-4">
              I'm passionate about building secure, high-performance cloud storage solutions that are both powerful and easy to use. ZenVault represents my vision for what modern file storage should be.
            </p>
            <p className="text-gray-400 text-base">
              With a background in cloud architecture and security, I created ZenVault to combine the reliability of S3 with a focus on privacy and user experience.
            </p>
            
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300">
                <Github className="h-5 w-5 text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const featuresRef = useRef(null);
  const s3FeaturesRef = useRef(null);
  const aboutRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, margin: "-100px" });
  
  return (
    <>
      {/* Features Section */}
      <section id="features" className="w-full py-24 px-6 md:px-12 lg:px-24 bg-black relative" ref={featuresRef}>
        <GridPattern />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Core Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built for developers and teams who value simplicity, speed, and
              security. ZenVault provides everything you need to manage your files securely.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
          
          {/* S3 Cloud Features */}
          <motion.div 
            className="text-center mt-32 mb-16"
            ref={s3FeaturesRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              S3 Cloud Capabilities
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Enterprise-grade storage built on the industry-standard S3 protocol, offering unmatched compatibility and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {s3Features.map((feature, index) => (
              <FeatureCard key={`s3-${index}`} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="w-full py-24 px-6 md:px-12 lg:px-24 bg-black relative" ref={aboutRef}>
        <GridPattern />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              About the Developer
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Meet the creator behind ZenVault and learn about the project's vision.
            </p>
          </motion.div>
          
          <AboutSection />
        </div>
      </section>
    </>
  );
};

export default Features;
