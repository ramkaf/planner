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
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './../providers/review.service';
import { CreateReviewDto } from './../dto/create-review.dto';
import { UpdateReviewDto } from './../dto/update-review.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'; // Ensure JWT guard is correctly imported
import { PermissionGuard } from '../../rbac/guards/permission.guard'; // Corrected import path for PermissionGuard
import {
  RequiresPermission,
  ControllerPermission,
} from '../../rbac/decorators/requires-permission.decorator'; // Corrected import path for decorators

@Controller('reviews')
@UseGuards(JwtAuthGuard, PermissionGuard) // Apply global guards here
@ControllerPermission('reviews') // Controller-level permission for all routes under this controller
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Create a new review
  @Post(':eventId')
  @RequiresPermission('reviews:create') // Permission required for creating a review
  async createReview(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req,
  ) {
    try {
      const userId = req.user.id; // Use req.user.id for authenticated user
      return await this.reviewService.create(createReviewDto, userId, eventId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Update an existing review
  @Put(':id')
  @RequiresPermission('reviews:update') // Permission required for updating a review
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
  @RequiresPermission('reviews:delete') // Permission required for deleting a review
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    try {
      const { id: userId } = req.user;
      return await this.reviewService.delete(id, userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
