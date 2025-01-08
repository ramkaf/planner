import { Module } from '@nestjs/common';
import { TicketsService } from './providers/ticket.service';
import { TicketsController } from './controllers/ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketModule {}
