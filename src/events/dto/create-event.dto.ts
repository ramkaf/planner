import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    when: Date;

    @IsNotEmpty()
    @IsString()
    address: string;
}
