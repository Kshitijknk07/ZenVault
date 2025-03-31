import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function useApi() {
  const { getToken } = useAuth();

  const fetchWithAuth = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      const token = await getToken();

      const headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      };

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `API error: ${response.status}`);
      }

      return response.json();
    },
    [getToken]
  );

  return {
    auth: {
      getProfile: () => fetchWithAuth("/auth/profile"),
    },
    files: {
      upload: async (file: File, folderId?: string) => {
        const token = await getToken();
        const formData = new FormData();
        formData.append("file", file);
        if (folderId) {
          formData.append("folderId", folderId);
        }

        const response = await fetch(`${API_URL}/files`, {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || `API error: ${response.status}`);
        }

        return response.json();
      },
      getInFolder: (folderId: string) =>
        fetchWithAuth(`/files/folder/${folderId}`),
      download: async (fileId: string) => {
        const token = await getToken();
        window.open(
          `${API_URL}/files/${fileId}/download?token=${token}`,
          "_blank"
        );
      },
      // Add other file methods as needed
    },
    folders: {
      create: (name: string, parentFolderId?: string) =>
        fetchWithAuth("/folders", {
          method: "POST",
          body: JSON.stringify({ name, parentFolderId }),
        }),
      getContents: (folderId: string) =>
        fetchWithAuth(`/folders/${folderId}/contents`),
      // Add other folder methods as needed
    },
    // Add other API endpoints as needed
  };
}
