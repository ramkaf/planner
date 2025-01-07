// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Req, Patch, Query, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../decorators/public.decorator';
import { PasswordService } from '../providers/password.service';
import { ResetPassowrdDto, ResetPasswordCredentialDto, ResetPasswordUrl } from '../dto/reset-password.dto';

@Controller('auth/password-reset')
export class PasswordController {
  constructor(
    private readonly passwordService: PasswordService
) {}

  @Public()
  @Post()
  async sendResetPasswordEmail(@Body() ResetPasswordCredentialDto: ResetPasswordCredentialDto) {
   try {
    const identifier  = ResetPasswordCredentialDto.email || ResetPasswordCredentialDto.username || ResetPasswordCredentialDto.phone
    const result = await this.passwordService.sendResetPasswordEmail(identifier);
    if (result)
     return true
   } catch (error) {
    return new InternalServerErrorException()
   }
  }

  @Public()
  @Get()
  async resetPassowrdPage(@Query() resetPasswordUrl:ResetPasswordUrl ) {
    const result = await this.passwordService.resetPasswordPage(resetPasswordUrl.token);
    return result
  }


  @Public()
  @Patch()
  async ResetPassword(@Query() resetPasswordUrl:ResetPasswordUrl , @Body() resetPassowrdDto: ResetPassowrdDto) {
    const result = await this.passwordService.resetPassword(resetPasswordUrl.token , resetPassowrdDto);
    if (result)
      return true
  }

}
