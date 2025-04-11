import {
  Lock,
  Folder,
  Share2,
  History,
  Database,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Folder,
    title: "File Management",
    description:
      "Upload, organize, and manage your files with ease. Move items to trash and restore them when needed.",
    color: "text-zen-blue",
    bgColor: "bg-zen-blue/10",
    hoverBorder: "hover:border-zen-blue/30",
  },
  {
    icon: Folder,
    title: "Folder Organization",
    description:
      "Create nested folders to organize your content exactly how you want. Rename, move, and manage with intuitive controls.",
    color: "text-zen-purple",
    bgColor: "bg-zen-purple/10",
    hoverBorder: "hover:border-zen-purple/30",
  },
  {
    icon: Share2,
    title: "Secure Sharing",
    description:
      "Share files and folders with specific users or via secure links. Control permissions and set expiration dates.",
    color: "text-zen-teal",
    bgColor: "bg-zen-teal/10",
    hoverBorder: "hover:border-zen-teal/30",
  },
  {
    icon: History,
    title: "Version History",
    description:
      "Keep track of file changes with automatic versioning. Restore previous versions whenever you need.",
    color: "text-zen-blue",
    bgColor: "bg-zen-blue/10",
    hoverBorder: "hover:border-zen-blue/30",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description:
      "Protect your account with secure login and registration. Your data remains private and accessible only to you.",
    color: "text-zen-purple",
    bgColor: "bg-zen-purple/10",
    hoverBorder: "hover:border-zen-purple/30",
  },
  {
    icon: Database,
    title: "Storage Management",
    description:
      "Monitor your storage usage with clear visual indicators. Know exactly how much space you have available on your local storage.",
    color: "text-zen-teal",
    bgColor: "bg-zen-teal/10",
    hoverBorder: "hover:border-zen-teal/30",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Your Digital Life
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ZenVault provides all the tools you need to store, manage, and share
            your files securely on your local system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 ${feature.hoverBorder} transition-colors`}
            >
              <div
                className={`h-12 w-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
