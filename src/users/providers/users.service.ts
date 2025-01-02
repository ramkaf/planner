import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(
    identifier: string,
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: [
        {id : parseInt(identifier)},
        { email: identifier },
        { phone: identifier },
        { username: identifier },
      ],
    });
  }

  create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }
}
