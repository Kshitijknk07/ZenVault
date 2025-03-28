import { FeatureCard } from "./FeatureCard";

export const FeaturesList = () => {
  const features = [
    {
      title: "Secure Storage",
      description: "Your files are encrypted and stored securely in the cloud.",
      icon: "🔒",
    },
    {
      title: "Easy Sharing",
      description:
        "Share files and folders with anyone, with custom permissions.",
      icon: "🔗",
    },
    {
      title: "Access Anywhere",
      description: "Access your files from any device, anywhere in the world.",
      icon: "🌐",
    },
  ];

  return (
    <div className="features-list">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
};
