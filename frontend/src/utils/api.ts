import supabase from "./supabase";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

export const api = {
  auth: {
    register: (data: { email: string; password: string; name?: string }) =>
      fetchWithAuth("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    login: (data: { email: string; password: string }) =>
      fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    logout: () =>
      fetchWithAuth("/auth/logout", {
        method: "POST",
      }),
    getCurrentUser: () => fetchWithAuth("/auth/me"),
  },
};
