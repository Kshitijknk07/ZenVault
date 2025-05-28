import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Files", href: "/files" },
  { name: "Settings", href: "/settings" },
];

const Headers = () => {
  return (
    <header className="w-full bg-[#18181B] text-white px-4 py-3 flex justify-between items-center shadow-md border-b border-zinc-700">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-[#18181B] text-white">
          <div className="flex flex-col gap-4 mt-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-medium hover:text-[#A855F7] transition"
              >
                {item.name}
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <a
        href="/"
        className="text-2xl font-bold text-[#A855F7] flex items-center gap-2"
      >
        <img src="/logo.svg" alt="ZenVault Logo" className="w-7 h-7" />
        ZenVault
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 items-center">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-300 hover:text-[#A855F7] transition text-sm font-medium"
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="/user.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-800">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Headers;
