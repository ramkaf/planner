import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './providers/mailer.service';
import { Mailer } from './entities/mailer.entity';
import { MailerController } from './mailer.controller';
import { ConfigurationService } from 'src/config/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mailer]),
  ],
  controllers : [MailerController],
  providers: [EmailService , ConfigurationService],
  exports: [EmailService],
})
export class MailerModule {}