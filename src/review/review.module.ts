import { Module } from '@nestjs/common';
import { ReviewService } from './providers/review.service';
import { ReviewController } from './controllers/review.controller';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UsersModule, EventsModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
