import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = 'zenvault-bucket';

// Upload file
export const uploadFile = async (filePath: string, destFileName: string) => {
  try {
    await storage.bucket(bucketName).upload(filePath, {
      destination: destFileName,
    });
    console.log(`${filePath} uploaded to ${bucketName}`);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

// Download file
export const downloadFile = async (srcFileName: string, destFileName: string) => {
  try {
    await storage.bucket(bucketName).file(srcFileName).download({
      destination: destFileName,
    });
    console.log(`${srcFileName} downloaded to ${destFileName}`);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

// Delete file
export const deleteFile = async (fileName: string) => {
  try {
    await storage.bucket(bucketName).file(fileName).delete();
    console.log(`File ${fileName} deleted from ${bucketName}`);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
