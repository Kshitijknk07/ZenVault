import { Storage } from '@google-cloud/storage';
import { logger } from '../utils/logger'; 

const storage = new Storage();
const bucketName = 'zenvault-bucket';


const handleResponse = (action: string, success: boolean, error?: string) => {
  if (success) {
    logger.info(`${action} completed successfully.`);
  } else {
    logger.error(`Error during ${action}: ${error}`);
  }
};


export const uploadFile = async (filePath: string, destFileName: string) => {
  try {
    logger.info(`Starting upload for file: ${filePath} to bucket: ${bucketName}`);
    await storage.bucket(bucketName).upload(filePath, {
      destination: destFileName,
    });
    handleResponse('File upload', true);
  } catch (error) {
    handleResponse('File upload', false, (error as any).message);
  }
};


export const downloadFile = async (
  srcFileName: string,
  destFileName: string
) => {
  try {
    logger.info(`Starting download for file: ${srcFileName} from bucket: ${bucketName}`);
    await storage.bucket(bucketName).file(srcFileName).download({
      destination: destFileName,
    });
    handleResponse('File download', true);
  } catch (error) {
    handleResponse('File download', false, (error as any).message);
  }
};

export const deleteFile = async (fileName: string) => {
  try {
    logger.info(`Starting deletion for file: ${fileName} from bucket: ${bucketName}`);
    await storage.bucket(bucketName).file(fileName).delete();
    handleResponse('File deletion', true);
  } catch (error) {
    handleResponse('File deletion', false, (error as any).message);
  }
};
export function uploadFileService(filePath: any, destFileName: any) {
    throw new Error('Function not implemented.');
}

export function downloadFileService(srcFileName: any, destFileName: any) {
    throw new Error('Function not implemented.');
}

export function deleteFileService(fileName: any) {
    throw new Error('Function not implemented.');
}

