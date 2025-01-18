import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  province: string;

  @IsString()
  city: string;

  @IsString()
  region: string;

  @IsString()
  mainStreet: string;

  @IsString()
  subStreet: string;

  @IsString()
  alley: string;

  @IsString()
  code: string;

  @IsString()
  unit: string;
}
