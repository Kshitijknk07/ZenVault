const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "An error occurred");
  }
  return response.json();
};

export const userApi = {
  createClerkUser: async (clerkId: string, email?: string, name?: string) => {
    const response = await fetch(`${API_URL}/users/clerk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clerkId,
        email,
        name,
      }),
    });
    return handleResponse(response);
  },

  /**
   * Get the current user's profile
   */
  getProfile: async (token: string) => {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  updateProfile: async (token: string, data: any) => {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

export const fileApi = {
  uploadFile: async (token: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/files/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },

  getFileDownloadUrl: async (token: string, fileId: string) => {
    const response = await fetch(`${API_URL}/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  deleteFile: async (token: string, fileId: string) => {
    const response = await fetch(`${API_URL}/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  listFiles: async (token: string) => {
    const response = await fetch(`${API_URL}/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};
