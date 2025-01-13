import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config'; // Import the database config
import { CustomLoggerService } from './utils/logger.service'; // Import the custom logger
import { Event } from './events/entities/event.entity';
import { EventsModule } from './events/events.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/entities/tag.entity';
import { Category } from './category/entities/category.entity';
import { AuthorModule } from './author/author.module';
import { Author } from './author/entities/author.entity';
import { TicketModule } from './ticket/ticket.module';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AddressModule } from './address/address.module';
import { Address } from './address/entities/address.entity';
import { UploadModule } from './upload/upload.module';
import { MailerModule } from './mailer/mailer.module';
import { join } from 'path';
import { Mailer } from './mailer/entities/mailer.entity';
import { PasswordReset } from './users/entities/password-reset.entity';
import { EmailVerification } from './users/entities/email-verification.entity';
import { Role } from './rbac/entities/role.entity';
import { Permission } from './rbac/entities/permission.entity';
import { RbacModule } from './rbac/rbac.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig], // Load the configuration from the database.config.ts
      isGlobal: true, // Make the configuration accessible globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule so ConfigService is available
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // Use PostgreSQL
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [ Role , Permission , User, Tag, Category, Author, Event, Review, Ticket, Address , Mailer , PasswordReset , EmailVerification], // Define your entities here
        synchronize: true, // Don't use this in production, use migrations instead
      }),
      inject: [ConfigService], // Inject ConfigService to access the environment variables
    }),
    RbacModule,
    AuthModule,
    MailerModule,
    EventsModule,
    CategoryModule,
    TagModule,
    AuthorModule,
    TicketModule,
    ReviewModule,
    AddressModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [CustomLoggerService], // Register the CustomLoggerService instead
})


export class AppModule {}