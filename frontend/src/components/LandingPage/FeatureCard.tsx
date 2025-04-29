import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border-0 bg-[#2c2c2e] text-white shadow-md hover:shadow-lg hover:shadow-[#3b82f6]/5 transition-all duration-300 h-full">
      <CardHeader>
        <div className="bg-[#3b82f6]/10 p-4 rounded-lg w-fit mb-4 border border-[#3b82f6]/20">
          <Icon className="h-6 w-6 text-[#3b82f6]" />
        </div>
        <CardTitle className="text-white text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/70">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
