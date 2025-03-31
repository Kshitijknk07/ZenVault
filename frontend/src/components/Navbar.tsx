import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Lock } from "lucide-react";

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 text-xl">
          <Lock className="h-6 w-6 text-accent" />
          <span className="font-bold gradient-text">ZenVault</span>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isSignedIn ? (
            <Button
              variant="default"
              className="bg-accent hover:bg-accent/90 text-white"
              asChild
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hover:bg-accent/10 hover:text-accent"
                asChild
              >
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button
                variant="default"
                className="bg-accent hover:bg-accent/90 text-white"
                asChild
              >
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
