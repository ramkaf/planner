// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

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

  // @Get()
  // getProfile(@Request() req: ExpressRequest) {
  //   console.log(req.user);
  //   return { user: req.user };
  // }
}
