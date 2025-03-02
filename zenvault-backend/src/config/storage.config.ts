import { Storage } from '@google-cloud/storage';
import path from 'path';
import { logger } from '../utils/logger';


const storage = new Storage({
    keyFilename: path.join(process.cwd(), 'google_key.json'),
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME || 'zenvault-bucket';


export const initializeStorage = async () => {
    try {
        const [buckets] = await storage.getBuckets();
        const bucketExists = buckets.some(bucket => bucket.name === bucketName);

        if (!bucketExists) {
            await storage.createBucket(bucketName);
            logger.info(`Bucket ${bucketName} created.`);
        }

        logger.info('Google Cloud Storage initialized successfully');
        return { storage, bucketName };
    } catch (error) {
        logger.error(`Failed to initialize Google Cloud Storage: ${(error as Error).message}`);
        throw error;
    }
};

export { storage, bucketName };