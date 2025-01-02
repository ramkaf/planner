import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Review]),
    UsersModule , EventsModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports : [ReviewService]
})
export class ReviewModule {}
