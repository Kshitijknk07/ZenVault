export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  folderId: string | null;
  ownerId: string;
  isPublic: boolean;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface FileUploadProgress {
  fileId: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export interface FileFilter {
  type?: string;
  search?: string;
  sortBy?: "name" | "date" | "size";
  sortOrder?: "asc" | "desc";
  folderId?: string | null;
}
