// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { PasswordService } from './password.service';
import { UsersService } from 'src/users/providers/users.service';
import { JwtToolService } from './jwt.service';
import { ILogin } from '../interfaces/login.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtToolService: JwtToolService,
    private readonly passwordService: PasswordService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ user: User; token: string }> {
    const { password } = signUpDto;
    const hashedPassword = await this.passwordService.hashPassword(password);
    const user = this.userRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
      const token = this.jwtToolService.getJwtToken(user);
      delete user.password;
      return { user, token };
    } catch (error) {
      if (error.code === '23505') {
        // Unique constraint violation
        throw new UnauthorizedException(
          'User with this email/username/phone already exists',
        );
      }
      throw error;
    }
  }

  async login(
    loginCredentional: ILogin,
  ): Promise<{ user: any; token: string }> {
    const { login, password } = loginCredentional;
    const user = await this.validateCredentials(login, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtToolService.getJwtToken(user);
    return { user, token };
  }

  async validateCredentials(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    if (
      user &&
      (await this.passwordService.comparePasswords(password, user.password))
    ) {
      user.lastLogin = new Date();
      await this.userRepository.save(user);
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
