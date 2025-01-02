import { IsInt, IsNotEmpty, IsString, Min, Max, IsIn } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsIn([1, 2, 3, 4, 5], { message: 'Rating must be between 1 and 5' })
  rating: number;
}
