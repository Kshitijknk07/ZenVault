import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const query = useQuery();
  const navigate = useNavigate();
  const token = query.get("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");
      setSuccess("Password reset successful! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="password"
        name="password"
        placeholder="New password"
        className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-700/40 text-gray-100 placeholder:text-gray-400 shadow-lg transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm new password"
        className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-700/40 text-gray-100 placeholder:text-gray-400 shadow-lg transition"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
