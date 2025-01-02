import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigDto } from './config.dto';
import { createConnection } from 'typeorm';

@Injectable()
export class ConfigService {
  private readonly config: ConfigDto;
  private readonly logger = new Logger(ConfigService.name);

  constructor(private readonly nestConfigService: NestConfigService) {
    // Load environment variables and transform them into a ConfigDto object
    const configObject = {
      DB_HOST: nestConfigService.get<string>('DB_HOST'),
      DB_PORT: nestConfigService.get<number>('DB_PORT'),
      DB_USERNAME: nestConfigService.get<string>('DB_USERNAME'),
      DB_PASSWORD: nestConfigService.get<string>('DB_PASSWORD'),
      DB_NAME: nestConfigService.get<string>('DB_NAME'),
    };

    // Transform the plain object into an instance of ConfigDto
    this.config = plainToClass(ConfigDto, configObject);

    // Validate the object
    const errors = validateSync(this.config);
    if (errors.length > 0) {
      throw new Error(
        'Configuration validation failed: ' + JSON.stringify(errors),
      );
    }

    // Check database connection
    this.checkDatabaseConnection();
  }

  get dbHost(): string {
    return this.config.DB_HOST;
  }

  get dbPort(): number {
    return this.config.DB_PORT;
  }

  get dbUsername(): string {
    return this.config.DB_USERNAME;
  }

  get dbPassword(): string {
    return this.config.DB_PASSWORD;
  }

  get dbName(): string {
    return this.config.DB_NAME;
  }

  private async checkDatabaseConnection() {
    try {
      // Attempt to create a database connection
      await createConnection({
        type: 'postgres',
        host: this.dbHost,
        port: this.dbPort,
        username: this.dbUsername,
        password: this.dbPassword,
        database: this.dbName,
        synchronize: false, // Avoid automatic schema sync on startup
      });

      // Green text for successful connection
      this.logger.log(
        '\x1b[32mDatabase connection successful\x1b[0m', // ANSI escape code for green text
      );
    } catch (error) {
      // Log the error and throw it to prevent the app from starting
      this.logger.error('Database connection failed:', error.message);
      throw new Error('Database connection failed: ' + error.message);
    }
  }
}
