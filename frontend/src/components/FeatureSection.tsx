import FeatureCard from "./FeatureCard";
import { Upload, Lock, Globe, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Upload,
      title: "Easy File Upload",
      description:
        "Drag and drop files to upload or select them from your device with a simple click.",
    },
    {
      icon: Lock,
      title: "Secure Storage",
      description:
        "All your files are encrypted end-to-end and protected with advanced security protocols.",
    },
    {
      icon: Globe,
      title: "Access Anywhere",
      description:
        "Access your files from any device, anywhere in the world with an internet connection.",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description:
        "Experience lightning-fast uploads and downloads with our optimized infrastructure.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose FileVault
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
