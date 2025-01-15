import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Payload } from '../interfaces/payload.interface';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class JwtToolService {
  constructor(private readonly jwtService: JwtService) {}

  public getJwtToken(user: IUser): string {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      username: user.username || null,
      role:user.role,
      permissions :[]
    };
    return this.jwtService.sign(payload);
  }
}