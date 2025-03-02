import { logger } from '../utils/logger';
import { GoogleCloudStorageService } from './GoogleCloudStorageService';
import { FileValidationService, FileValidationOptions } from './fileValidationService';
import { SecurityService } from './securityService';
import * as fs from 'fs';
import * as path from 'path';


const fileValidationService = new FileValidationService();
const securityService = new SecurityService();
const storageService = new GoogleCloudStorageService();

export interface FileUploadResult {
    success: boolean;
    message: string;
    fileUrl?: string;
    metadata?: {
        encryptionKey?: string;
        hash: string;
        size: number;
        mimeType: string;
        encryptedSize: number;
    };
}

export interface FileUploadOptions extends FileValidationOptions {
    encrypt?: boolean;
    generateSignedUrl?: boolean;
    urlExpirationTime?: number;
}

export interface FileDownloadResult {
    success: boolean;
    message: string;
    filePath: string;
    metadata?: {
        size: number;
        mimeType: string;
        hash: string;
    };
}

const DEFAULT_UPLOAD_OPTIONS: FileUploadOptions = {
    maxSizeInMB: 100,
    encrypt: true,
    generateSignedUrl: true,
    urlExpirationTime: 3600,
    scanForMalware: true
};

export async function uploadFileService(
    filePath: string, 
    destFileName: string,
    options: FileUploadOptions = DEFAULT_UPLOAD_OPTIONS
): Promise<FileUploadResult> {
    if (!filePath || !destFileName) {
        throw new Error('File path and destination file name are required');
    }

    try {
        const validationResult = await fileValidationService.validateFile(filePath);
        
        if (!validationResult.isValid) {
            throw new Error(`File validation failed: ${validationResult.errors.join(', ')}`);
        }

        const fileBuffer = fs.readFileSync(filePath);
        let finalBuffer = fileBuffer;
        let encryptionKey: string | undefined;

        if (options.encrypt) {
            encryptionKey = securityService.generateEncryptionKey();
            const encryptionResult = await securityService.encryptBuffer(fileBuffer, encryptionKey);
            
            finalBuffer = Buffer.concat([
                encryptionResult.salt,
                encryptionResult.iv,
                encryptionResult.tag,
                encryptionResult.encryptedBuffer
            ]);
        }

        const fileExt = path.extname(destFileName);
        const uniqueFileName = `${path.basename(destFileName, fileExt)}_${Date.now()}${fileExt}`;

        const tempPath = path.join(process.cwd(), 'temp', uniqueFileName);
        fs.mkdirSync(path.dirname(tempPath), { recursive: true });
        fs.writeFileSync(tempPath, finalBuffer);

        await storageService.uploadFile(tempPath, uniqueFileName);

        fs.unlinkSync(tempPath);
        
        let fileUrl: string | undefined;
        if (options.generateSignedUrl) {
            fileUrl = await storageService.generateSignedUrl(
                uniqueFileName, 
                options.urlExpirationTime
            );
        }

        const metadata = {
            hash: validationResult.fileInfo.hash,
            size: validationResult.fileInfo.size,
            mimeType: validationResult.fileInfo.mimeType,
            encryptedSize: finalBuffer.length,
            encryptionKey: encryptionKey
        };

        const sanitizedMetadata = securityService.sanitizeMetadata(metadata);

        return {
            success: true,
            message: `File successfully uploaded as ${uniqueFileName}`,
            fileUrl,
            metadata: sanitizedMetadata
        };
    } catch (error) {
        logger.error(`Error in uploadFileService: ${(error as Error).message}`);
        throw new Error(`Failed to upload file: ${(error as Error).message}`);
    }
}

export async function downloadFileService(
    srcFileName: string,
    destFileName: string,
    encryptionKey?: string
): Promise<FileDownloadResult> {
    if (!srcFileName || !destFileName) {
        throw new Error('Source file name and destination file name are required');
    }

    try {
        const destDir = path.dirname(destFileName);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        const tempPath = path.join(process.cwd(), 'temp', `temp_${Date.now()}_${path.basename(srcFileName)}`);
        fs.mkdirSync(path.dirname(tempPath), { recursive: true });

        await storageService.downloadFile(srcFileName, tempPath);

        let fileBuffer = fs.readFileSync(tempPath);

        if (encryptionKey) {
            const salt = fileBuffer.slice(0, 16);
            const iv = fileBuffer.slice(16, 28);
            const tag = fileBuffer.slice(28, 44);
            const encryptedData = fileBuffer.slice(44);

            fileBuffer = await securityService.decryptBuffer(
                encryptedData,
                encryptionKey,
                iv,
                tag,
                salt
            );
        }

        fs.writeFileSync(destFileName, fileBuffer);

        fs.unlinkSync(tempPath);

        const validationResult = await fileValidationService.validateFile(destFileName);

        if (!validationResult.isValid) {
            throw new Error(`Downloaded file validation failed: ${validationResult.errors.join(', ')}`);
        }

        return {
            success: true,
            message: 'File successfully downloaded',
            filePath: destFileName,
            metadata: {
                size: validationResult.fileInfo.size,
                mimeType: validationResult.fileInfo.mimeType,
                hash: validationResult.fileInfo.hash
            }
        };
    } catch (error) {
        logger.error(`Error in downloadFileService: ${(error as Error).message}`);
        throw new Error(`Failed to download file: ${(error as Error).message}`);
    }
}

export async function deleteFileService(fileName: string): Promise<void> {
    if (!fileName) {
        throw new Error('File name is required');
    }

    try {
        await storageService.getFileMetadata(fileName);
        
        await storageService.deleteFile(fileName);
        logger.info(`File successfully deleted: ${fileName}`);
    } catch (error) {
        logger.error(`Error in deleteFileService: ${(error as Error).message}`);
        throw new Error(`Failed to delete file: ${(error as Error).message}`);
    }
}

export async function getFileMetadata(fileName: string): Promise<any> {
    if (!fileName) {
        throw new Error('File name is required');
    }

    try {
        const metadata = await storageService.getFileMetadata(fileName);
        return securityService.sanitizeMetadata(metadata);
    } catch (error) {
        logger.error(`Error getting file metadata: ${(error as Error).message}`);
        throw new Error(`Failed to get file metadata: ${(error as Error).message}`);
    }
}

export async function generateFileUrl(
    fileName: string,
    expirationTime: number = 3600
): Promise<string> {
    if (!fileName) {
        throw new Error('File name is required');
    }

    try {
        return await storageService.generateSignedUrl(fileName, expirationTime);
    } catch (error) {
        logger.error(`Error generating file URL: ${(error as Error).message}`);
        throw new Error(`Failed to generate file URL: ${(error as Error).message}`);
    }
}