import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./Features.css";

export const Features = () => {
  const features = [
    {
      title: "Secure Storage",
      description:
        "All your files are encrypted end-to-end, ensuring maximum security and privacy.",
      icon: "🔒",
    },
    {
      title: "Easy Sharing",
      description:
        "Share files and folders with anyone, with customizable access permissions.",
      icon: "🔄",
    },
    {
      title: "Automatic Backup",
      description:
        "Never lose important files with automatic backup and version history.",
      icon: "🔄",
    },
    {
      title: "Cross-Platform",
      description:
        "Access your files from any device - desktop, mobile, or web browser.",
      icon: "📱",
    },
    {
      title: "Advanced Search",
      description:
        "Find any file instantly with our powerful search capabilities.",
      icon: "🔍",
    },
    {
      title: "Collaboration Tools",
      description:
        "Work together on documents with real-time collaboration features.",
      icon: "👥",
    },
  ];

  return (
    <section className="w-full py-24 bg-muted/50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Powerful Features for Everyone
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ZenVault combines security, simplicity, and functionality to provide
            the best file storage experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-1 w-12 bg-primary/30 rounded-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
