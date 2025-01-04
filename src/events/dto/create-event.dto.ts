import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { EventStatus } from '../interfaces/event.interface';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date.toISOString(); // Converts to ISO 8601
  })
  date: string;

  @IsOptional()
  @Transform(({ value }) => {
    const transformedValue = parseFloat(value);
    return isNaN(transformedValue) ? undefined : transformedValue;
  })
  @IsNumber({}, { message: 'price must be a valid number' })
  price?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  capacity?: number;

  @IsOptional()
  @IsString()
  organizer_name?: string;

  @IsOptional()
  @IsString()
  organizer_contact?: string;

  @IsOptional()
  image?: Express.Multer.File;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @IsOptional()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((id) => parseInt(id));
    }
    return value;
  })
  tag_ids?: number[];

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  category_id: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  author_id: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  address_id: number;
}
