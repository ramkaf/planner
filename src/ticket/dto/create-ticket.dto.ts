import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  eventId: number;
}
