import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './../entities/review.entity';
import { CreateReviewDto } from './../dto/create-review.dto';
import { UpdateReviewDto } from './../dto/update-review.dto';
import { UsersService } from '../../users/providers/users.service';
import { EventsService } from '../../events/providers/events.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private readonly userService: UsersService,
    private readonly eventService: EventsService,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    userId: number,
    eventId: number,
  ): Promise<Review> {
    const user = await this.userService.findById(userId);
    const event = await this.eventService.findOneById(eventId);
    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
      event,
    });
    return this.reviewRepository.save(review);
  }

  // Update an existing review
  async update(
    id: number,
    userId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: {
        id, // Assuming 'id' is a parameter you want to search by
        user: { id: userId }, // Referencing the user relation's 'id'
      },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  // Delete a review
  async delete(id: number, userId: number): Promise<boolean> {
    const review = await this.reviewRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    await this.reviewRepository.remove(review);
    return true;
  }
}
