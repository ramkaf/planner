import { BadRequestException, Injectable , Request } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { DeepPartial, LessThanOrEqual, Like, MoreThanOrEqual, Repository, SelectQueryBuilder } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationResponse } from 'src/common/types/pagination.interface';
import { ICreateEvent } from './interfaces/create.event.inerface';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Author } from 'src/author/entities/author.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { EVENT_FILTER_CONFIG } from './constants/filter-config';
import { log } from 'node:console';

@Injectable()
export class EventsService {
  constructor (
     @InjectRepository(Event) private readonly eventsRepository:Repository<Event>
){}
private createBaseQuery(): SelectQueryBuilder<Event> {
  return this.eventsRepository.createQueryBuilder('event')
    .leftJoinAndSelect('event.tags', 'tags')
    .leftJoinAndSelect('event.category', 'category')
    .leftJoinAndSelect('event.author', 'author')
    .leftJoinAndSelect('event.user_id', 'user');
}

private applySearch(queryBuilder: SelectQueryBuilder<Event>, search: string): void {
  if (search) {
    queryBuilder.andWhere(
      '(event.name LIKE :search OR event.description LIKE :search)',
      { search: `%${search}%` }
    );
  }
}

private applyFilter(
  queryBuilder: SelectQueryBuilder<Event>, 
  key: string, 
  value: any
): void {
  const config = EVENT_FILTER_CONFIG[key];
  
  if (!config) {
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
    return;
  }

  if (config.customQuery) {
    config.customQuery(queryBuilder, value);
    return;
  }

  const alias = config.relation || 'event';
  const fieldPath = `${alias}.${config.field}`;

  switch (config.operator) {
    case 'eq':
      queryBuilder.andWhere(`${fieldPath} = :${key}`, { [key]: value });
      break;
    case 'in':
      const values = typeof value === 'string' ? value.split(',') : value;
      queryBuilder.andWhere(`${fieldPath} IN (:...${key})`, { [key]: values });
      break;
  }
}

private parseFilterValue(value: any, field: string): any {
  // Add parsing logic for different field types
  if (['date', 'createdAt', 'updatedAt'].includes(field)) {
    return new Date(value);
  }
  if (['price', 'capacity'].includes(field)) {
    return parseFloat(value);
  }
  return value;
}


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
  
  const queryBuilder = this.createBaseQuery();

  this.applySearch(queryBuilder, search);

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      this.applyFilter(queryBuilder, key, value);
    }
  }

  queryBuilder
    .skip(offset)
    .take(limit)
    .orderBy('event.createdAt', 'DESC');

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
  
async findOne(id: number) {
  // Update the 'seen' field and retrieve the updated event in a single query
  const event = await this.eventsRepository.createQueryBuilder()
    .update()
    .set({ seen: () => "seen + 1" })
    .where("id = :id", { id })
    .returning("*") // Retrieve the updated event (depends on the database and ORM support)
    .execute()
    .then(result => result.raw[0]);

  if (!event) {
    throw new Error(`Event with ID ${id} not found.`);
  }

  return event;
}
async findOneById(id: number) {
  const event = await this.eventsRepository.findOneBy({id})
    if (!event) {
      throw new BadRequestException(`Event with ID ${id} not found.`);
    }
    return event;
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
