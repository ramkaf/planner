import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { Payload } from '../interfaces/payload.interface';
import { IUser } from '../../users/interfaces/user.interface';

@Injectable()
export class JwtToolService {
  constructor(private readonly jwtService: JwtService) {}

  public getJwtToken(user: IUser): string {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      permissions: user.role.permissions ? user.role.permissions : [],
    };
    return this.jwtService.sign(payload);
  }
}
