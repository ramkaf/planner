import {
  Body,
  Controller,
  Param,
  Patch,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './../providers/users.service';
import { CompleteUserInformationDto } from './../dtos/complete-information-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { ICompleteUserInformation } from './../interfaces/user.information.interface';
import { UploadService } from 'src/upload/providers/upload.service';
import { ControllerPermission, RequiresPermission } from 'src/rbac/decorators/requires-permission.decorator';
import { PermissionGuard } from 'src/rbac/guards/permission.guard';

@Controller('users')
@UseGuards(PermissionGuard)  // Apply global permission guard
@ControllerPermission('users')  // Controller-level permission for all routes in this controller
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly uploadService: UploadService,
  ) {}

  @Patch('toggle-favorite/:eventId')
  @RequiresPermission('users:favorite')  // Permission required for toggling favorites
  async toggleFavorite(
    @Req() req,
    @Param('eventId') eventId: number,
  ): Promise<boolean> {
    const userId = req.user.id;
    return await this.userService.toggleFavorite(userId, eventId);
  }

  @Patch('/complete-information')
  @RequiresPermission('users:complete-information')  // Permission required for completing user information
  @UseInterceptors(FileInterceptor('image'))  // File upload interceptor for profile image
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() completeUserInformationDto: CompleteUserInformationDto,
    @Request() req: ExpressRequest,
  ) {
    const { id: user_id } = req.user;
    let profilePictureUrl = null;
    if (image) {
      profilePictureUrl = await this.uploadService.saveFile(image);
    }
    let dateOfBirth = completeUserInformationDto.dateOfBirth
      ? new Date(completeUserInformationDto.dateOfBirth)
      : null;
    const userInformationSchema: ICompleteUserInformation = {
      ...completeUserInformationDto,
      dateOfBirth,
      profilePictureUrl,
    };

    return this.userService.completeInformation(user_id, userInformationSchema);
  }
}
