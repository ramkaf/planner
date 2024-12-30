import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Auth } from './auth/decorators/auth.decorator';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RoleGuard } from './auth/guards/roles.guard';

@Controller()
export class AppController {
  @Get()

  getHello(): string {
    return "ram"
  }
}
