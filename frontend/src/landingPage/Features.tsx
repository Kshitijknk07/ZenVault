import { ShieldCheck, Share2, FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "End-to-End Encryption",
    description:
      "Your files are encrypted before they leave your device and stored securely in ZenVault.",
    icon: <ShieldCheck className="w-8 h-8 text-[#A855F7]" />,
  },
  {
    title: "Smart File Sharing",
    description:
      "Easily share files with secure links and fine-grained access control.",
    icon: <Share2 className="w-8 h-8 text-[#A855F7]" />,
  },
  {
    title: "Instant File Access",
    description:
      "Access and manage your files from any device, anytime, anywhere.",
    icon: <FolderOpen className="w-8 h-8 text-[#A855F7]" />,
  },
];

const Features = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-[#0F172A]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
          ZenVault Features
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
          Built for developers and teams who value simplicity, speed, and
          security.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-[#1E293B] border border-[#334155] shadow-md hover:shadow-xl transition duration-300"
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="bg-[#334155] p-4 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
