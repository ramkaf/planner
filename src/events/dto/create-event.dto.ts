import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
  } from 'class-validator';
  import { EventStatus } from '../interfaces/event.interface';
  
  export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsDateString()
    date: Date;
  
    @IsNotEmpty()
    @IsString()
    address: string;
  
    @IsOptional()
    @IsNumber()
    price?: number;
  
    @IsOptional()
    @IsInt()
    capacity?: number;
  
    @IsOptional()
    @IsString()
    organizer_name?: string;
  
    @IsOptional()
    @IsString()
    organizer_contact?: string;
  
    @IsOptional()
    @IsUrl()
    image_url?: string;
  
    @IsOptional()
    @IsEnum(EventStatus)
    status?: EventStatus;
  
    @IsOptional()
    @IsInt({ each: true })
    tag_ids: number[]; // IDs of related tags

    @IsInt()
    category_id: number; // ID of the related category
  
    @IsInt()
    author_id: number; // ID of the related author
  }
  