import { FolderModel } from "../models/Folder";
import { FileModel } from "../models/File";
import { Folder } from "../types";
import logger from "../config/logger";

export class FolderService {
  // Create folder
  static async createFolder(
    userId: string,
    folderData: {
      name: string;
      description?: string;
      parentFolderId?: string;
      isPublic?: boolean;
    }
  ): Promise<Folder> {
    // Check parent folder access if specified
    if (folderData.parentFolderId) {
      const parentAccess = await FolderModel.checkAccess(
        folderData.parentFolderId,
        userId
      );
      if (!parentAccess.canWrite) {
        throw new Error("No write access to the parent folder");
      }
    }

    const folder = await FolderModel.create({
      ...folderData,
      ownerId: userId,
    });

    logger.info(`Folder created: ${folder.id} by user ${userId}`);

    return folder;
  }

  // Get folder with contents
  static async getFolder(folderId: string, userId: string): Promise<Folder> {
    const folder = await FolderModel.findById(folderId, true);
    if (!folder) {
      throw new Error("Folder not found");
    }

    // Check access
    const access = await FolderModel.checkAccess(folderId, userId);
    if (!access.canRead) {
      throw new Error("No read access to this folder");
    }

    return folder;
  }

  // Update folder
  static async updateFolder(
    folderId: string,
    userId: string,
    updates: {
      name?: string;
      description?: string;
      isPublic?: boolean;
    }
  ): Promise<Folder> {
    const folder = await FolderModel.findById(folderId);
    if (!folder) {
      throw new Error("Folder not found");
    }

    // Check access
    const access = await FolderModel.checkAccess(folderId, userId);
    if (!access.canWrite) {
      throw new Error("No write access to this folder");
    }

    const updatedFolder = await FolderModel.update(folderId, updates);
    if (!updatedFolder) {
      throw new Error("Failed to update folder");
    }

    logger.info(`Folder updated: ${folderId} by user ${userId}`);

    return updatedFolder;
  }

  // Delete folder
  static async deleteFolder(
    folderId: string,
    userId: string
  ): Promise<boolean> {
    const folder = await FolderModel.findById(folderId);
    if (!folder) {
      throw new Error("Folder not found");
    }

    // Check access
    const access = await FolderModel.checkAccess(folderId, userId);
    if (!access.canAdmin) {
      throw new Error("No admin access to this folder");
    }

    // Check if folder has contents
    const subFolders = await FolderModel.findByParentId(folderId);
    const files = await FileModel.findByFolderId(folderId);

    if (subFolders.length > 0 || files.length > 0) {
      throw new Error(
        "Cannot delete folder with contents. Please delete all files and subfolders first."
      );
    }

    const success = await FolderModel.delete(folderId);

    if (success) {
      logger.info(`Folder deleted: ${folderId} by user ${userId}`);
    }

    return success;
  }

  // Search folders
  static async searchFolders(
    userId: string,
    params: {
      query?: string;
      isPublic?: boolean;
      parentFolderId?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ folders: Folder[]; total: number }> {
    // Add user filter to ensure users only see their own folders or shared folders
    const searchParams = {
      ...params,
      ownerId: userId,
    };

    return await FolderModel.search(searchParams);
  }

  // Get folder path
  static async getFolderPath(
    folderId: string,
    userId: string
  ): Promise<Folder[]> {
    const folder = await FolderModel.findById(folderId);
    if (!folder) {
      throw new Error("Folder not found");
    }

    // Check access
    const access = await FolderModel.checkAccess(folderId, userId);
    if (!access.canRead) {
      throw new Error("No read access to this folder");
    }

    return await FolderModel.getFolderPath(folderId);
  }

  // Get user's root folders
  static async getRootFolders(userId: string): Promise<Folder[]> {
    return await FolderModel.findByOwnerId(userId);
  }

  // Get folder contents (files and subfolders)
  static async getFolderContents(
    folderId: string,
    userId: string
  ): Promise<{
    folders: Folder[];
    files: any[];
  }> {
    const folder = await FolderModel.findById(folderId);
    if (!folder) {
      throw new Error("Folder not found");
    }

    // Check access
    const access = await FolderModel.checkAccess(folderId, userId);
    if (!access.canRead) {
      throw new Error("No read access to this folder");
    }

    const [folders, files] = await Promise.all([
      FolderModel.findByParentId(folderId),
      FileModel.findByFolderId(folderId),
    ]);

    return { folders, files };
  }

  // Move folder
  static async moveFolder(
    folderId: string,
    newParentFolderId: string | null,
    userId: string
  ): Promise<Folder> {
    const folder = await FolderModel.findById(folderId);
    if (!folder) {
      throw new Error("Folder not found");
    }

    // Check access to source folder
    const sourceAccess = await FolderModel.checkAccess(folderId, userId);
    if (!sourceAccess.canWrite) {
      throw new Error("No write access to the source folder");
    }

    // Check access to destination folder if specified
    if (newParentFolderId) {
      const destAccess = await FolderModel.checkAccess(
        newParentFolderId,
        userId
      );
      if (!destAccess.canWrite) {
        throw new Error("No write access to the destination folder");
      }

      // Prevent circular reference
      if (folderId === newParentFolderId) {
        throw new Error("Cannot move folder into itself");
      }

      // Check if new parent is a descendant of current folder
      const newParentPath = await FolderModel.getFolderPath(newParentFolderId);
      const isDescendant = newParentPath.some((f) => f.id === folderId);
      if (isDescendant) {
        throw new Error("Cannot move folder into its descendant");
      }
    }

    // Use a custom update method that accepts parentFolderId
    const updateData: any = {};
    if (newParentFolderId !== null) {
      updateData.parentFolderId = newParentFolderId;
    }
    const updatedFolder = await FolderModel.updateWithParent(
      folderId,
      updateData
    );

    if (!updatedFolder) {
      throw new Error("Failed to move folder");
    }

    logger.info(
      `Folder moved: ${folderId} to ${newParentFolderId || "root"} by user ${userId}`
    );

    return updatedFolder;
  }

  // Copy folder
  static async copyFolder(
    folderId: string,
    newParentFolderId: string | null,
    userId: string
  ): Promise<Folder> {
    const sourceFolder = await FolderModel.findById(folderId);
    if (!sourceFolder) {
      throw new Error("Source folder not found");
    }

    // Check access to source folder
    const sourceAccess = await FolderModel.checkAccess(folderId, userId);
    if (!sourceAccess.canRead) {
      throw new Error("No read access to the source folder");
    }

    // Check access to destination folder if specified
    if (newParentFolderId) {
      const destAccess = await FolderModel.checkAccess(
        newParentFolderId,
        userId
      );
      if (!destAccess.canWrite) {
        throw new Error("No write access to the destination folder");
      }
    }

    // Create new folder
    const createData: any = {
      name: `${sourceFolder.name} (Copy)`,
      ownerId: userId,
      isPublic: sourceFolder.isPublic,
    };

    if (sourceFolder.description) {
      createData.description = sourceFolder.description;
    }

    if (newParentFolderId) {
      createData.parentFolderId = newParentFolderId;
    }

    const newFolder = await FolderModel.create(createData);

    // Copy files (this would need to be implemented in FileService)
    // await FileService.copyFilesFromFolder(folderId, newFolder.id, userId);

    logger.info(
      `Folder copied: ${folderId} to ${newFolder.id} by user ${userId}`
    );

    return newFolder;
  }
}
