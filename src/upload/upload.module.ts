import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { UploadOptions } from './config/upload.config';

@Module({})
export class UploadModule {
  static register(options: UploadOptions): DynamicModule {
    return {
      module: UploadModule,
      imports: [
        MulterModule.register({
          storage: diskStorage({
            destination: (req, file, cb) => {
              // Get groupName and title from request body or use defaults
              const groupName = req.body.groupName || 'default';
              const title = req.body.title || 'misc';

              // Create full path including groupName and title subdirectories
              const uploadPath = join(options.destination, groupName, title);

              if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath, { recursive: true });
              }

              cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
              const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              const extension = file.originalname.split('.').pop();
              cb(null, `${uniqueSuffix}.${extension}`);
            },
          }),
          fileFilter: (req, file, cb) => {
            if (!options.formats.includes(file.mimetype)) {
              return cb(new Error('Invalid file format'), false);
            }
            cb(null, true);
          },
          limits: {
            fileSize: options.maxSize,
          },
        }),
      ],
      providers: [
        {
          provide: 'UPLOAD_OPTIONS',
          useValue: options,
        },
        UploadService,
      ],
      controllers: [UploadController],
      exports: [UploadService],
    };
  }
}
