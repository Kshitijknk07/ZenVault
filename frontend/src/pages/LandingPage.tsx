import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/LandingPage/FeatureSection";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#2c2c2e] text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3b82f6] text-white">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-[#3b82f6]">Zen</span>Vault
            </span>
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="text-white hover:text-[#3b82f6]"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-[#3b82f6] hover:bg-[#3b82f6]/90"
            >
              Get Started
            </Button>
          </div>
        </nav>

        <div className="py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Secure Cloud Storage for Your Digital Life
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mb-10">
            ZenVault provides military-grade encryption and intuitive file
            management for all your important documents.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-lg px-8 py-6 h-auto"
          >
            Start Free Trial
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <footer className="bg-[#1c1c1e] py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3b82f6] text-white">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-[#3b82f6]">Zen</span>Vault
            </span>
          </div>
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} ZenVault. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
