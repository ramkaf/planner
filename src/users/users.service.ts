import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }
}
