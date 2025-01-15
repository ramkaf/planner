// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './../providers/auth.service';
import { SignUpDto } from './../dto/signup.dto';
import { LoginDto } from './../dto/login.dto';
import { Public } from './../decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JwtToolService } from '../providers/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService:JwtToolService
  ) {}

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
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects to Google
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = req.user;
    const accessToken = this.jwtService.getJwtToken(user);
    return { user, accessToken };
  }
}