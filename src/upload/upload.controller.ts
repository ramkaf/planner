import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

class UploadDto {
  groupName: string;
  title: string;
}

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      path: file.path,
      url: this.uploadService.getFileUrl(file.filename),
    };
  }
}
