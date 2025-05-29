import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const registerUser = async (data: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.errors) {
      throw new Error(
        error.response.data.errors.map((e: any) => e.msg).join(", ")
      );
    }
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
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
    throw new Error(error.response?.data?.message || "Logout failed");
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
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};
