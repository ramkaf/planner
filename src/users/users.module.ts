import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EventsModule,
    UploadModule.register({
      formats: ['image/jpeg', 'image/png', 'image/webp'],
      maxSize: 5 * 1024 * 1024,
      destination: 'public/uploads/users',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
