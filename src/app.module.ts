import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';  // Import DataSource
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
import { AuthModule } from './auth/auth.module';
import { Review } from './review/entities/review.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig], // Load the configuration from the database.config.ts
      isGlobal: true, // Make the configuration accessible globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // Import ConfigModule so ConfigService is available
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // Use PostgreSQL
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [User , Tag , Category , Author , Event,Review , Ticket], // Define your entities here
        synchronize: true, // Don't use this in production, use migrations instead
      }),
      inject: [ConfigService], // Inject ConfigService to access the environment variables
    }),
    EventsModule,
    CategoryModule,
    TagModule,
    AuthorModule,
    TicketModule,
    ReviewModule,
    AuthModule
  ],
  providers: [CustomLoggerService], // Register the CustomLoggerService instead
})
export class AppModule {}