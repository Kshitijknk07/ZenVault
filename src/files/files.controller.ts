/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { bucket } from '../utils/gcs';
import { Express } from 'express';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      return new Promise((resolve, reject) => {
        blobStream.on('error', (err: unknown) => {
          const errorMessage =
            err instanceof Error ? err.message : 'Unknown error occurred';
          console.error('Upload Error:', errorMessage);
          reject(new BadRequestException(`Upload failed: ${errorMessage}`));
        });

        blobStream.on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;
          console.log('File uploaded successfully:', publicUrl);
          resolve({ message: 'File uploaded successfully', url: publicUrl });
        });

        blobStream.end(file.buffer);
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      throw new BadRequestException(`File upload failed: ${errorMessage}`);
    }
  }
}
