import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-center gap-4 px-4">
        <h1 className="text-lg font-semibold">ZenVault</h1>
        <Button variant="outline">Sign In</Button>
      </div>
    </header>
  );
}
