import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  login: (data: {
    email?: string;
    username?: string;
    password: string;
  }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch user info if token exists (optional, if you have /me endpoint)
  useEffect(() => {
    if (accessToken) {
      // Optionally fetch user info here
      // fetchUser();
    }
  }, [accessToken]);

  // Store tokens in localStorage
  useEffect(() => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    else localStorage.removeItem("accessToken");
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    else localStorage.removeItem("refreshToken");
  }, [accessToken, refreshToken]);

  // Auto-refresh token logic (simple interval, can be improved)
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (refreshToken) {
      interval = setInterval(() => {
        refresh();
      }, 1000 * 60 * 10); // every 10 minutes
    }
    return () => interval && clearInterval(interval);
    // eslint-disable-next-line
  }, [refreshToken]);

  const login = async (data: {
    email?: string;
    username?: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Login failed");
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
      // Optionally set user info here
      setUser(result.user || null);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Registration failed");
      // Optionally auto-login after register
      // await login({ email: data.email, password: data.password });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch {
      // ignore
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setLoading(false);
      navigate("/login");
    }
  };

  const refresh = async () => {
    if (!refreshToken) return;
    try {
      const res = await fetch("/api/v1/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Refresh failed");
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
    } catch {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        register,
        logout,
        refresh,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
