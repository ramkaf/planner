import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
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
    const { limit, offset, search, filters } = pagination;
  
    const queryBuilder = this.eventsRepository.createQueryBuilder('event');
  
    // Handle search for name or description
    if (search) {
      queryBuilder.andWhere(
        '(event.name LIKE :search OR event.description LIKE :search)',
        { search: `%${search}%` }
      );
    }
  
    // Handle dynamic filters
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (key.endsWith('_gte')) {
          const field = key.replace('_gte', '');
          queryBuilder.andWhere(`event.${field} >= :${field}_gte`, {
            [`${field}_gte`]: this.parseFilterValue(value, field),
          });
        } else if (key.endsWith('_lte')) {
          const field = key.replace('_lte', '');
          queryBuilder.andWhere(`event.${field} <= :${field}_lte`, {
            [`${field}_lte`]: this.parseFilterValue(value, field),
          });
        } else {
          queryBuilder.andWhere(`event.${key} = :${key}`, {
            [key]: this.parseFilterValue(value, key),
          });
        }
      }
    }
  
    // Apply pagination
    queryBuilder.skip(offset).take(limit);
  
    const [result, total] = await queryBuilder.getManyAndCount();
  
    const totalPages = Math.ceil(total / limit);
  
    return {
      data: result,
      total,
      currentPage: pagination.page,
      totalPages,
      limit,
    };
  }
  
  // Helper function to parse filter values
  private parseFilterValue(value: any, key: string): any {
    // Convert to date for date fields
    if (key === 'date') {
      return new Date(value); // Ensure the value is a valid date object
    }
    return value; // Return the original value for other fields
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
