import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: '../../google-cloud-cli-463.0.0-linux-x86_64.tar.gz',
});

const bucketName = 'knkbucket01';
const bucket = storage.bucket(bucketName);

export { bucket };
