export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
  storageQuota?: StorageQuota;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// File Management Types

export interface Folder {
  id: string;
  name: string;
  description?: string;
  parentFolderId?: string;
  ownerId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  parentFolder?: Folder;
  subFolders?: Folder[];
  files?: File[];
  owner?: User;
  stats?: FolderStats;
  path?: string;
  depth?: number;
}

export interface File {
  id: string;
  name: string;
  originalName: string;
  description?: string;
  mimeType: string;
  size: number;
  filePath: string;
  folderId?: string;
  ownerId: string;
  isPublic: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  folder?: Folder;
  owner?: User;
  versions?: FileVersion[];
  tags?: FileTag[];
  currentVersion?: FileVersion;
  metadata?: FileMetadata[];
  category?: FileCategory;
}

export interface FileVersion {
  id: string;
  fileId: string;
  versionNumber: number;
  filePath: string;
  size: number;
  mimeType: string;
  checksum: string;
  uploadedBy: string;
  createdAt: Date;
  file?: File;
  uploadedByUser?: User;
}

export interface FileShare {
  id: string;
  resourceType: "file" | "folder";
  resourceId: string;
  sharedBy: string;
  sharedWith?: string;
  shareToken?: string;
  permission: "read" | "write" | "admin";
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  sharedByUser?: User;
  sharedWithUser?: User;
  resource?: File | Folder;
}

export interface FileTag {
  id: string;
  name: string;
  color: string;
  createdBy: string;
  createdAt: Date;
  createdByUser?: User;
}

export interface FileAccessLog {
  id: string;
  userId?: string;
  resourceType: "file" | "folder";
  resourceId: string;
  action: "view" | "download" | "upload" | "edit" | "delete" | "share";
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  user?: User;
}

// File Management Request/Response Types

export interface CreateFolderRequest {
  name: string;
  description?: string;
  parentFolderId?: string;
  isPublic?: boolean;
}

export interface UpdateFolderRequest {
  name?: string;
  description?: string;
  isPublic?: boolean;
}

export interface UploadFileRequest {
  folderId?: string;
  description?: string;
  isPublic?: boolean;
  tags?: string[];
}

export interface UpdateFileRequest {
  name?: string;
  description?: string;
  isPublic?: boolean;
  tags?: string[];
}

export interface ShareResourceRequest {
  resourceType: "file" | "folder";
  resourceId: string;
  sharedWith?: string;
  shareToken?: string;
  permission?: "read" | "write" | "admin";
  expiresAt?: Date;
}

export interface CreateTagRequest {
  name: string;
  color?: string;
}

export interface FileSearchParams extends PaginationParams {
  query?: string;
  mimeType?: string;
  minSize?: number;
  maxSize?: number;
  tags?: string[];
  isPublic?: boolean;
  folderId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface FolderSearchParams extends PaginationParams {
  query?: string;
  isPublic?: boolean;
  parentFolderId?: string;
}

export interface FileUploadResponse {
  file: File;
  version: FileVersion;
  uploadUrl?: string;
}

export interface FileDownloadResponse {
  file: File;
  downloadUrl: string;
  expiresAt: Date;
}

export interface FileStats {
  totalFiles: number;
  totalSize: number;
  totalFolders: number;
  filesByType: Record<string, number>;
  filesByCategory: Record<FileCategory, number>;
  recentUploads: File[];
  storageUsed: number;
  storageLimit: number;
  storageUsagePercentage: number;
  quotaRemaining: number;
}

// Storage & Organization Types
export interface StorageQuota {
  id: string;
  userId: string;
  totalQuota: number; // in bytes
  usedQuota: number; // in bytes
  createdAt: Date;
  updatedAt: Date;
}

export enum FileCategory {
  DOCUMENT = "document",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  ARCHIVE = "archive",
  OTHER = "other",
}

export interface FileTypeInfo {
  category: FileCategory;
  extensions: string[];
  mimeTypes: string[];
  maxSize: number; // in bytes
  isPreviewable: boolean;
}

export interface FileMetadata {
  id: string;
  fileId: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FolderStats {
  id: string;
  folderId: string;
  totalFiles: number;
  totalSize: number;
  lastUpdated: Date;
}

export interface StorageQuotaRequest {
  totalQuota: number;
}

export interface FileMetadataRequest {
  key: string;
  value: string;
}

export interface BulkFileOperationRequest {
  fileIds: string[];
  operation: "move" | "copy" | "delete" | "tag" | "untag";
  destinationFolderId?: string;
  tags?: string[];
}

export interface FolderTreeResponse {
  id: string;
  name: string;
  path: string;
  depth: number;
  hasChildren: boolean;
  fileCount: number;
  totalSize: number;
}
