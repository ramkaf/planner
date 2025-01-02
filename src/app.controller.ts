import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'ram';
  }
}
