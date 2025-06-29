import { Router } from "express";
import { FileController } from "../controllers/FileController";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validation";
import { FileService } from "../services/FileService";
import multer from "multer";
import * as Joi from "joi";

const router = Router();

// Initialize upload directory
FileService.initializeUploadDirectory();

// Configure multer for file uploads
const upload = multer({
  storage: FileService.getMulterConfig(),
  limits: {
    fileSize: parseInt(process.env["MAX_FILE_SIZE"] || "100000000"), // 100MB
    files: 1,
  },
  fileFilter: (_req: any, _file: any, cb: any) => {
    // Add file type validation if needed
    cb(null, true);
  },
});

// Apply authentication middleware to all routes
router.use(authenticate);

// File upload routes
router.post("/upload", upload.single("file"), FileController.uploadFile);

// File download routes
router.get("/:fileId/download", FileController.downloadFile);

// File CRUD routes
router.get("/:fileId", FileController.getFileInfo);
router.put("/:fileId", FileController.updateFile);
router.delete("/:fileId", FileController.deleteFile);

// File search and listing
router.get("/", FileController.searchFiles);

// File statistics
router.get("/stats/overview", FileController.getFileStats);

// File versioning
router.get("/:fileId/versions", FileController.getFileVersions);
router.post(
  "/:fileId/versions",
  upload.single("file"),
  FileController.createNewVersion
);

// Folder routes
router.post("/folders", FileController.createFolder);
router.get("/folders/:folderId", FileController.getFolder);
router.put("/folders/:folderId", FileController.updateFolder);
router.delete("/folders/:folderId", FileController.deleteFolder);
router.get("/folders", FileController.searchFolders);

// Validation schemas
const createFolderSchema = Joi.object({
  name: Joi.string().required().min(1).max(255),
  description: Joi.string().optional().max(1000),
  parentFolderId: Joi.string().uuid().optional(),
  isPublic: Joi.boolean().optional(),
});

const updateFileSchema = Joi.object({
  name: Joi.string().optional().min(1).max(255),
  description: Joi.string().optional().max(1000),
  isPublic: Joi.boolean().optional(),
  tags: Joi.string().optional(),
});

const updateFolderSchema = Joi.object({
  name: Joi.string().optional().min(1).max(255),
  description: Joi.string().optional().max(1000),
  isPublic: Joi.boolean().optional(),
});

// Apply validation middleware
router.post(
  "/folders",
  validate(createFolderSchema),
  FileController.createFolder
);
router.put("/:fileId", validate(updateFileSchema), FileController.updateFile);
router.put(
  "/folders/:folderId",
  validate(updateFolderSchema),
  FileController.updateFolder
);

export default router;
