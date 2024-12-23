import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {
  constructor ( @InjectRepository(Event) private readonly eventsRepository:Repository<Event>){}
  async create(createEventDto: CreateEventDto) {
   const repositorySchema = this.eventsRepository.create(createEventDto)
   return await this.eventsRepository.save(repositorySchema)
  }

  async findAll() {
    return await this.eventsRepository.find();
  }

  async findOne(id: number) {
    return await this.eventsRepository.findOne({where : {id}})
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const repo = await this.eventsRepository.update(id, updateEventDto);
    return await this.findOne(id)
  }

  async remove(id: number): Promise<void| boolean> {
    const result = await this.eventsRepository.delete(id);

    if (result.affected === 0) {
        throw new Error('Event not found'); // Handle not found case appropriately
    }

    return true
}
}
