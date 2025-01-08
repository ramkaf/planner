import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { generateRandomDigit } from 'src/common/utils/base.utils';
import { EventsService } from 'src/events/providers/events.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly eventsService:EventsService
  ) {}

  async create(createTicketDto: CreateTicketDto , userId:number): Promise<Ticket> {
    const ticketNumber = generateRandomDigit(12)
    const event = await this.eventsService.findOneById(createTicketDto.eventId)
    const ticketSchema = {
      userId,
      eventId:event.id,
      ticketNumber,
      price : event.price
    }
    return await this.ticketRepository.save(ticketSchema);
  }

  async findTickets(userId?: number, eventId?: number): Promise<Ticket[]> {
    const whereCondition: any = {};
  
    if (userId) {
      whereCondition.user = { id: userId };
    }
    if (eventId) {
      whereCondition.event = { id: eventId };
    }
  
    return await this.ticketRepository.find({
      where: whereCondition,
      relations: ['user', 'event'],
      order: { createdAt: 'DESC' }, // Sorting by createdAt in descending order
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['user', 'event'],
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async remove(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
  }
}
