import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  mainStreet?: string;

  @IsOptional()
  @IsString()
  subStreet?: string;

  @IsOptional()
  @IsString()
  alley?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  unit?: string;
}