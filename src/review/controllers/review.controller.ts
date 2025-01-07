import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { ReviewService } from './../providers/review.service';
import { CreateReviewDto } from './../dto/create-review.dto';
import { UpdateReviewDto } from './../dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Create a new review
  @Post(':eventId')
  async createReview(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req,
  ) {
    try {
      const userId = req.user.id; // You can use req.user.id if you're using authentication middleware
      return await this.reviewService.create(createReviewDto, userId, eventId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req,
  ) {
    try {
      const { id: userId } = req.user;
      return await this.reviewService.update(id, userId, updateReviewDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Delete a review by ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    try {
      const { id: userId } = req.user;
      return await this.reviewService.delete(id, userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
