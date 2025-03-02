import { Storage } from '@google-cloud/storage';
import { logger } from '../utils/logger';
import { storage, bucketName } from '../config/storage.config';

export class GoogleCloudStorageService {
    private storage: Storage;
    private bucketName: string;

    constructor() {
        this.storage = storage;
        this.bucketName = bucketName;
    }

    private async getBucket() {
        const bucket = this.storage.bucket(this.bucketName);
        const [exists] = await bucket.exists();
        
        if (!exists) {
            throw new Error(`Bucket ${this.bucketName} does not exist`);
        }
        
        return bucket;
    }

    async uploadFile(filePath: string, destFileName: string): Promise<void> {
        try {
            const bucket = await this.getBucket();
            await bucket.upload(filePath, {
                destination: destFileName,
                // Set metadata to help with file management
                metadata: {
                    cacheControl: 'no-cache',
                    metadata: {
                        uploadTime: new Date().toISOString()
                    }
                }
            });
            logger.info(`File ${destFileName} uploaded successfully to ${this.bucketName}`);
        } catch (error) {
            logger.error(`Error uploading file ${destFileName}: ${(error as Error).message}`);
            throw error;
        }
    }

    async downloadFile(srcFileName: string, destFileName: string): Promise<void> {
        try {
            const bucket = await this.getBucket();
            const file = bucket.file(srcFileName);
            const [exists] = await file.exists();

            if (!exists) {
                throw new Error(`File ${srcFileName} does not exist in bucket`);
            }

            await file.download({
                destination: destFileName
            });
            logger.info(`File ${srcFileName} downloaded successfully to ${destFileName}`);
        } catch (error) {
            logger.error(`Error downloading file ${srcFileName}: ${(error as Error).message}`);
            throw error;
        }
    }

    async deleteFile(fileName: string): Promise<void> {
        try {
            const bucket = await this.getBucket();
            const file = bucket.file(fileName);
            const [exists] = await file.exists();

            if (!exists) {
                throw new Error(`File ${fileName} does not exist in bucket`);
            }

            await file.delete();
            logger.info(`File ${fileName} deleted successfully from ${this.bucketName}`);
        } catch (error) {
            logger.error(`Error deleting file ${fileName}: ${(error as Error).message}`);
            throw error;
        }
    }

    async getFileMetadata(fileName: string): Promise<any> {
        try {
            const bucket = await this.getBucket();
            const file = bucket.file(fileName);
            const [metadata] = await file.getMetadata();
            return metadata;
        } catch (error) {
            logger.error(`Error getting metadata for file ${fileName}: ${(error as Error).message}`);
            throw error;
        }
    }

    async generateSignedUrl(fileName: string, expiresIn: number = 3600): Promise<string> {
        try {
            const bucket = await this.getBucket();
            const file = bucket.file(fileName);
            const [url] = await file.getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + expiresIn * 1000
            });
            return url;
        } catch (error) {
            logger.error(`Error generating signed URL for ${fileName}: ${(error as Error).message}`);
            throw error;
        }
    }
}