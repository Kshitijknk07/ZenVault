import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/10 rounded-lg p-6 hover:border-[#3b82f6]/30 transition-all">
      <div className="bg-[#3b82f6]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-[#3b82f6] size-6" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
