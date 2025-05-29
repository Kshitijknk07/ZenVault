import axios from "axios";
import { FileItem, Folder, FileFilter } from "../types/file";

const API_URL = "http://localhost:5000/api";

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// File operations
export const uploadFile = async (
  file: File,
  folderId: string | null = null
) => {
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) {
    formData.append("folderId", folderId);
  }

  try {
    const response = await axios.post(`${API_URL}/files/upload`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        // You can emit this progress to a global state or context
        console.log(percentCompleted);
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to upload file");
  }
};

export const getFiles = async (filter: FileFilter = {}) => {
  try {
    const response = await axios.get(`${API_URL}/files`, {
      headers: getAuthHeader(),
      params: filter,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch files");
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await axios.delete(`${API_URL}/files/${fileId}`, {
      headers: getAuthHeader(),
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete file");
  }
};

export const moveFile = async (fileId: string, folderId: string | null) => {
  try {
    await axios.patch(
      `${API_URL}/files/${fileId}/move`,
      { folderId },
      { headers: getAuthHeader() }
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to move file");
  }
};

// Folder operations
export const createFolder = async (
  name: string,
  parentId: string | null = null
) => {
  try {
    const response = await axios.post(
      `${API_URL}/folders`,
      { name, parentId },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create folder");
  }
};

export const getFolders = async (parentId: string | null = null) => {
  try {
    const response = await axios.get(`${API_URL}/folders`, {
      headers: getAuthHeader(),
      params: { parentId },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch folders");
  }
};

export const deleteFolder = async (folderId: string) => {
  try {
    await axios.delete(`${API_URL}/folders/${folderId}`, {
      headers: getAuthHeader(),
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete folder");
  }
};

export const moveFolder = async (
  folderId: string,
  newParentId: string | null
) => {
  try {
    await axios.patch(
      `${API_URL}/folders/${folderId}/move`,
      { parentId: newParentId },
      { headers: getAuthHeader() }
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to move folder");
  }
};
