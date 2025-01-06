// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { CompleteSignupDto } from './dto/complete-signup.dto';
import { Request } from 'express';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const login = loginDto.email || loginDto.username || loginDto.phone;
    const { password } = loginDto;
    return this.authService.login({ login, password });
  }

  @Get('email-verification')
  async ComplateSignUp(@Req() req:Request) {
    const {id} = req.user
    return await this.authService.emailVerification(id)
  }

  @Post('email-verification')
  async VerifyEmail(@Body() verifyEmailDto:VerifyEmailDto ,  @Req() req:Request) {
    const {id} = req.user
    return await this.authService.verifyEmail(id , verifyEmailDto)
  }
  
}
