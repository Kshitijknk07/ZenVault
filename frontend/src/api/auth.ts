import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.errors) {
      throw new Error(
        error.response.data.errors.map((e: any) => e.msg).join(", ")
      );
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      );
    }
    throw new Error(
      "Registration failed. Please check your connection and try again."
    );
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      );
    }
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    localStorage.removeItem("token");
  } catch (error: any) {
    console.error("Logout error:", error);
    localStorage.removeItem("token"); // Still remove token even if server request fails
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};
