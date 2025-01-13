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

@Controller('users/verification')
@UseGuards(PermissionGuard)
@ControllerPermission('users')
export class VerificationController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @RequiresPermission('users:create')
  @Get('email-verification')
  async ComplateSignUp(@Req() req:ExpressRequest) {
    const {id} = req.user
    return await this.userService.emailVerification(id)
  }

  @Post('email-verification')
  async VerifyEmail(@Body() verifyEmailDto:VerifyEmailDto ,  @Req() req:ExpressRequest) {
    const {id} = req.user
    return await this.userService.verifyEmail(id , verifyEmailDto)
  }

}
