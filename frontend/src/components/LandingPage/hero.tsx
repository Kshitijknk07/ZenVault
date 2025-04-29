import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 md:py-32 flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Your files, <span className="text-indigo-600">secured</span> and{" "}
          <span className="text-indigo-600">accessible</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Store, access, and share your files from anywhere, with
          enterprise-grade security and seamless experience.
        </p>
        <Button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 h-auto"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
