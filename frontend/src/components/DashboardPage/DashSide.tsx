import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiGrid } from "react-icons/fi";

const DashSide = () => {
  return (
    <aside className="h-full w-56 bg-background border-r flex flex-col py-6 px-4 gap-2">
      <nav className="flex flex-col gap-1">
        <Button
          variant="secondary"
          className={cn(
            "w-full justify-start gap-2 text-primary font-semibold",
            "bg-muted"
          )}
        >
          <FiGrid />
          Dashboard
        </Button>
        {/* Future links (uncomment to enable) */}
        {/*
        <Button variant="ghost" className="w-full justify-start gap-2">
          <FiSettings />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <FiTrash2 />
          Trash
        </Button>
        */}
      </nav>
    </aside>
  );
};

export default DashSide;
