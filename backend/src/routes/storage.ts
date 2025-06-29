import { Router } from "express";
import { StorageController } from "../controllers/StorageController";
import { authenticate } from "../middleware/auth";

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Storage Quota Management
router.get("/quota", StorageController.getUserQuota);
router.put("/quota", StorageController.updateUserQuota);
router.get("/usage", StorageController.getUsageStats);

// File Type Support
router.get("/file-types", StorageController.getSupportedFileTypes);

// File Metadata Management
router.post("/files/:fileId/metadata", StorageController.addFileMetadata);
router.get("/files/:fileId/metadata", StorageController.getFileMetadata);
router.put(
  "/files/:fileId/metadata/:key",
  StorageController.updateFileMetadata
);
router.delete(
  "/files/:fileId/metadata/:key",
  StorageController.deleteFileMetadata
);

// Hierarchical Folder Structure
router.get("/folders/tree", StorageController.getFolderTree);
router.get("/folders/hierarchy", StorageController.getFolderHierarchy);
router.get(
  "/folders/:folderId/breadcrumb",
  StorageController.getFolderBreadcrumb
);
router.get("/folders/:folderId/stats", StorageController.getFolderWithStats);

// Bulk File Operations
router.post("/files/bulk", StorageController.bulkFileOperation);

// Storage Analytics
router.get("/analytics", StorageController.getStorageAnalytics);

export default router;
