// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ user: User; token: string }> {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    
    const user = this.userRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
      
      const token = this.getJwtToken(user);
      delete user.password;
      
      return { user, token };
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new UnauthorizedException('User with this email/username/phone already exists');
      }
      throw error;
    }
  }

  async login(login: string, password: string): Promise<{ user: any; token: string }> {
    const user = await this.validateCredentials(login, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const token = this.getJwtToken(user);
    return { user, token };
  }

  private getJwtToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async validateCredentials(login: string, password: string): Promise<any> {
    const whereClause = [
      { email: login },
      { username: login },
      { phone: login }
    ];
  
    const user = await this.userRepository.findOne({
      where: whereClause
    });
  
    if (user && await bcrypt.compare(password, user.password)) {
      // Update last login
      user.lastLogin = new Date();
      await this.userRepository.save(user);
      
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


}