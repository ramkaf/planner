import { Injectable , Request } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { DeepPartial, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationResponse } from 'src/common/types/pagination.interface';
import { ICreateEvent } from './interfaces/create.event.inerface';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Author } from 'src/author/entities/author.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class EventsService {
  constructor (
     @InjectRepository(Event) private readonly eventsRepository:Repository<Event>
){}
async create(createEventSchema: ICreateEvent): Promise<Event> {
  const eventEntity: DeepPartial<Event> = {
    ...createEventSchema,
    user_id: { id: createEventSchema.user_id } as User,
    category: { id: createEventSchema.category_id } as Category,
    author: { id: createEventSchema.author_id } as Author,
    tags: createEventSchema.tag_ids?.map((id) => ({ id } as Tag)), // Map tag IDs to Tag objects
  };
  return await this.eventsRepository.save(eventEntity);
}

async findAll(pagination: Pagination): Promise<PaginationResponse<Event>> {
  const { limit, offset, search, filters } = pagination;
  
  const queryBuilder = this.eventsRepository.createQueryBuilder('event')
    // Join all relations
    .leftJoinAndSelect('event.tags', 'tags')
    .leftJoinAndSelect('event.category', 'category')
    .addSelect([
      'category.name'
    ])
    .leftJoinAndSelect('event.author', 'author')
    .leftJoinAndSelect('event.user_id', 'user')

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
      // Handle special cases for relations
      if (key === 'category_id') {
        queryBuilder.andWhere('category.id = :categoryId', { categoryId: value });
        continue;
      }
      if (key === 'author_id') {
        queryBuilder.andWhere('author.id = :authorId', { authorId: value });
        continue;
      }
      if (key === 'tag_ids') {
        // Convert tag_ids to array if it's a string
        const tagIds = typeof value === 'string' ? value.split(',') : value;
        // Fixed case sensitivity in column names
        queryBuilder.andWhere(`
          EXISTS (
            SELECT 1 FROM event_tags_tag ett
            WHERE ett."eventId" = event.id
            AND ett."tagId" IN (:...tagIds)
          )
        `, { tagIds });
        continue;
      }
      if (key === 'user_id') {
        queryBuilder.andWhere('user.id = :userId', { userId: value });
        continue;
      }

      // Handle regular field filters
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

  // Add ordering
  queryBuilder.orderBy('event.createdAt', 'DESC');

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
