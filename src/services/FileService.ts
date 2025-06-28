import { FileModel } from "../models/File";
import { FolderModel } from "../models/Folder";
import {
  File,
  Folder,
  FileVersion,
  FileUploadResponse,
  FileDownloadResponse,
  FileStats,
} from "../types";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import * as multer from "multer";
import logger from "../config/logger";

export class FileService {
  private static uploadDir = process.env["UPLOAD_DIR"] || "./uploads";
  private static maxFileSize = parseInt(
    process.env["MAX_FILE_SIZE"] || "100000000"
  ); // 100MB default

  // Initialize upload directory
  static initializeUploadDirectory(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // Configure multer for file uploads
  static getMulterConfig() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    });
  }

  // Upload file
  static async uploadFile(
    file: Express.Multer.File,
    userId: string,
    options: {
      folderId?: string;
      description?: string;
      isPublic?: boolean;
      tags?: string[];
    } = {}
  ): Promise<FileUploadResponse> {
    try {
      // Validate file size
      if (file.size > this.maxFileSize) {
        throw new Error(
          `File size exceeds maximum allowed size of ${this.maxFileSize} bytes`
        );
      }

      // Check folder access if specified
      if (options.folderId) {
        const folderAccess = await FolderModel.checkAccess(
          options.folderId,
          userId
        );
        if (!folderAccess.canWrite) {
          throw new Error("No write access to the specified folder");
        }
      }

      // Generate unique filename
      const uniqueFilename = this.generateUniqueFilename(file.originalname);
      const filePath = path.join(this.uploadDir, uniqueFilename);

      // Move uploaded file to final location
      fs.renameSync(file.path, filePath);

      // Create file record
      const fileData = {
        name: path.parse(file.originalname).name,
        originalName: file.originalname,
        description: options.description,
        mimeType: file.mimetype,
        size: file.size,
        filePath,
        folderId: options.folderId,
        ownerId: userId,
        isPublic: options.isPublic || false,
      };

      const createdFile = await FileModel.create(fileData);

      // Create initial version
      const version = await FileModel.createVersion(createdFile.id, {
        filePath,
        size: file.size,
        mimeType: file.mimetype,
        uploadedBy: userId,
      });

      // Update file with current version
      createdFile.currentVersion = version;

      logger.info(
        `File uploaded successfully: ${createdFile.id} by user ${userId}`
      );

      return {
        file: createdFile,
        version,
      };
    } catch (error) {
      // Clean up uploaded file on error
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw error;
    }
  }

  // Download file
  static async downloadFile(
    fileId: string,
    userId: string,
    versionNumber?: number
  ): Promise<FileDownloadResponse> {
    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Check access
    const access = await FileModel.checkAccess(fileId, userId);
    if (!access.canRead) {
      throw new Error("No read access to this file");
    }

    // Get version
    let version: FileVersion | null;
    if (versionNumber) {
      version = await FileModel.getVersion(fileId, versionNumber);
      if (!version) {
        throw new Error("Version not found");
      }
    } else {
      version = await FileModel.getCurrentVersion(fileId);
      if (!version) {
        throw new Error("No version found for this file");
      }
    }

    // Check if file exists on disk
    if (!fs.existsSync(version.filePath)) {
      throw new Error("File not found on disk");
    }

    // Generate temporary download URL (in a real app, you might use signed URLs)
    let downloadUrl = `/api/v1/files/${fileId}/download`;
    if (versionNumber) {
      downloadUrl += `?version=${versionNumber}`;
    }

    // Set expiration (1 hour from now)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    logger.info(`File download requested: ${fileId} by user ${userId}`);

    return {
      file,
      downloadUrl,
      expiresAt,
    };
  }

  // Get file stream for download
  static async getFileStream(
    fileId: string,
    userId: string,
    versionNumber?: number
  ): Promise<{
    stream: fs.ReadStream;
    file: File;
    version: FileVersion;
  }> {
    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Check access
    const access = await FileModel.checkAccess(fileId, userId);
    if (!access.canRead) {
      throw new Error("No read access to this file");
    }

    // Get version
    let version: FileVersion | null;
    if (versionNumber) {
      version = await FileModel.getVersion(fileId, versionNumber);
      if (!version) {
        throw new Error("Version not found");
      }
    } else {
      version = await FileModel.getCurrentVersion(fileId);
      if (!version) {
        throw new Error("No version found for this file");
      }
    }

    // Check if file exists on disk
    if (!fs.existsSync(version.filePath)) {
      throw new Error("File not found on disk");
    }

    // Create read stream
    const stream = fs.createReadStream(version.filePath);

    return { stream, file, version };
  }

  // Update file
  static async updateFile(
    fileId: string,
    userId: string,
    updates: {
      name?: string;
      description?: string;
      isPublic?: boolean;
      tags?: string[];
    }
  ): Promise<File> {
    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Check access
    const access = await FileModel.checkAccess(fileId, userId);
    if (!access.canWrite) {
      throw new Error("No write access to this file");
    }

    const updatedFile = await FileModel.update(fileId, updates);
    if (!updatedFile) {
      throw new Error("Failed to update file");
    }

    logger.info(`File updated: ${fileId} by user ${userId}`);

    return updatedFile;
  }

  // Delete file
  static async deleteFile(
    fileId: string,
    userId: string,
    permanent = false
  ): Promise<boolean> {
    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Check access
    const access = await FileModel.checkAccess(fileId, userId);
    if (!access.canAdmin) {
      throw new Error("No admin access to this file");
    }

    let success: boolean;
    if (permanent) {
      success = await FileModel.hardDelete(fileId);
    } else {
      success = await FileModel.softDelete(fileId);
    }

    if (success) {
      logger.info(
        `File ${permanent ? "permanently deleted" : "soft deleted"}: ${fileId} by user ${userId}`
      );
    }

    return success;
  }

  // Search files
  static async searchFiles(
    userId: string,
    params: {
      query?: string;
      mimeType?: string;
      minSize?: number;
      maxSize?: number;
      tags?: string[];
      isPublic?: boolean;
      folderId?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ files: File[]; total: number }> {
    // Add user filter to ensure users only see their own files or shared files
    const searchParams = {
      ...params,
      ownerId: userId,
    };

    return await FileModel.search(searchParams);
  }

  // Get file statistics
  static async getFileStats(userId: string): Promise<FileStats> {
    const userFiles = await FileModel.findByOwnerId(userId);

    const totalFiles = userFiles.length;
    const totalSize = userFiles.reduce(
      (sum: number, file: File) => sum + file.size,
      0
    );

    // Count files by type
    const filesByType: Record<string, number> = {};
    userFiles.forEach((file: File) => {
      const type = file.mimeType.split("/")[0];
      filesByType[type] = (filesByType[type] || 0) + 1;
    });

    // Get recent uploads (last 10)
    const recentUploads = userFiles
      .sort((a: File, b: File) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    // Get folder count
    const userFolders = await FolderModel.findByOwnerId(userId);
    const totalFolders = userFolders.length;

    // Storage limits (you can implement user-specific limits)
    const storageLimit = parseInt(
      process.env["STORAGE_LIMIT"] || "10737418240"
    ); // 10GB default

    return {
      totalFiles,
      totalSize,
      totalFolders,
      filesByType,
      recentUploads,
      storageUsed: totalSize,
      storageLimit,
    };
  }

  // Create new version of file
  static async createNewVersion(
    fileId: string,
    userId: string,
    file: Express.Multer.File
  ): Promise<FileVersion> {
    const existingFile = await FileModel.findById(fileId);
    if (!existingFile) {
      throw new Error("File not found");
    }

    // Check access
    const access = await FileModel.checkAccess(fileId, userId);
    if (!access.canWrite) {
      throw new Error("No write access to this file");
    }

    // Validate file size
    if (file.size > this.maxFileSize) {
      throw new Error(
        `File size exceeds maximum allowed size of ${this.maxFileSize} bytes`
      );
    }

    // Generate unique filename for new version
    const uniqueFilename = this.generateUniqueFilename(file.originalname);
    const filePath = path.join(this.uploadDir, uniqueFilename);

    // Move uploaded file to final location
    fs.renameSync(file.path, filePath);

    // Create new version
    const version = await FileModel.createVersion(fileId, {
      filePath,
      size: file.size,
      mimeType: file.mimetype,
      uploadedBy: userId,
    });

    logger.info(`New version created for file: ${fileId} by user ${userId}`);

    return version;
  }

  // Utility methods
  private static generateUniqueFilename(originalName: string): string {
    const timestamp = Date.now();
    const random = crypto.randomBytes(8).toString("hex");
    const ext = path.extname(originalName);
    return `${timestamp}-${random}${ext}`;
  }

  // Get file info without downloading
  static async getFileInfo(fileId: string, userId: string): Promise<File> {
    const file = await FileModel.findById(fileId, true);
    if (!file) {
      throw new Error("File not found");
    }

    // Check access
    const access = await FileModel.checkAccess(fileId, userId);
    if (!access.canRead) {
      throw new Error("No read access to this file");
    }

    return file;
  }

  // Get file versions
  static async getFileVersions(
    fileId: string,
    userId: string
  ): Promise<FileVersion[]> {
    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Check access
    const access = await FileModel.checkAccess(fileId, userId);
    if (!access.canRead) {
      throw new Error("No read access to this file");
    }

    return await FileModel.getVersions(fileId);
  }
}
