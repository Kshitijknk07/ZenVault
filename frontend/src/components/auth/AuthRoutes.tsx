import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { Spinner } from "@/components/ui/spinner";

export function AuthRoutes() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/sign-in/*"
        element={
          isSignedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <div className="flex min-h-screen items-center justify-center">
              <SignIn routing="path" path="/sign-in" />
            </div>
          )
        }
      />
      <Route
        path="/sign-up/*"
        element={
          isSignedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <div className="flex min-h-screen items-center justify-center">
              <SignUp routing="path" path="/sign-up" />
            </div>
          )
        }
      />
      <Route
        path="/dashboard/*"
        element={
          isSignedIn ? <Dashboard /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/"
        element={
          isSignedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/sign-in" replace />
          )
        }
      />
    </Routes>
  );
}
