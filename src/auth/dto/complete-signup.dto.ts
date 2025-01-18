import { IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CompleteSignupDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  referrer?: string;
}
