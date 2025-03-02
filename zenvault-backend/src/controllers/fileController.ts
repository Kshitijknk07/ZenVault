import { Request, Response } from 'express';
import * as fileService from '../services/storageService';

export const uploadFileController = async (req: Request, res: Response) => {
  try {
    const { filePath, destFileName } = req.body;
    await fileService.uploadFileService(filePath, destFileName);
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
};

export const downloadFileController = async (req: Request, res: Response) => {
  try {
    const { srcFileName, destFileName } = req.body;
    await fileService.downloadFileService(srcFileName, destFileName);
    res.status(200).json({ message: 'File downloaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error downloading file' });
  }
};

export const deleteFileController = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.body;
    await fileService.deleteFileService(fileName);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file' });
  }
};
