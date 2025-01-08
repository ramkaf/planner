import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketsService } from '../providers/ticket.service';
import { Request } from 'express';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto , @Req() req:Request) {
    const {id:userId} = req.user
    return await this.ticketsService.create(createTicketDto,userId);
  }

  @Get()
  async findAll() {
    return await this.ticketsService.findTickets();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ticketsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ticketsService.remove(+id);
    return { message: 'Ticket successfully deleted' };
  }
}
