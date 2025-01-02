import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventService:EventsService
  ) {}

  async findOne(
    identifier: string,
  ): Promise<User | null> {
    const user =  await this.userRepository.findOne({
      where: [
        {id : parseInt(identifier)},
        { email: identifier },
        { phone: identifier },
        { username: identifier },
      ],
    });
    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    return user
  }

  create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async toggleFavorite(userId: number, eventId: number): Promise<boolean> {
    const event = await this.eventService.findOne(eventId);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteEvents'], // Ensure the favoriteEvents relation is loaded
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  
    const isFavorite = user.favoriteEvents?.some((fav) => fav.id == eventId);
    if (isFavorite)
      user.favoriteEvents = user.favoriteEvents.filter((fav) => fav.id != eventId);
    else
      user.favoriteEvents = [...(user.favoriteEvents || []), event];
      await this.userRepository.save(user);

      return true
    }
  }
