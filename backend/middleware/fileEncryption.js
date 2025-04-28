const crypto = require("crypto");
const fs = require("fs");

const encryptFile = (filePath) => {
  const algorithm = "aes-256-cbc";
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(`${filePath}.enc`);
  input.pipe(cipher).pipe(output);
  return { key, iv };
};

const decryptFile = (filePath, key, iv) => {
  const algorithm = "aes-256-cbc";
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(filePath.replace(".enc", ""));
  input.pipe(decipher).pipe(output);
};

module.exports = { encryptFile, decryptFile };
