const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ZENVAULT_UPLOADER_ACCESS_KEY_ID,
    secretAccessKey: process.env.ZENVAULT_UPLOADER_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.ZENVAULT_BUCKET_NAME;

async function generateUploadUrl(key, expiresIn = 60 * 5) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  return await getSignedUrl(s3, command, { expiresIn });
}

async function generateDownloadUrl(key, expiresIn = 60 * 5) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  return await getSignedUrl(s3, command, { expiresIn });
}

module.exports = {
  generateUploadUrl,
  generateDownloadUrl,
};
