import { Injectable, Inject } from '@nestjs/common';
import { join } from 'path';
import { UploadOptions } from './config/upload.config';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor(@Inject('UPLOAD_OPTIONS') private options: UploadOptions) {}

  async saveFile(file: Express.Multer.File): Promise<string> {
    // Create directory path
    const dirPath = join(this.options.destination);

    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    const filename = `${uniqueSuffix}.${extension}`;

    // Move file to destination
    const filePath = join(dirPath, filename);
    fs.writeFileSync(filePath, file.buffer);

    // Return the relative URL
    return this.getFileUrl(filename);
  }

  getFileUrl(filename: string): string {
    return `${this.options.destination}/${filename}`;
  }
}
