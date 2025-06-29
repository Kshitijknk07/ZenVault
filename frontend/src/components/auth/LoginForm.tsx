import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!identifier || !password) {
      setError("Email/Username and password are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: identifier.includes("@") ? identifier : undefined,
          username: !identifier.includes("@") ? identifier : undefined,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      // Store tokens as needed (localStorage/session/cookie)
      // localStorage.setItem("accessToken", data.accessToken);
      // localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/"); // Redirect to dashboard or home
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        name="identifier"
        placeholder="Email or Username"
        className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-700/40 text-gray-100 placeholder:text-gray-400 shadow-lg transition"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-700/40 text-gray-100 placeholder:text-gray-400 shadow-lg transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="text-red-400 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg transition text-white text-lg tracking-wide mt-2"
        disabled={loading}
        style={{ boxShadow: "0 0 12px 2px #2563eb55" }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <div className="flex flex-col gap-2 mt-2 text-sm text-center">
        <Link to="/forgot-password" className="text-blue-400 hover:underline">
          Forgot password?
        </Link>
        <Link
          to="/register"
          className="text-blue-400 hover:underline font-semibold text-base mt-2"
        >
          Create a new account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
