import { Module } from '@nestjs/common';
import { AuthorService } from './providers/author.service';
import { AuthorController } from './controllers/author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
