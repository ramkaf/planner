import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  ticketNumber: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  isUsed?: boolean;

  @IsOptional()
  @IsDate()
  usedAt?: Date;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  eventId: number;
}
