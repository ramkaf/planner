// src/config.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfigValidationSchema {
  @IsString()
  DB_HOST: string;

  @IsInt()
  @Type(() => Number) // Ensures that the value is transformed to a number
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;
}
