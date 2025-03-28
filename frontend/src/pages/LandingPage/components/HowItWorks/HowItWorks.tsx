import { Container } from "@/components/ui/container";
import "./HowItWorks.css";

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create an Account",
      description:
        "Sign up for free in less than a minute with just your email address.",
    },
    {
      number: "02",
      title: "Upload Your Files",
      description:
        "Drag and drop files or use our uploader to store your documents securely.",
    },
    {
      number: "03",
      title: "Organize & Share",
      description:
        "Create folders, organize your files, and share them with others as needed.",
    },
    {
      number: "04",
      title: "Access Anywhere",
      description:
        "Access your files from any device, anytime, with our web and mobile apps.",
    },
  ];

  return (
    <section className="w-full py-24 bg-background">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How ZenVault Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting started with ZenVault is easy. Follow these simple steps to
            secure your files.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="md:grid md:grid-cols-2 md:gap-8 md:items-center"
              >
                <div
                  className={`relative z-10 ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div className="bg-card border border-border/50 rounded-lg p-8 shadow-sm relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div
                  className={`hidden md:flex items-center justify-center ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
