import { Request, Response } from "express";
import { StorageService } from "../services/StorageService";
import { ApiResponse } from "../types";
import logger from "../config/logger";

export class StorageController {
  // Storage Quota Management
  static async getUserQuota(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const quota = await StorageService.getUserQuota(userId);

      res.json({
        success: true,
        message: "User quota retrieved successfully",
        data: quota,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get user quota error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get user quota",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async updateUserQuota(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { totalQuota } = req.body;

      if (!totalQuota || typeof totalQuota !== "number") {
        res.status(400).json({
          success: false,
          message: "Total quota is required and must be a number",
        } as ApiResponse);
        return;
      }

      const quota = await StorageService.updateUserQuota(userId, totalQuota);

      res.json({
        success: true,
        message: "User quota updated successfully",
        data: quota,
      } as ApiResponse);
    } catch (error) {
      logger.error("Update user quota error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update user quota",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async getUsageStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const stats = await StorageService.getUsageStats(userId);

      res.json({
        success: true,
        message: "Usage stats retrieved successfully",
        data: stats,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get usage stats error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get usage stats",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // File Type Support
  static async getSupportedFileTypes(
    _req: Request,
    res: Response
  ): Promise<void> {
    try {
      const fileTypes = await StorageService.getSupportedFileTypes();

      res.json({
        success: true,
        message: "Supported file types retrieved successfully",
        data: fileTypes,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get supported file types error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get supported file types",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // File Metadata Management
  static async addFileMetadata(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params;
      const { key, value } = req.body;

      if (!fileId) {
        res.status(400).json({
          success: false,
          message: "File ID is required",
        } as ApiResponse);
        return;
      }

      if (!key || !value) {
        res.status(400).json({
          success: false,
          message: "Key and value are required",
        } as ApiResponse);
        return;
      }

      const metadata = await StorageService.addFileMetadata(fileId, {
        key,
        value,
      });

      res.json({
        success: true,
        message: "File metadata added successfully",
        data: metadata,
      } as ApiResponse);
    } catch (error) {
      logger.error("Add file metadata error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add file metadata",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async getFileMetadata(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params;

      if (!fileId) {
        res.status(400).json({
          success: false,
          message: "File ID is required",
        } as ApiResponse);
        return;
      }

      const metadata = await StorageService.getFileMetadata(fileId);

      res.json({
        success: true,
        message: "File metadata retrieved successfully",
        data: metadata,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get file metadata error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get file metadata",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async updateFileMetadata(req: Request, res: Response): Promise<void> {
    try {
      const { fileId, key } = req.params;
      const { value } = req.body;

      if (!fileId || !key) {
        res.status(400).json({
          success: false,
          message: "File ID and key are required",
        } as ApiResponse);
        return;
      }

      if (!value) {
        res.status(400).json({
          success: false,
          message: "Value is required",
        } as ApiResponse);
        return;
      }

      const metadata = await StorageService.updateFileMetadata(
        fileId,
        key,
        value
      );

      if (!metadata) {
        res.status(404).json({
          success: false,
          message: "File metadata not found",
        } as ApiResponse);
        return;
      }

      res.json({
        success: true,
        message: "File metadata updated successfully",
        data: metadata,
      } as ApiResponse);
    } catch (error) {
      logger.error("Update file metadata error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update file metadata",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async deleteFileMetadata(req: Request, res: Response): Promise<void> {
    try {
      const { fileId, key } = req.params;

      if (!fileId || !key) {
        res.status(400).json({
          success: false,
          message: "File ID and key are required",
        } as ApiResponse);
        return;
      }

      const deleted = await StorageService.deleteFileMetadata(fileId, key);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "File metadata not found",
        } as ApiResponse);
        return;
      }

      res.json({
        success: true,
        message: "File metadata deleted successfully",
      } as ApiResponse);
    } catch (error) {
      logger.error("Delete file metadata error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete file metadata",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Hierarchical Folder Structure
  static async getFolderTree(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { parentFolderId } = req.query;

      const tree = await StorageService.getFolderTree(
        userId,
        parentFolderId as string
      );

      res.json({
        success: true,
        message: "Folder tree retrieved successfully",
        data: tree,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get folder tree error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get folder tree",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async getFolderHierarchy(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const hierarchy = await StorageService.getFolderHierarchy(userId);

      res.json({
        success: true,
        message: "Folder hierarchy retrieved successfully",
        data: hierarchy,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get folder hierarchy error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get folder hierarchy",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async getFolderBreadcrumb(req: Request, res: Response): Promise<void> {
    try {
      const { folderId } = req.params;

      if (!folderId) {
        res.status(400).json({
          success: false,
          message: "Folder ID is required",
        } as ApiResponse);
        return;
      }

      const breadcrumb = await StorageService.getFolderBreadcrumb(folderId);

      res.json({
        success: true,
        message: "Folder breadcrumb retrieved successfully",
        data: breadcrumb,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get folder breadcrumb error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get folder breadcrumb",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async getFolderWithStats(req: Request, res: Response): Promise<void> {
    try {
      const { folderId } = req.params;
      const userId = (req as any).user.userId;

      if (!folderId) {
        res.status(400).json({
          success: false,
          message: "Folder ID is required",
        } as ApiResponse);
        return;
      }

      const folder = await StorageService.getFolderWithStats(folderId, userId);

      if (!folder) {
        res.status(404).json({
          success: false,
          message: "Folder not found",
        } as ApiResponse);
        return;
      }

      res.json({
        success: true,
        message: "Folder with stats retrieved successfully",
        data: folder,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get folder with stats error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get folder with stats",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Bulk File Operations
  static async bulkFileOperation(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const operation = req.body;

      if (
        !operation.fileIds ||
        !Array.isArray(operation.fileIds) ||
        operation.fileIds.length === 0
      ) {
        res.status(400).json({
          success: false,
          message: "File IDs array is required",
        } as ApiResponse);
        return;
      }

      if (!operation.operation) {
        res.status(400).json({
          success: false,
          message: "Operation is required",
        } as ApiResponse);
        return;
      }

      const result = await StorageService.bulkFileOperation(userId, operation);

      res.json({
        success: result.success,
        message: result.message,
        data: result.results,
      } as ApiResponse);
    } catch (error) {
      logger.error("Bulk file operation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to perform bulk file operation",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Storage Analytics
  static async getStorageAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const analytics = await StorageService.getStorageAnalytics(userId);

      res.json({
        success: true,
        message: "Storage analytics retrieved successfully",
        data: analytics,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get storage analytics error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get storage analytics",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }
}
