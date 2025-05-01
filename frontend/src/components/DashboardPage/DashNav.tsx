import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const DashNav = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b border-white/10">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-white/70">{user?.email}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-white/70 hover:text-white"
        >
          <LogOut className="size-4 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default DashNav;
