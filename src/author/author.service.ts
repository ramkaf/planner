import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(newAuthor);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find({ relations: ['events'] });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['events'],
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    const updatedAuthor = Object.assign(author, updateAuthorDto);
    return this.authorRepository.save(updatedAuthor);
  }

  async remove(id: number): Promise<void> {
    const author = await this.findOne(id);
    await this.authorRepository.remove(author);
  }
}
