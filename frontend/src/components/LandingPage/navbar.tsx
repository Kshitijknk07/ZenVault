import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full py-6 bg-gradient-to-b from-[#23232a] to-[#2c2c2e] border-b border-[#3b82f6]/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-white flex items-center tracking-tight">
          <span className="text-[#3b82f6] mr-2">Zen</span>Vault
        </div>
        <div className="flex items-center space-x-8">
          <a
            href="#features"
            className="text-white/80 hover:text-[#3b82f6] transition-colors font-medium hidden md:block"
          >
            Features
          </a>
          <a
            href="#security"
            className="text-white/80 hover:text-[#3b82f6] transition-colors font-medium hidden md:block"
          >
            Security
          </a>
          <a
            href="#pricing"
            className="text-white/80 hover:text-[#3b82f6] transition-colors font-medium hidden md:block"
          >
            Pricing
          </a>
          <Button
            variant="outline"
            onClick={() => navigate("/auth")}
            className="border-[#3b82f6] text-white hover:bg-[#3b82f6] hover:text-white transition-colors font-semibold px-6 py-2 rounded-full shadow-md"
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
