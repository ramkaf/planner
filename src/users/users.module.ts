import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
