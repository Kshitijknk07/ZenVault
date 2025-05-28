const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
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

async function copyS3Object(sourceKey, destKey) {
  await s3.send(
    new CopyObjectCommand({
      Bucket: BUCKET,
      CopySource: `${BUCKET}/${sourceKey}`,
      Key: destKey,
    })
  );
}

async function deleteS3Object(key) {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

async function listS3Objects(prefix) {
  const res = await s3.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: prefix,
    })
  );
  return res.Contents || [];
}

module.exports = {
  generateUploadUrl,
  generateDownloadUrl,
  copyS3Object,
  deleteS3Object,
  listS3Objects,
};
