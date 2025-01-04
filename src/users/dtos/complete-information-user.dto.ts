import { Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  Matches,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
export class CompleteUserInformationDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName?: string;

  @IsString()
  @MinLength(4)
  @Matches(/^[a-z0-9]+$/, {
    message:
      'Username can only contain lowercase letters and numbers and cannot contain "@" symbol',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date.toISOString();
  })
  dateOfBirth?: string;
}
