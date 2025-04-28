import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-full py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-semibold">FileVault</div>
        <Button variant="outline">Sign In</Button>
      </div>
    </nav>
  );
};

export default Navbar;
