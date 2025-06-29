import React from "react";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400 drop-shadow">
          Forgot your password?
        </h2>
        <ForgotPasswordForm />
        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-400 hover:underline text-sm">
            &larr; Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
