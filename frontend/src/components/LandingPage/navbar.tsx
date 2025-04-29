import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-semibold">ZenVault</div>
        <Button variant="outline" onClick={() => navigate("/auth")}>
          Sign In
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
