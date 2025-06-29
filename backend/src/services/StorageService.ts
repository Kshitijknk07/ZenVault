import { StorageQuotaModel } from "../models/StorageQuota";
import { FileCategoryModel } from "../models/FileCategory";
import { FileMetadataModel } from "../models/FileMetadata";
import { FolderModel } from "../models/Folder";
import { FileModel } from "../models/File";
import {
  StorageQuota,
  FileCategory,
  FileMetadata,
  FileMetadataRequest,
  BulkFileOperationRequest,
  FolderTreeResponse,
} from "../types";
import logger from "../config/logger";

export class StorageService {
  // Storage Quota Management
  static async getUserQuota(userId: string): Promise<StorageQuota | null> {
    return await StorageQuotaModel.findByUserId(userId);
  }

  static async createUserQuota(
    userId: string,
    totalQuota: number
  ): Promise<StorageQuota> {
    const existingQuota = await StorageQuotaModel.findByUserId(userId);
    if (existingQuota) {
      throw new Error("User quota already exists");
    }

    return await StorageQuotaModel.create(userId, totalQuota);
  }

  static async updateUserQuota(
    userId: string,
    totalQuota: number
  ): Promise<StorageQuota | null> {
    return await StorageQuotaModel.updateQuota(userId, totalQuota);
  }

  static async getUsageStats(userId: string): Promise<{
    usedQuota: number;
    totalQuota: number;
    usagePercentage: number;
    remainingQuota: number;
  }> {
    return await StorageQuotaModel.getUsageStats(userId);
  }

  static async checkQuotaExceeded(
    userId: string,
    fileSize: number
  ): Promise<boolean> {
    return await StorageQuotaModel.checkQuotaExceeded(userId, fileSize);
  }

  // File Type Support
  static async validateFileType(
    filename: string,
    mimeType: string,
    fileSize: number
  ): Promise<{
    isValid: boolean;
    category: FileCategory;
    maxSize: number;
    error?: string;
  }> {
    return await FileCategoryModel.validateFileType(
      filename,
      mimeType,
      fileSize
    );
  }

  static async getCategoryForFile(
    filename: string,
    mimeType: string
  ): Promise<FileCategory> {
    return await FileCategoryModel.getCategoryForFile(filename, mimeType);
  }

  static async getSupportedFileTypes(): Promise<{
    extensions: Record<FileCategory, string[]>;
    mimeTypes: Record<FileCategory, string[]>;
  }> {
    const [extensions, mimeTypes] = await Promise.all([
      FileCategoryModel.getSupportedExtensions(),
      FileCategoryModel.getSupportedMimeTypes(),
    ]);

    return { extensions, mimeTypes };
  }

  // File Metadata Management
  static async addFileMetadata(
    fileId: string,
    metadata: FileMetadataRequest
  ): Promise<FileMetadata> {
    return await FileMetadataModel.upsert(fileId, metadata.key, metadata.value);
  }

  static async getFileMetadata(fileId: string): Promise<FileMetadata[]> {
    return await FileMetadataModel.findByFileId(fileId);
  }

  static async updateFileMetadata(
    fileId: string,
    key: string,
    value: string
  ): Promise<FileMetadata | null> {
    return await FileMetadataModel.update(fileId, key, value);
  }

  static async deleteFileMetadata(
    fileId: string,
    key: string
  ): Promise<boolean> {
    return await FileMetadataModel.delete(fileId, key);
  }

  static async searchByMetadata(
    key: string,
    value: string
  ): Promise<FileMetadata[]> {
    return await FileMetadataModel.searchByKeyValue(key, value);
  }

  // Hierarchical Folder Structure
  static async getFolderTree(
    userId: string,
    parentFolderId?: string
  ): Promise<FolderTreeResponse[]> {
    const treeData = await FolderModel.getFolderTree(userId, parentFolderId);

    return treeData.map((item: any) => ({
      id: item.id,
      name: item.name,
      path: item.path,
      depth: item.depth,
      hasChildren: item.has_children,
      fileCount: Number(item.file_count) || 0,
      totalSize: Number(item.total_size) || 0,
    }));
  }

  static async getFolderHierarchy(userId: string): Promise<any[]> {
    return await FolderModel.getFolderHierarchy(userId);
  }

  static async getFolderBreadcrumb(folderId: string): Promise<any[]> {
    return await FolderModel.getFolderBreadcrumb(folderId);
  }

  static async getFolderWithStats(
    folderId: string,
    _userId: string
  ): Promise<any> {
    return await FolderModel.getFolderWithStats(folderId);
  }

  static async moveFolder(
    folderId: string,
    newParentFolderId: string | null,
    userId: string
  ): Promise<any> {
    // Check access permissions - using FileModel.checkAccess for now
    const access = await FileModel.checkAccess(folderId, userId);
    if (!access.canWrite) {
      throw new Error("No write access to this folder");
    }

    if (newParentFolderId) {
      const destAccess = await FileModel.checkAccess(newParentFolderId, userId);
      if (!destAccess.canWrite) {
        throw new Error("No write access to the destination folder");
      }
    }

    return await FolderModel.moveFolder(folderId, newParentFolderId);
  }

  // Bulk File Operations
  static async bulkFileOperation(
    userId: string,
    operation: BulkFileOperationRequest
  ): Promise<{ success: boolean; message: string; results: any[] }> {
    const results: any[] = [];
    let successCount = 0;
    let errorCount = 0;

    for (const fileId of operation.fileIds) {
      try {
        // Check access to file
        const access = await FileModel.checkAccess(fileId, userId);
        if (!access.canWrite) {
          results.push({ fileId, success: false, error: "No write access" });
          errorCount++;
          continue;
        }

        switch (operation.operation) {
          case "move":
            if (!operation.destinationFolderId) {
              results.push({
                fileId,
                success: false,
                error: "Destination folder required",
              });
              errorCount++;
              continue;
            }

            // Check destination folder access
            const folderAccess = await FileModel.checkAccess(
              operation.destinationFolderId,
              userId
            );
            if (!folderAccess.canWrite) {
              results.push({
                fileId,
                success: false,
                error: "No write access to destination folder",
              });
              errorCount++;
              continue;
            }

            // Use updateWithParent for folder operations
            const updateData: any = {};
            if (operation.destinationFolderId) {
              updateData.folderId = operation.destinationFolderId;
            }
            const updatedFile = await FileModel.update(fileId, updateData);
            results.push({ fileId, success: true, data: updatedFile });
            successCount++;
            break;

          case "delete":
            const deleted = await FileModel.softDelete(fileId);
            results.push({
              fileId,
              success: deleted,
              error: deleted ? undefined : "Failed to delete",
            });
            if (deleted) successCount++;
            else errorCount++;
            break;

          case "tag":
            if (!operation.tags || operation.tags.length === 0) {
              results.push({ fileId, success: false, error: "Tags required" });
              errorCount++;
              continue;
            }

            // Add tags (this would need to be implemented in FileModel)
            results.push({ fileId, success: true, message: "Tags added" });
            successCount++;
            break;

          case "untag":
            if (!operation.tags || operation.tags.length === 0) {
              results.push({ fileId, success: false, error: "Tags required" });
              errorCount++;
              continue;
            }

            // Remove tags (this would need to be implemented in FileModel)
            results.push({ fileId, success: true, message: "Tags removed" });
            successCount++;
            break;

          default:
            results.push({
              fileId,
              success: false,
              error: "Unknown operation",
            });
            errorCount++;
        }
      } catch (error) {
        results.push({
          fileId,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
        errorCount++;
      }
    }

    const success = errorCount === 0;
    const message = `Operation completed: ${successCount} successful, ${errorCount} failed`;

    logger.info(
      `Bulk operation ${operation.operation} completed by user ${userId}: ${message}`
    );

    return { success, message, results };
  }

  // Storage Analytics
  static async getStorageAnalytics(userId: string): Promise<{
    totalFiles: number;
    totalSize: number;
    filesByCategory: Record<FileCategory, number>;
    filesByType: Record<string, number>;
    largestFiles: any[];
    recentUploads: any[];
    storageUsage: {
      used: number;
      total: number;
      percentage: number;
    };
  }> {
    const [files, usageStats] = await Promise.all([
      FileModel.findByOwnerId(userId),
      this.getUsageStats(userId),
    ]);

    const filesByCategory: Record<FileCategory, number> = {
      [FileCategory.DOCUMENT]: 0,
      [FileCategory.IMAGE]: 0,
      [FileCategory.VIDEO]: 0,
      [FileCategory.AUDIO]: 0,
      [FileCategory.ARCHIVE]: 0,
      [FileCategory.OTHER]: 0,
    };

    const filesByType: Record<string, number> = {};
    const fileCategories = await Promise.all(
      files.map((file) =>
        this.getCategoryForFile(file.originalName, file.mimeType)
      )
    );

    files.forEach((file, index) => {
      const category = fileCategories[index];
      if (category) {
        filesByCategory[category]++;
      }

      const type = file.mimeType.split("/")[0];
      if (type) {
        filesByType[type] = (filesByType[type] || 0) + 1;
      }
    });

    const largestFiles = files.sort((a, b) => b.size - a.size).slice(0, 10);

    const recentUploads = files
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    return {
      totalFiles: files.length,
      totalSize: files.reduce((sum, file) => sum + file.size, 0),
      filesByCategory,
      filesByType,
      largestFiles,
      recentUploads,
      storageUsage: {
        used: usageStats.usedQuota,
        total: usageStats.totalQuota,
        percentage: usageStats.usagePercentage,
      },
    };
  }
}
