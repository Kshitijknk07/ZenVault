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
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-background border-b">
      {/* Logo / App Name */}
      <div className="flex items-center gap-2 text-xl font-bold text-primary">
        <span className="bg-primary text-primary-foreground rounded-md px-2 py-1"></span>
        ZenVault
      </div>
      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search files..."
            className="pl-10 pr-4"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      {/* Upload Button & User Dropdown */}
      <div className="flex items-center gap-4">
        <Button className="gap-2" variant="default">
          <FiUpload />+ Upload
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar>
                <img
                  src="https://placehold.co/32x32"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border"
                />
              </Avatar>
              <span className="hidden md:inline font-medium">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href="#profile">Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#logout">Logout</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashNav;
