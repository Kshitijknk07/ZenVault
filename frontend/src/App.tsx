import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/ThemeProvider";
import { dark } from "@clerk/themes";
import Index from "./pages/Index";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const App = () => (
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      baseTheme: dark,
      elements: {
        formButtonPrimary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        card: "bg-background border border-border",
        formInput: "bg-background border border-input",
      },
    }}
  >
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/sign-in/*"
                element={
                  <div className="flex min-h-screen items-center justify-center">
                    <SignIn routing="path" path="/sign-in" />
                  </div>
                }
              />
              <Route
                path="/sign-up/*"
                element={
                  <div className="flex min-h-screen items-center justify-center">
                    <SignUp routing="path" path="/sign-up" />
                  </div>
                }
              />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ClerkProvider>
);

export default App;
