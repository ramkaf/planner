import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './providers/users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { UploadModule } from '../upload/upload.module';
import { VerificationService } from './providers/verification.service';
import { EmailVerification } from './entities/email-verification.entity';
import { MailerModule } from '../mailer/mailer.module';
import { VerificationController } from './controllers/verification.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, EmailVerification]),
    EventsModule,
    MailerModule,
    UploadModule.register({
      formats: ['image/jpeg', 'image/png', 'image/webp'],
      maxSize: 5 * 1024 * 1024,
      destination: 'public/uploads/users',
    }),
  ],
  controllers: [UsersController, VerificationController],
  providers: [UsersService, VerificationService],
  exports: [UsersService, VerificationService],
})
export class UsersModule {}
