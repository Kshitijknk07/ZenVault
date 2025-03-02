import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/logger';
import { fileTypeFromFile } from 'file-type';
import * as crypto from 'crypto';

export interface FileValidationOptions {
    maxSizeInMB?: number;
    allowedMimeTypes?: string[];
    allowedExtensions?: string[];
    scanForMalware?: boolean;
}

export interface FileValidationResult {
    isValid: boolean;
    errors: string[];
    fileInfo: {
        size: number;
        mimeType: string;
        extension: string;
        hash: string;
    };
}

const DEFAULT_OPTIONS: FileValidationOptions = {
    maxSizeInMB: 100,
    allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/zip',
        'application/x-zip-compressed'
    ],
    allowedExtensions: [
        '.jpg', '.jpeg', '.png', '.gif', '.pdf', 
        '.doc', '.docx', '.txt', '.zip'
    ],
    scanForMalware: true
};

export class FileValidationService {
    private options: FileValidationOptions;

    constructor(options: FileValidationOptions = DEFAULT_OPTIONS) {
        this.options = { ...DEFAULT_OPTIONS, ...options };
    }

    async validateFile(filePath: string): Promise<FileValidationResult> {
        const errors: string[] = [];
        const result: FileValidationResult = {
            isValid: false,
            errors: [],
            fileInfo: {
                size: 0,
                mimeType: '',
                extension: '',
                hash: ''
            }
        };

        try {
            if (!fs.existsSync(filePath)) {
                errors.push('File does not exist');
                result.errors = errors;
                return result;
            }

            const stats = fs.statSync(filePath);
            result.fileInfo.size = stats.size;

            const fileSizeInMB = stats.size / (1024 * 1024);
            if (fileSizeInMB > (this.options.maxSizeInMB || DEFAULT_OPTIONS.maxSizeInMB!)) {
                errors.push(`File size exceeds maximum limit of ${this.options.maxSizeInMB}MB`);
            }

            const fileType = await fileTypeFromFile(filePath);
            result.fileInfo.mimeType = fileType?.mime || 'application/octet-stream';
            
            if (this.options.allowedMimeTypes?.length && 
                !this.options.allowedMimeTypes.includes(result.fileInfo.mimeType)) {
                errors.push('File type not allowed');
            }

            const extension = path.extname(filePath).toLowerCase();
            result.fileInfo.extension = extension;
            if (this.options.allowedExtensions?.length && 
                !this.options.allowedExtensions.includes(extension)) {
                errors.push('File extension not allowed');
            }

            result.fileInfo.hash = await this.generateFileHash(filePath);

            if (this.options.scanForMalware) {
                const isSafe = await this.performBasicMalwareScan(filePath);
                if (!isSafe) {
                    errors.push('File failed security scan');
                }
            }

            if (stats.size === 0) {
                errors.push('File is empty');
            }

            const fileName = path.basename(filePath);
            if (!this.isValidFileName(fileName)) {
                errors.push('Invalid file name');
            }

            result.isValid = errors.length === 0;
            result.errors = errors;

            return result;
        } catch (error) {
            logger.error(`Error during file validation: ${(error as Error).message}`);
            errors.push(`Validation error: ${(error as Error).message}`);
            result.errors = errors;
            return result;
        }
    }

    private async generateFileHash(filePath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256');
            const stream = fs.createReadStream(filePath);

            stream.on('error', err => reject(err));
            stream.on('data', chunk => hash.update(chunk));
            stream.on('end', () => resolve(hash.digest('hex')));
        });
    }

    private async performBasicMalwareScan(filePath: string): Promise<boolean> {
        try {
            const fileBuffer = fs.readFileSync(filePath);
            
            const maliciousPatterns = [
                Buffer.from('4D5A', 'hex'),
                Buffer.from('FFD8FF', 'hex'), 
                Buffer.from('CAFEBABE', 'hex'), 
                Buffer.from('504B0304', 'hex') 
            ];

            for (const pattern of maliciousPatterns) {
                if (fileBuffer.includes(pattern)) {
                    logger.warn(`Suspicious pattern found in file: ${filePath}`);
                    return false;
                }
            }

            const extension = path.extname(filePath).toLowerCase();
            if (!extension.match(/\.(exe|dll|bat|cmd|sh|ps1)$/i)) {
                const hasExecutableContent = fileBuffer.includes(Buffer.from('MZ'));
                if (hasExecutableContent) {
                    logger.warn(`Executable content found in non-executable file: ${filePath}`);
                    return false;
                }
            }

            return true;
        } catch (error) {
            logger.error(`Error during malware scan: ${(error as Error).message}`);
            return false;
        }
    }

    private isValidFileName(fileName: string): boolean {
        const validNamePattern = /^[a-zA-Z0-9._-]+$/;
        const maxLength = 255;

        if (fileName.length > maxLength) {
            return false;
        }

        if (!validNamePattern.test(fileName)) {
            return false;
        }

        const suspiciousPatterns = [
            /\.\./, 
            /^\./,
            /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i, 
            /\.(exe|dll|bat|cmd|sh|ps1)$/i 
        ];

        return !suspiciousPatterns.some(pattern => pattern.test(fileName));
    }
}