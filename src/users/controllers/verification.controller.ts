import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './../providers/users.service';
import { Request as ExpressRequest } from 'express';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { ControllerPermission, RequiresPermission } from 'src/rbac/decorators/requires-permission.decorator';
import { PermissionGuard } from 'src/rbac/guards/permission.guard';
import { RequestWithUser } from '../interfaces/user.interface';

@Controller('users/verification')
@UseGuards(PermissionGuard)  // Apply global permission guard to ensure the user has the necessary permissions
@ControllerPermission('verification')  // Controller-level permission for all routes in this controller
export class VerificationController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @RequiresPermission('verification:send-email-verification')  // Permission required for email verification completion
  @Get('email-verification')
  async completeSignUp(@Req() req: RequestWithUser) {
    const { id } = req.user;
    return await this.userService.emailVerification(id);
  }

  @Post('email-verification')
  @RequiresPermission('verification:verify-email')  // Permission required for email verification
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto, @Req() req: RequestWithUser) {
    const { id } = req.user;
    return await this.userService.verifyEmail(id, verifyEmailDto);
  }
}
