import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Payload } from '../interfaces/payload.interface';

@Injectable()
export class JwtToolService {
  constructor(private readonly jwtService: JwtService) {}

  public getJwtToken(user: User): string {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
