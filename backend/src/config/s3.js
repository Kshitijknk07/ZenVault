const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const generateS3Key = (userId, fileName, folderId = null) => {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  const folderPath = folderId ? `folders/${folderId}/` : "";
  return `users/${userId}/${folderPath}${timestamp}-${uniqueId}-${fileName}`;
};

const generateUploadUrl = async (key, contentType, expiresIn = 3600) => {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error("Error generating upload URL:", error);
    throw new Error("Failed to generate upload URL");
  }
};

const generateDownloadUrl = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error("Error generating download URL:", error);
    throw new Error("Failed to generate download URL");
  }
};

const deleteFile = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file from S3");
  }
};

const copyFile = async (sourceKey, destinationKey) => {
  try {
    const command = new CopyObjectCommand({
      Bucket: BUCKET_NAME,
      CopySource: `${BUCKET_NAME}/${sourceKey}`,
      Key: destinationKey,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error copying file in S3:", error);
    throw new Error("Failed to copy file in S3");
  }
};

const listObjects = async (prefix) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);
    return response.Contents || [];
  } catch (error) {
    console.error("Error listing objects in S3:", error);
    throw new Error("Failed to list objects in S3");
  }
};

const getFileMetadata = async (key) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);
    return {
      contentType: response.ContentType,
      contentLength: response.ContentLength,
      lastModified: response.LastModified,
      etag: response.ETag,
    };
  } catch (error) {
    console.error("Error getting file metadata from S3:", error);
    throw new Error("Failed to get file metadata from S3");
  }
};

const checkBucketExists = async () => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 1,
    });

    await s3Client.send(command);
    console.log("✅ S3 bucket connection successful");
    return true;
  } catch (error) {
    console.error("❌ S3 bucket connection failed:", error.message);
    return false;
  }
};

module.exports = {
  s3Client,
  BUCKET_NAME,
  generateS3Key,
  generateUploadUrl,
  generateDownloadUrl,
  deleteFile,
  copyFile,
  listObjects,
  getFileMetadata,
  checkBucketExists,
};
