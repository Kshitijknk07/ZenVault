import React, { useState } from "react";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Invalid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to send reset email");
      setSuccess(
        "If your email is registered, you will receive a password reset link."
      );
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-700/40 text-gray-100 placeholder:text-gray-400 shadow-lg transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm text-center">{success}</div>
      )}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg transition text-white text-lg tracking-wide mt-2"
        disabled={loading}
        style={{ boxShadow: "0 0 12px 2px #2563eb55" }}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
