import {
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './../providers/users.service';
import { Request as ExpressRequest } from 'express';
import { VerifyEmailDto } from '../dtos/verify-email.dto';

@Controller('users/verification')
export class VerificationController {
  constructor(
    private readonly userService: UsersService
  ) {}

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
