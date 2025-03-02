import * as crypto from 'crypto';
import { logger } from '../utils/logger';

export class SecurityService {
    private readonly algorithm = 'aes-256-gcm';
    private readonly keyLength = 32; 
    private readonly ivLength = 12;
    private readonly saltLength = 16; 
    private readonly tagLength = 16; 

    async encryptBuffer(buffer: Buffer, key: string): Promise<{
        encryptedBuffer: Buffer;
        iv: Buffer;
        tag: Buffer;
        salt: Buffer;
    }> {
        try {
            const salt = crypto.randomBytes(this.saltLength);
            const derivedKey = await this.deriveKey(key, salt);
            const iv = crypto.randomBytes(this.ivLength);
            const cipher = crypto.createCipheriv(this.algorithm, derivedKey, iv);
            const encryptedBuffer = Buffer.concat([cipher.update(buffer), cipher.final()]);
            const tag = cipher.getAuthTag();

            return { encryptedBuffer, iv, tag, salt };
        } catch (error) {
            logger.error(`Encryption error: ${(error as Error).message}`);
            throw new Error('File encryption failed');
        }
    }

    async decryptBuffer(
        encryptedBuffer: Buffer,
        key: string,
        iv: Buffer,
        tag: Buffer,
        salt: Buffer
    ): Promise<Buffer> {
        try {
            const derivedKey = await this.deriveKey(key, salt);
            const decipher = crypto.createDecipheriv(this.algorithm, derivedKey, iv);
            decipher.setAuthTag(tag);
            const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

            return decryptedBuffer;
        } catch (error) {
            logger.error(`Decryption error: ${(error as Error).message}`);
            throw new Error('File decryption failed');
        }
    }

    private async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, this.keyLength, 'sha512', (err, derivedKey) => {
                if (err) reject(err);
                else resolve(derivedKey);
            });
        });
    }

    generateEncryptionKey(): string {
        return crypto.randomBytes(this.keyLength).toString('hex');
    }

    async validateFileIntegrity(buffer: Buffer, expectedHash: string): Promise<boolean> {
        const hash = crypto.createHash('sha256');
        hash.update(buffer);
        return hash.digest('hex') === expectedHash;
    }

    sanitizeMetadata<T extends Record<string, any>>(metadata: T): T {
        const sanitized: Record<string, any> = {};

        for (const [key, value] of Object.entries(metadata)) {
            const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '');

            if (typeof value === 'string') {
                sanitized[sanitizedKey] = value
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/[<>]/g, '');
            } else if (typeof value === 'number' || typeof value === 'boolean') {
                sanitized[sanitizedKey] = value;
            } else if (value instanceof Date) {
                sanitized[sanitizedKey] = value.toISOString();
            } else {
                sanitized[sanitizedKey] = String(value)
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/[<>]/g, '');
            }
        }

        for (const key in metadata) {
            if (!(key in sanitized)) {
                sanitized[key] = metadata[key];
            }
        }

        return sanitized as T;
    }
}
