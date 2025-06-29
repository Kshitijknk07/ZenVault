import React from "react";
import LoginForm from "../components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400 drop-shadow">
          Sign in to ZenVault
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
