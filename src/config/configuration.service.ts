import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig, EmailConfig } from './interfaces/config.interfaces';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get databaseConfig(): DatabaseConfig {
    return {
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
    };
  }

  get emailConfig(): EmailConfig {
    return {
      gmailUser: this.configService.get<string>('email.gmailUser'),
      gmailAppPassword: this.configService.get<string>('email.gmailAppPassword'),
      defaultFromEmail: this.configService.get<string>('email.defaultFromEmail'),
    };
  }
}