import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Like, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationResponse } from 'src/common/types/pagination.interface';

@Injectable()
export class EventsService {
  constructor ( @InjectRepository(Event) private readonly eventsRepository:Repository<Event>){}
  async create(createEventDto: CreateEventDto) {
   const repositorySchema = this.eventsRepository.create(createEventDto)
   return await this.eventsRepository.save(repositorySchema)
  }

  async findAll(pagination: Pagination): Promise<PaginationResponse<Event>> {
    const { limit, offset, search } = pagination;
    const where = search ? [{ name: Like(`%${search}%`) } , { description : Like(`%${search}%`)}] : {}; // Assuming you're searching by name

    const [result, total] = await this.eventsRepository.findAndCount({
      take: limit,
      skip: offset,
      where,
    });

    const totalPages = Math.ceil(total / limit); // Calculate total pages

    return {
      data: result,
      total,
      currentPage: pagination.page,
      totalPages,
      limit,
    };
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
