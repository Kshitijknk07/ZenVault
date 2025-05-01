import FeatureCard from "./FeatureCard";
import {
  Upload,
  Lock,
  Globe,
  Zap,
  Shield,
  Clock,
  Users,
  Search,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Upload,
      title: "Effortless File Upload",
      description:
        "Drag and drop multiple files or entire folders with our intuitive interface. Supports files up to 10GB in size.",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description:
        "Your files are encrypted before they leave your device and can only be decrypted by you or your authorized recipients.",
    },
    {
      icon: Globe,
      title: "Access Anywhere",
      description:
        "Seamlessly access your files from any device with our responsive web app, iOS and Android mobile apps.",
    },
    {
      icon: Zap,
      title: "Lightning-Fast Transfers",
      description:
        "Our optimized infrastructure ensures rapid uploads and downloads even with large files or slower connections.",
    },
    {
      icon: Shield,
      title: "Advanced Permissions",
      description:
        "Set granular access controls, password protection, and expiration dates for shared files and folders.",
    },
    {
      icon: Clock,
      title: "Automatic Versioning",
      description:
        "Never lose your work with automatic file versioning that lets you restore previous versions with a single click.",
    },
    {
      icon: Users,
      title: "Seamless Collaboration",
      description:
        "Share files and folders with team members or clients and collaborate in real-time with comments and notifications.",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description:
        "Quickly find any file with our advanced search capabilities that index file contents, metadata, and tags.",
    },
  ];

  return (
    <section
      className="py-32 bg-gradient-to-b from-[#2c2c2e] to-[#23232a]"
      id="features"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-[#3b82f6]/10 px-5 py-2 rounded-full mb-6 border border-[#3b82f6]/20 shadow">
            <span className="text-base text-white font-semibold tracking-wide">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
            Everything You Need for Secure File Management
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg font-medium">
            ZenVault combines powerful features with an intuitive interface to
            give you complete control over your digital assets.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
