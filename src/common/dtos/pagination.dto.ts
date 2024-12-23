import { IsInt, Min, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  limit: number; // Changed from pageSize to limit for consistency

  @IsOptional()
  @IsString()
  search?: string; // Optional search term
}
