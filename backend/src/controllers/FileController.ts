import { Request, Response } from "express";
import { FileService } from "../services/FileService";
import { FolderService } from "../services/FolderService";
import { ApiResponse } from "../types";
import logger from "../config/logger";

export class FileController {
  // File upload
  static async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: "No file uploaded",
        } as ApiResponse);
        return;
      }

      const userId = (req as any).user.userId;
      const { folderId, description, isPublic, tags } = req.body;

      const result = await FileService.uploadFile(req.file, userId, {
        folderId,
        description,
        isPublic: isPublic === "true",
        tags: tags ? tags.split(",") : undefined,
      });

      res.status(201).json({
        success: true,
        message: "File uploaded successfully",
        data: result,
      } as ApiResponse);
    } catch (error) {
      logger.error("File upload error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload file",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // File download
  static async downloadFile(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params;
      const { version } = req.query;
      const userId = (req as any).user.userId;

      if (!fileId) {
        res.status(400).json({
          success: false,
          message: "File ID is required",
        } as ApiResponse);
        return;
      }

      const versionNumber = version ? parseInt(version as string) : undefined;

      const {
        stream,
        file,
        version: fileVersion,
      } = await FileService.getFileStream(fileId, userId, versionNumber);

      // Set headers
      res.setHeader("Content-Type", fileVersion.mimeType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file.originalName}"`
      );
      res.setHeader("Content-Length", fileVersion.size.toString());

      // Pipe the file stream to response
      stream.pipe(res);

      // Handle stream errors
      stream.on("error", (error) => {
        logger.error("File stream error:", error);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: "Error streaming file",
          } as ApiResponse);
        }
      });
    } catch (error) {
      logger.error("File download error:", error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Failed to download file",
          error: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
      }
    }
  }

  // Get file info
  static async getFileInfo(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params;
      const userId = (req as any).user.userId;

      if (!fileId) {
        res.status(400).json({
          success: false,
          message: "File ID is required",
        } as ApiResponse);
        return;
      }

      const file = await FileService.getFileInfo(fileId, userId);

      res.json({
        success: true,
        message: "File info retrieved successfully",
        data: file,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get file info error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get file info",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Update file
  static async updateFile(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params;
      const userId = (req as any).user.userId;
      const { name, description, isPublic, tags } = req.body;

      if (!fileId) {
        res.status(400).json({
          success: false,
          message: "File ID is required",
        } as ApiResponse);
        return;
      }

      const updatedFile = await FileService.updateFile(fileId, userId, {
        name,
        description,
        isPublic: isPublic === "true",
        tags: tags ? tags.split(",") : undefined,
      });

      res.json({
        success: true,
        message: "File updated successfully",
        data: updatedFile,
      } as ApiResponse);
    } catch (error) {
      logger.error("Update file error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update file",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Delete file
  static async deleteFile(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params;
      const { permanent } = req.query;
      const userId = (req as any).user.userId;

      if (!fileId) {
        res.status(400).json({
          success: false,
          message: "File ID is required",
        } as ApiResponse);
        return;
      }

      const success = await FileService.deleteFile(
        fileId,
        userId,
        permanent === "true"
      );

      if (success) {
        res.json({
          success: true,
          message: `File ${permanent === "true" ? "permanently deleted" : "moved to trash"} successfully`,
        } as ApiResponse);
      } else {
        res.status(404).json({
          success: false,
          message: "File not found",
        } as ApiResponse);
      }
    } catch (error) {
      logger.error("Delete file error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete file",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Search files
  static async searchFiles(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const {
        query,
        mimeType,
        minSize,
        maxSize,
        tags,
        isPublic,
        folderId,
        page = "1",
        limit = "10",
      } = req.query;

      const searchParams: any = {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      };

      if (query) searchParams.query = query as string;
      if (mimeType) searchParams.mimeType = mimeType as string;
      if (minSize) searchParams.minSize = parseInt(minSize as string);
      if (maxSize) searchParams.maxSize = parseInt(maxSize as string);
      if (tags) searchParams.tags = (tags as string).split(",");
      if (isPublic !== undefined) searchParams.isPublic = isPublic === "true";
      if (folderId) searchParams.folderId = folderId as string;

      const result = await FileService.searchFiles(userId, searchParams);

      res.json({
        success: true,
        message: "Files retrieved successfully",
        data: result,
      } as ApiResponse);
    } catch (error) {
      logger.error("Search files error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to search files",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Get file statistics
  static async getFileStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;

      const stats = await FileService.getFileStats(userId);

      res.json({
        success: true,
        message: "File statistics retrieved successfully",
        data: stats,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get file stats error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get file statistics",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Get file versions
  static async getFileVersions(req: Request, res: Response): Promise<void> {
    try {
      const { fileId } = req.params;
      const userId = (req as any).user.userId;

      if (!fileId) {
        res.status(400).json({
          success: false,
          message: "File ID is required",
        } as ApiResponse);
        return;
      }

      const versions = await FileService.getFileVersions(fileId, userId);

      res.json({
        success: true,
        message: "File versions retrieved successfully",
        data: versions,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get file versions error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get file versions",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Create new version
  static async createNewVersion(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: "No file uploaded",
        } as ApiResponse);
        return;
      }

      const { fileId } = req.params;
      const userId = (req as any).user.userId;

      if (!fileId) {
        res.status(400).json({
          success: false,
          message: "File ID is required",
        } as ApiResponse);
        return;
      }

      const version = await FileService.createNewVersion(
        fileId,
        userId,
        req.file
      );

      res.status(201).json({
        success: true,
        message: "New version created successfully",
        data: version,
      } as ApiResponse);
    } catch (error) {
      logger.error("Create new version error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create new version",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  // Folder operations
  static async createFolder(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { name, description, parentFolderId, isPublic } = req.body;

      const folder = await FolderService.createFolder(userId, {
        name,
        description,
        parentFolderId,
        isPublic: isPublic === "true",
      });

      res.status(201).json({
        success: true,
        message: "Folder created successfully",
        data: folder,
      } as ApiResponse);
    } catch (error) {
      logger.error("Create folder error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create folder",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async getFolder(req: Request, res: Response): Promise<void> {
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

      const folder = await FolderService.getFolder(folderId, userId);

      res.json({
        success: true,
        message: "Folder retrieved successfully",
        data: folder,
      } as ApiResponse);
    } catch (error) {
      logger.error("Get folder error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get folder",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async updateFolder(req: Request, res: Response): Promise<void> {
    try {
      const { folderId } = req.params;
      const userId = (req as any).user.userId;
      const { name, description, isPublic } = req.body;

      if (!folderId) {
        res.status(400).json({
          success: false,
          message: "Folder ID is required",
        } as ApiResponse);
        return;
      }

      const folder = await FolderService.updateFolder(folderId, userId, {
        name,
        description,
        isPublic: isPublic === "true",
      });

      res.json({
        success: true,
        message: "Folder updated successfully",
        data: folder,
      } as ApiResponse);
    } catch (error) {
      logger.error("Update folder error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update folder",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async deleteFolder(req: Request, res: Response): Promise<void> {
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

      const success = await FolderService.deleteFolder(folderId, userId);

      if (success) {
        res.json({
          success: true,
          message: "Folder deleted successfully",
        } as ApiResponse);
      } else {
        res.status(404).json({
          success: false,
          message: "Folder not found",
        } as ApiResponse);
      }
    } catch (error) {
      logger.error("Delete folder error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete folder",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }

  static async searchFolders(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const {
        query,
        isPublic,
        parentFolderId,
        page = "1",
        limit = "10",
      } = req.query;

      const searchParams: any = {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      };

      if (query) searchParams.query = query as string;
      if (isPublic !== undefined) searchParams.isPublic = isPublic === "true";
      if (parentFolderId)
        searchParams.parentFolderId = parentFolderId as string;

      const result = await FolderService.searchFolders(userId, searchParams);

      res.json({
        success: true,
        message: "Folders retrieved successfully",
        data: result,
      } as ApiResponse);
    } catch (error) {
      logger.error("Search folders error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to search folders",
        error: error instanceof Error ? error.message : "Unknown error",
      } as ApiResponse);
    }
  }
}
