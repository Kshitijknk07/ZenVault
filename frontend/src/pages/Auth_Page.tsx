import { useState } from "react";
import { LoginForm } from "@/components/AuthPage/LoginForm";
import { SignupForm } from "@/components/AuthPage/SignupForm";

export default function Auth_Page() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c2c2e] p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        {isLogin ? <LoginForm className="text-white" /> : <SignupForm />}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-400 hover:underline"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
