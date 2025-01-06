import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { UploadModule } from 'src/upload/upload.module';
import { VerificationService } from './providers/verification.service';
import { EmailVerification } from './entities/email-verification.entity';
import { MailerModule } from 'src/mailer/mailer.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User , EmailVerification]),
    EventsModule,
    MailerModule,
    UploadModule.register({
      formats: ['image/jpeg', 'image/png', 'image/webp'],
      maxSize: 5 * 1024 * 1024,
      destination: 'public/uploads/users',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService , VerificationService],
  exports: [UsersService , VerificationService],
})
export class UsersModule {}
