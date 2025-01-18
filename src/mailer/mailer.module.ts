import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './providers/mailer.service';
import { Mailer } from './entities/mailer.entity';
import { ConfigurationService } from '../config/configuration.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mailer])],
  controllers: [],
  providers: [EmailService, ConfigurationService],
  exports: [EmailService],
})
export class MailerModule {}
