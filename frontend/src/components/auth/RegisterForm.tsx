import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setMessage("Registration successful! Please sign in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-700/40 text-gray-100 placeholder:text-gray-400 shadow-lg transition"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-700/40 text-gray-100 placeholder:text-gray-400 shadow-lg transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      {message && (
        <div className="text-green-400 text-sm text-center">{message}</div>
      )}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg transition text-white text-lg tracking-wide mt-2"
        disabled={loading}
        style={{ boxShadow: "0 0 12px 2px #2563eb55" }}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
};

export default RegisterForm;
