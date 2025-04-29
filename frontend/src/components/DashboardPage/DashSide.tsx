import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiGrid, FiSettings, FiTrash2 } from "react-icons/fi";

const DashSide = () => {
  return (
    <aside className="h-full w-56 bg-[#2c2c2e] border-r border-[#3b82f6]/20 flex flex-col py-6 px-4 gap-2">
      <div className="mb-6 px-2">
        <div className="text-xl font-bold text-white flex items-center">
          <span className="text-[#3b82f6] mr-2">Zen</span>Vault
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        <Button
          variant="secondary"
          className={cn(
            "w-full justify-start gap-2 text-white font-semibold",
            "bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 border border-[#3b82f6]/30"
          )}
        >
          <FiGrid className="text-[#3b82f6]" />
          Dashboard
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-white hover:bg-[#3b82f6]/10"
        >
          <FiSettings className="text-white/70" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-white hover:bg-[#3b82f6]/10"
        >
          <FiTrash2 className="text-white/70" />
          Trash
        </Button>
      </nav>
    </aside>
  );
};

export default DashSide;
