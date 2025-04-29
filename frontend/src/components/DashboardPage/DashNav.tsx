import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FiSearch, FiUpload } from "react-icons/fi";

const DashNav = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-[#2c2c2e] border-b border-[#3b82f6]/20">
      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search files..."
            className="pl-10 pr-4 bg-[#2c2c2e] border-[#3b82f6]/30 text-white focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
        </div>
      </div>
      {/* Upload Button & User Dropdown */}
      <div className="flex items-center gap-4">
        <Button
          className="gap-2 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white"
          variant="default"
        >
          <FiUpload />+ Upload
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 text-white hover:bg-[#3b82f6]/10"
            >
              <Avatar>
                <img
                  src="https://placehold.co/32x32"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-[#3b82f6]/30"
                />
              </Avatar>
              <span className="hidden md:inline font-medium">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#2c2c2e] border-[#3b82f6]/30 text-white"
          >
            <DropdownMenuItem
              asChild
              className="hover:bg-[#3b82f6]/10 focus:bg-[#3b82f6]/10"
            >
              <a href="#profile">Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:bg-[#3b82f6]/10 focus:bg-[#3b82f6]/10"
            >
              <a href="#logout">Logout</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashNav;
