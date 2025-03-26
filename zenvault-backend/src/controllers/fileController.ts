import { Request, Response } from 'express';
import * as fileService from '../services/storageService';
import { logger } from '../utils/logger';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
const storage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const requireAuth = ClerkExpressRequireAuth();

export const uploadFileController = async (req: Request, res: Response) => {
  try {
    upload.single('file')(req, res, async (err: any) => {
      if (err) {
        logger.error(`Multer error: ${err.message}`);
        return res.status(400).json({ error: 'File upload error' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      try {
        const filePath = req.file.path;
        const destFileName = req.file.originalname;
        const result = await fileService.uploadFileService(
          filePath,
          destFileName
        );

        fs.unlinkSync(filePath);

        res.status(200).json({
          message: 'File uploaded successfully',
          fileUrl: result.fileUrl,
          metadata: result.metadata,
        });
      } catch (error) {
        logger.error(
          `Error in uploadFileController: ${(error as Error).message}`
        );
        res.status(500).json({ error: 'Error uploading file' });
      }
    });
  } catch (error) {
    logger.error(`Error in uploadFileController: ${(error as Error).message}`);
    res.status(500).json({ error: 'Error uploading file' });
  }
};

export const downloadFileController = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.fileId;

    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }

    const signedUrl = await fileService.generateFileUrl(fileId);

    res.status(200).json({
      url: signedUrl,
      message: 'Download URL generated successfully',
    });
  } catch (error) {
    logger.error(
      `Error in downloadFileController: ${(error as Error).message}`
    );
    res.status(500).json({ error: 'Error generating download URL' });
  }
};

export const deleteFileController = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.fileId;

    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }

    await fileService.deleteFileService(fileId);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    logger.error(`Error in deleteFileController: ${(error as Error).message}`);
    res.status(500).json({ error: 'Error deleting file' });
  }
};

export const listFilesController = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    res.status(200).json({
      files: [],
      message: 'File listing functionality not yet implemented',
    });
  } catch (error) {
    logger.error(`Error in listFilesController: ${(error as Error).message}`);
    res.status(500).json({ error: 'Error listing files' });
  }
};
